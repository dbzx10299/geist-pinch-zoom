<script setup lang="ts">
import {
  ref,
  computed,
  nextTick,
  onMounted,
  onUnmounted,
  watch,
  watchEffect,
} from 'vue'
import {
  negate,
  getPinchLength,
  getPinchCenter,
  getElementDimensions,
  snapToTarget,
  clamp,
  preventDefaultIfCancelable,
  getFitScale,
  getBaseScale,
  isSameTransform,
  areDimensionsEqual,
  getRelativeCoords,
} from './utils'

const {
  initialScale = 'auto',
  maxScale = 3,
  minScale = 'auto',
  zoomTolerance = 0.3,
  aspectRatio,
  onZoomChange,
} = defineProps<{
  initialScale?: 'auto' | number;
  maxScale?: number;
  minScale?: 'auto' | number;
  zoomTolerance?: number;
  aspectRatio: number;
  onZoomChange?: (scale: number) => void;
}>()

const transformStyles = ref({
  left: 0,
  top: 0,
  scale: 1
})

const containerDims = ref({
  width: 0,
  height: 0
})

const imageDims = ref({
  width: 0,
  height: 0
})

const imageRef = ref(null)
const containerRef = ref(null)
const animation = ref(null)
const lastPanPointerPosition = ref(null)
const lastPinchLength = ref(null)
const lastTouchWasTwo = ref(null)
const lastPointerUpTimeStamp = ref(null)
const zoomViewportWidth = ref(0)
const zoomViewport = ref(null)
/**
 * 
 * inverse aspect ratio = 1 / aspectRatio
 */


onMounted(async () => {
  if (zoomViewport.value) {
    zoomViewportWidth.value = zoomViewport.value.clientHeight * aspectRatio
  }

  await nextTick()

  if (containerRef.value) {
    const dims = getElementDimensions(containerRef.value)
    containerDims.value = dims
    imageDims.value = dims
  }

  applyInitialTransform()
})

onUnmounted(() => cancelAnimation())

watch([transformStyles, lastPinchLength], () => {
  imageRef.value.style.width = `${containerDims.value.width * transformStyles.value.scale}px`
  imageRef.value.style.height = `${containerDims.value.height * transformStyles.value.scale}px`

  onZoomChange?.(transformStyles.value.scale)
})


function cancelAnimation() {
  if (animation.value) cancelAnimationFrame(animation.value)
}


function pointerDown(event) {
  lastPanPointerPosition.value = getRelativeCoords(
    event,
    imageRef.value.parentNode,
  );
}


function pan(event) {
  if (!lastPanPointerPosition.value) {
    pointerDown(event)
    return
  }

  const currentPointerPosition = getRelativeCoords(
    event,
    imageRef.value.parentNode
  )

  const deltaX = currentPointerPosition.x - lastPanPointerPosition.value.x
  const deltaY = currentPointerPosition.y - lastPanPointerPosition.value.y
  lastPanPointerPosition.value = currentPointerPosition

  const nextTop = transformStyles.value.top + deltaY
  const nextLeft = transformStyles.value.left + deltaX

  constrainAndApplyTransform(
    nextTop,
    nextLeft,
    transformStyles.value.scale,
    0,
    0
  )

  return {
    up: deltaY > 0 ? deltaY : 0,
    down: deltaY < 0 ? negate(deltaY) : 0,
    right: deltaX < 0 ? negate(deltaX) : 0,
    left: deltaX > 0 ? deltaX : 0
  }
}



function applyInitialTransform(lerpFactor = 0) {
  const resolvedInitialScale =
    typeof initialScale === 'string'
      ? getFitScale(imageDims.value, containerDims.value)
      : initialScale;

  const minAllowedScale = getBaseScale(
    imageDims.value,
    containerDims.value,
    minScale
  )

  if (minAllowedScale > maxScale) {
    console.error("minScale cannot exceed maxScale")
    return
  }

  if (resolvedInitialScale < minAllowedScale || resolvedInitialScale > maxScale) {
    console.error("initialScale must be between minScale and maxScale")
    return
  }

  const initialTransformPosition = {
    top: (containerDims.value.width - imageDims.value.width * resolvedInitialScale) / 2,
    left: (containerDims.value.height - imageDims.value.height * resolvedInitialScale) / 2
  }

  constrainAndApplyTransform(
    initialTransformPosition.top,
    initialTransformPosition.left,
    resolvedInitialScale,
    0,
    lerpFactor
  )
}


