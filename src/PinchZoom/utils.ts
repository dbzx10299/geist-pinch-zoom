import type {
  Transform,
  ContainerDims
} from './types'

const negate = (num: number) => -1 * num

const getPinchLength = (touches: TouchList) => {
  const [t1, t2] = touches
  return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
}

const getPinchCenter = (touches: TouchList) => {
  const touch1 = touches[0]
  const touch2 = touches[1]

  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  }
}

const getElementDimensions = (element: HTMLElement) => ({
  width: element.offsetWidth,
  height: element.offsetHeight,
});

const snapToTarget = (current: number, target: number, threshold: number) => {
  return Math.abs(target - current) < threshold ? target : current
};


function clamp(min: number, max: number, value: number) {
  return Math.min(max, Math.max(min, value))
}

const preventDefaultIfCancelable = (event: TouchEvent) => {
  if (event.cancelable !== false) {
    event.preventDefault()
  }
};

const getFitScale = (imageDims: ContainerDims, containerDims: ContainerDims) => {
  const { width: imageWidth, height: imageHeight } = imageDims
  const { width: containerWidth, height: containerHeight } = containerDims

  return imageWidth > 0 && imageHeight > 0
    ? Math.min(containerWidth / imageWidth, containerHeight / imageHeight, 1)
    : 1
}

const getBaseScale = (imageDims: ContainerDims, containerDims: ContainerDims, minScale: string | number) => {
  return typeof minScale === 'string'
    ? getFitScale(imageDims, containerDims)
    : minScale || 1
}


const isSameTransform = (correctedTransform: Transform, currentTransform: Transform) => {
  if (correctedTransform === undefined || currentTransform === undefined) return correctedTransform === currentTransform

  return (
    Math.round(correctedTransform.top) === Math.round(currentTransform.top) &&
    Math.round(correctedTransform.left) === Math.round(currentTransform.left) &&
    Math.round(correctedTransform.scale) === Math.round(currentTransform.scale)
  )
}

const getRelativeCoords = (event: Touch, el: HTMLElement) => {
  const { clientX, clientY } = event
  const { left, top } = el.getBoundingClientRect()
  return {
    x: clientX - left,
    y: clientY - top
  }
}


export {
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
  getRelativeCoords,
} 