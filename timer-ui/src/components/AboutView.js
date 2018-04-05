import React, { Component } from 'react';
import BigBox from './BigBox';

export default class AboutView extends Component {
  componentDidMount() {
    document.title = 'About Unknown Timer';
  }

  render() {
    const style = {
      wrapper: {
        textAlign: 'center',
        marginTop: '10px',
      },
      title: {
        fontSize: '1.2rem'
      }
    }
    return(
      <div style={style.wrapper}>
        <BigBox>
          <div style={style.title}>About View</div>
        </BigBox>
      </div>
    )
  }
}