function constrainAndApplyTransform(top, left, scale, zoomTolerance, lerpFactor = 0) {
  const transform = {
    top,
    left,
    scale
  }

  const correctedTransform = getCorrectedTransform(transform, zoomTolerance) || transform

  if (!isSameTransform(correctedTransform, transformStyles.value)) {
    applyTransform(correctedTransform, lerpFactor)
  }
}



function applyTransform(transforms, lerpFactor) {
  if (lerpFactor > 0) {
    const animate = () => {
      const deltaTop = transforms.top - transformStyles.value.top
      const deltaLeft = transforms.left - transformStyles.value.left
      const deltaScale = transforms.scale - transformStyles.value.scale

      const nextTransform = {
        top: snapToTarget(
          transformStyles.value.top + lerpFactor * deltaTop,
          transforms.top,
          1
        ),
        left: snapToTarget(
          transformStyles.value.left + lerpFactor * deltaLeft,
          transforms.left,
          1
        ),
        scale: snapToTarget(
          transformStyles.value.scale + lerpFactor * deltaScale,
          transforms.scale,
          0.001
        )
      }

      if (!isSameTransform(nextTransform, transformStyles.value)) {
        transformStyles.value = nextTransform
        animation.value = requestAnimationFrame(animate)
      } else {
        transformStyles.value = transforms
      }
    }

    animation.value = requestAnimationFrame(animate)
  } else {
    transformStyles.value.top = transforms.top
    transformStyles.value.left = transforms.left
    transformStyles.value.scale = transforms.scale
  }
}



function getCorrectedTransform(transformStyles, zoomTolerance) {
  const constrainedScale = getConstrainedScale(transformStyles.scale, zoomTolerance)
  const negativeSpace = calculateNegativeSpace(constrainedScale)

  const overflow = {
    width: Math.max(0, negate(negativeSpace.width)),
    height: Math.max(0, negate(negativeSpace.height))
  }

  const o = 1 + zoomTolerance
  
  const correctedTransform = {
    top: overflow.height
      ? clamp(
          negate(overflow.height) * o,
          overflow.height * o - overflow.height,
          transformStyles.top
        )
      : (containerDims.value.height - imageDims.value.height * constrainedScale) / 2,
    left: overflow.width
      ? clamp(
          negate(overflow.width) * o,
          overflow.width * o - overflow.width,
          transformStyles.left
        )
      : (containerDims.value.width - imageDims.value.width * constrainedScale) / 2,
    scale: constrainedScale
  }
    
  return isSameTransform(correctedTransform, transformStyles)
    ? null
    : correctedTransform
}



function getConstrainedScale(targetScale, zoomTolerance) {
  const minScaleFactor = 1 - zoomTolerance
  const maxScaleFactor = 1 + zoomTolerance

  return clamp(
    getBaseScale(imageDims.value, containerDims.value, minScale) * minScaleFactor,
    maxScale * maxScaleFactor,
    targetScale
  )
}



function calculateNegativeSpace(constrainedScale) {
  return {
    width: containerDims.value.width - constrainedScale * imageDims.value.width,
    height: containerDims.value.height - constrainedScale * imageDims.value.height
  }
}



function doubleClick(origin) {
  1.5 * transformStyles.value.scale <= maxScale
    ? zoomIn(origin, zoomTolerance, 0.3)
    : applyInitialTransform(0.3)
}



function zoomIn(origin, zoomTolerance = 0.1, lerpFactor = 0) {
  const zoomOrigin = origin || {
    x: containerDims.value.width / 2,
    y: containerDims.value.height / 2,
  };

  zoom(
    transformStyles.value.scale * (1 + zoomTolerance),
    zoomOrigin,
    0,
    lerpFactor
  )
}



function zoomOut(origin, t = 0) {
  const zoomOrigin = origin || {
    x: containerDims.value.width / 2,
    y: containerDims.value.height / 2
  }

  zoom(0.9 * transformStyles.value.scale, zoomOrigin, t)
}



