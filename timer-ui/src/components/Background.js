import React, { Component } from 'react';
import background_image from './images/background.jpg';

export default class Background extends Component {
  render() {
    const style = {
      backgroundWrapper: {
        width: '100vw',
        height: '100vh',
        zIndex: '-1',
        position: 'fixed',
        filter: this.props.isActive ? 'blur(5px)' : '',
        transition: '400ms',
      },
      background: {
        width: '100vw',
        height: '100vh',
        zIndex: '-2',
        position: 'fixed',
        backgroundImage: 'url(' + background_image + ')'
      },
      shade: {
        width: '100vw',
        height: '100vh',
        zIndex: '-1',
        position: 'fixed',
        backgroundColor: 'rgba(33,31,33,0.82)',
      }
    }
    return (
      <div style={style.backgroundWrapper}>
        <div style={style.background}/>
        <div style={style.shade}/>
      </div>
    )
  }
}
