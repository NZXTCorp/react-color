export const calculateChange = (e, skip, props, container) => {
  e.preventDefault()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  } else if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  const saturation = (left * 100) / containerWidth
  const bright = -((top * 100) / containerHeight) + 100

  return {
    h: props.hsl.h,
    s: saturation,
    v: bright,
    a: props.hsl.a,
    source: 'rgb',
  }
}

export const calculateHueSaturationChange = (e, skip, props, container) => {
  e.preventDefault()
  const { width: containerWidth, height: containerHeight } = container.getBoundingClientRect()
  const x = typeof e.pageX === 'number' ? e.pageX : e.touches[0].pageX
  const y = typeof e.pageY === 'number' ? e.pageY : e.touches[0].pageY
  let left = x - (container.getBoundingClientRect().left + window.pageXOffset)
  let top = y - (container.getBoundingClientRect().top + window.pageYOffset)

  if (left < 0) {
    left = 0
  } else if (left > containerWidth) {
    left = containerWidth
  } else if (top < 0) {
    top = 0
  } else if (top > containerHeight) {
    top = containerHeight
  }

  const hue = (left * 360) / containerWidth
  const saturation = -((top * 100) / containerHeight) + 100

  return {
    h: hue,
    s: saturation,
    v: 100,
    a: 1,
    source: 'rgb',
  }
}
