import React, { Component, PureComponent } from 'react'
import reactCSS from 'reactcss'
import throttle from 'lodash/throttle'
import * as saturation from '../../helpers/saturation'

export class HueSaturation extends (PureComponent || Component) {
  constructor(props) {
    super(props)

    this.throttle = throttle((fn, data, e) => {
      fn(data, e)
    }, 50)
  }

  componentWillUnmount() {
    this.throttle.cancel()
    this.unbindEventListeners()
  }

  handleChange = (e, skip) => {
    this.props.onChange && this.throttle(
      this.props.onChange,
      saturation.calculateHueSaturationChange(e, skip, this.props, this.container),
      e,
    )
  }

  handleMouseDown = (e) => {
    this.handleChange(e, true)
    window.addEventListener('mousemove', this.handleChange)
    window.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseUp = () => {
    this.unbindEventListeners()
  }

  unbindEventListeners() {
    window.removeEventListener('mousemove', this.handleChange)
    window.removeEventListener('mouseup', this.handleMouseUp)
  }

  render() {
    const { container, pointer, circle } = this.props.style || {}
    const styles = reactCSS({
      'default': {
        container: {
          absolute: '0px 0px 0px 0px',
          borderRadius: this.props.radius,
          background: 'linear-gradient(to right, #f00 0%, #ff0 17%, #0f0 33%, #0ff 50%, #00f 67%, #f0f 83%, #f00 100%)'
        },
        saturation: {
          absolute: '0px 0px 0px 0px',
          borderRadius: this.props.radius,
          background: 'linear-gradient(to top, #fff, rgba(255, 255, 255, 0))',
        },
        pointer: {
          position: 'absolute',
          left: `${ (this.props.hsv.h * 100) }%`,
          top: `${ -(this.props.hsv.s * 100) + 100 }%`,
          cursor: 'default',
        },
        circle: {
          width: '4px',
          height: '4px',
          boxShadow: `0 0 0 1.5px #fff, inset 0 0 1px 1px rgba(0,0,0,.3),
            0 0 1px 2px rgba(0,0,0,.4)`,
          borderRadius: '50%',
          cursor: 'hand',
          transform: 'translate(-2px, -2px)',
        },
      },
      'custom': {
        container,
        pointer,
        circle,
      },
    }, { 'custom': !!this.props.style })

    return (
      <div
        style={ styles.container }
        ref={ container => this.container = container }
        onMouseDown={ this.handleMouseDown }
        onTouchMove={ this.handleChange }
        onTouchStart={ this.handleChange }
      >
        <div style={ styles.saturation } />
        <div style={ styles.pointer }>
          { this.props.pointer ? (
            <this.props.pointer { ...this.props } />
          ) : (
            <div style={ styles.circle } />
          ) }
        </div>
      </div>
    )
  }
}

export default HueSaturation