function zoom(targetScale, origin, zoomTolerance, lerpFactor = 0) {
  const { top, left, scale } = transformStyles.value

  const offsetY = origin.y - top
  const offsetX = origin.x - left
  const constrainedScale = getConstrainedScale(
    targetScale,
    zoomTolerance,
  )

  const scaleDelta = (constrainedScale - scale) / scale;
  const newTop = top - offsetY * scaleDelta
  const newLeft = left - offsetX * scaleDelta

  constrainAndApplyTransform(
    newTop,
    newLeft,
    constrainedScale,
    zoomTolerance,
    lerpFactor,
  )
}



function pinchChange(e) {
  const pinchLength = getPinchLength(e)
  const pinchCenter = getPinchCenter(e)

  const scale = lastPinchLength.value
    ? (transformStyles.value.scale * pinchLength) / lastPinchLength.value
    : transformStyles.value.scale

  zoom(scale, pinchCenter, 0)

  lastPinchLength.value = pinchLength
}



function handleTouchStart(event) {
  cancelAnimation()
  const touches = event.touches

  if (touches.length === 2) {
    lastPinchLength.value = getPinchLength(touches)
    lastPanPointerPosition.value = null
    lastTouchWasTwo.value = true
  } else if (touches.length === 1) {
    lastTouchWasTwo.value = false
    lastPinchLength.value = null
    pointerDown(touches[0])
    preventDefaultIfCancelable(event)
  }
}



function handleTouchMove(event) {
  const touches = event.touches

  if (touches.length === 2) {
    pinchChange(touches)
    preventDefaultIfCancelable(event)
    return
  }

  if (touches.length === 1) {
    const { up, down, left, right } = pan(touches[0]) ?? {};
    lastTouchWasTwo.value = true;
  }
}



function handleTouchEnd(e) {
  cancelAnimation()

  if (e.touches.length === 0 && e.changedTouches.length === 1) {
    if (
      lastPointerUpTimeStamp.value &&
      lastPointerUpTimeStamp.value + 250 > e.timeStamp
    ) {
      const touchCoords = getRelativeCoords(
        e.changedTouches[0],
        imageRef.value.parentNode,
      );

      doubleClick(touchCoords);
    }

    lastTouchWasTwo.value = false
    lastPointerUpTimeStamp.value = e.timeStamp
    preventDefaultIfCancelable(e)
  }
}
</script>

<template>
  <div style="position: fixed; left: 0; top: 0; display: flex; height: 100%; width: 100%; justify-content: center; z-index: 999;">
    <div style="z-index: 999; align-items: center; position: relative; height: 100%; width: 100%; display: flex; flex-direction: column; outline: none;">
      <div style="margin: 0; padding: 0; display: flex; flex-direction: column; height: 100%; transform: translateZ(0); overflow-x: hidden; overflow-y: scroll;">
        <div
          style="margin: 0 auto; position: relative; height: 100%;"
          ref="zoomViewport"
          :style="{
            '--ratio-portrait': aspectRatio,
            ...(zoomViewportWidth > 0 && {
              width: `${zoomViewportWidth}px`
            })
          }"
        >
          <div
            ref="containerRef"
            :style="{
              overflow: 'hidden',
              touchAction: 'none',
              width: '100%',
              height: 'initial',
              ...(containerDims.height > 0 && containerDims.width > 0 && {
                  width: `${containerDims.width}px`,
                  height: `${containerDims.height}px`
              })
            }"
          >
            <div
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
              ref="imageRef"
              :style="{
                cursor: 'pointer',
                userSelect: 'none',
                willChange: 'width, height, transform',
                backfaceVisibility: 'hidden',
                width: `${containerDims.width * transformStyles.scale}px`,
                height: `${containerDims.height * transformStyles.scale}px`,
                transform: `translate3d(${transformStyles.left}px, ${transformStyles.top}px, 0)`,
                transformOrigin: '0px 0px',
                position: 'relative',
                background: 'transparent',
                overflow: 'hidden',
                paddingTop: 'calc(1 / var(--ratio-portrait) * 100%)',
              }"
            >
              <div style="left: 0; top: 0; width: 100%; position: absolute; height: 100%;">
                <slot/>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div style="background: white; margin-top: auto; height: 72px;"></div>
      </div>

    </div>
  </div>
</template>