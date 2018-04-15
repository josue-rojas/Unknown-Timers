import React, { Component } from 'react';
import './styles/SingleTimer.css';

export default class SingleTimer extends Component {
  render() {
    let secs = this.props.secs;
    const days = Math.trunc(secs / 86400);
    const dayDiv = days > 0 ? (<div>{days}<div>days</div></div>) : '';
    secs = secs - (days*86400);
    const hours = Math.trunc(secs / 3600)
    const hoursDiv = hours > 0 ? (<div>{hours}<div>hrs</div></div>) : '';
    secs = secs - (hours * 3600);
    const minutes = Math.trunc(secs / 60);
    const minDiv = minutes > 0 ? (<div>{minutes}<div>mins</div></div>) : '';
    const seconds = Math.trunc(secs - (minutes * 60));
    const style = {
      timerWrapper: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly'
      },
      title: {
        width: '100%',
        textAlign: 'center',
      }
    }
    return(
      <div style={style.timerWrapper} className='timerWrapper'>
        <div style={style.title} className='timer-title'>{this.props.title ? this.props.title : 'This Timer Ending'}</div>
        <div>{seconds}<div>secs</div></div>
        {minDiv}
        {hoursDiv}
        {dayDiv}
      </div>
    )
  }
}
