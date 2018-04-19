import React, { Component } from 'react';
import './styles/SingleTimer.css';

export default class SingleTimer extends Component {
  render() {
    let secs = this.props.secs || 0;
    const days = Math.trunc(secs / 86400);
    const dayDiv = days > 0 ? (<div>{days}<div>days</div></div>) : '';
    secs = secs - (days*86400);
    const hours = Math.trunc(secs / 3600)
    const hoursDiv = hours > 0 ? (<div>{hours}<div>hrs</div></div>) : '';
    secs = secs - (hours * 3600);
    const minutes = Math.trunc(secs / 60);
    const minDiv = minutes > 0 ? (<div>{minutes}<div>mins</div></div>) : '';
    const seconds = Math.trunc(secs - (minutes * 60));
    const secDiv = seconds > -1 ? (<div>{seconds}<div>secs</div></div>) : '';
    // TODO add button to check out more timers
    const title = seconds > -1 ? (this.props.title ? this.props.title : 'This Timer Ending') : 'This Timer Has Ended';
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
        <div style={style.title} className='timer-title'>{title}</div>
        {secDiv}
        {minDiv}
        {hoursDiv}
        {dayDiv}
      </div>
    )
  }
}
