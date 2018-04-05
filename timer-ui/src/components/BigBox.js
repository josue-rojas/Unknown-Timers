import React, { Component } from 'react';
import './styles/BigBox.css'

// just a big box that is responsive, mostly used for text and information
export default class BigBox extends Component {
  render() {
    const style = {
      box: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '5px',
        padding: '25px',
        margin: 'auto',
      }
    }
    return(
      <div style={style.box} className='BigBox'>
        {this.props.children}
      </div>
    )
  }
}
