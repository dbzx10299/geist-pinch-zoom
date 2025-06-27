const negate = (e) => -1 * e;

const getPinchLength = (touches) => {
  const [t1, t2] = touches
  return Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY)
}

const getPinchCenter = (touches) => {
  const touch1 = touches[0]
  const touch2 = touches[1]

  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2,
  }
}

const getElementDimensions = (element) => ({
  width: element.offsetWidth,
  height: element.offsetHeight,
});

const snapToTarget = (current, target, threshold) => {
  return Math.abs(target - current) < threshold ? target : current
};


function clamp(min, max, value) {
  return Math.min(max, Math.max(min, value))
}

const preventDefaultIfCancelable = (event) => {
  if (event.cancelable !== false) {
    event.preventDefault()
  }
};

const getFitScale = (imageDims, containerDims) => {
  const { width: imageWidth, height: imageHeight } = imageDims
  const { width: containerWidth, height: containerHeight } = containerDims
  return imageWidth > 0 && imageHeight > 0
    ? Math.min(containerWidth / imageWidth, containerHeight / imageHeight, 1)
    : 1
}

const getBaseScale = (imageDims, containerDims, minScale) =>
  typeof minScale === 'string'
    ? getFitScale(imageDims, containerDims)
    : minScale || 1


const isSameTransform = (e, t) => {
  if (e === undefined || t === undefined) return e === t

  return (
    Math.round(e.top) === Math.round(t.top) &&
    Math.round(e.left) === Math.round(t.left) &&
    Math.round(e.scale) === Math.round(t.scale)
  )
}

const areDimensionsEqual = (a, b) =>
  !!a && !!b && a.width === b.width && a.height === b.height

const getRelativeCoords = (event, el) => {
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
  areDimensionsEqual,
  getRelativeCoords,
} 