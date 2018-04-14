import React, { Component } from 'react';
import './styles/HomeView.css'

export default class HomeView extends Component {
  constructor(props){
    super(props);
    this.state = {
      timesLeft: [],
      data: {},
      // boolean is to wether get more timers or not
      mightHaveMore: true,
    }
    this.timersChange = this.timersChange.bind(this);
    this.getNearestTimer = this.getNearestTimer.bind(this);
  }

  componentDidMount() {
    document.title = 'Unknown Timers';
    fetch('/gettimers?&num=3')
    .then((res)=>{return res.json()})
    .then((data)=>{
      const timesLeft = [];
      const now = new Date().valueOf();
      for(let timer in data){
        timesLeft.push(parseInt(((new Date(data[timer].expiration).valueOf() - now)/1000),10));
      }
      this.setState({
        timesLeft: timesLeft,
        data: data,
        // if it fills the array with the num query then it might have more timers, else then it must be the last 2, 1, or 0
        mightHaveMore: timesLeft.length === 3,
      });
      this.timer = setInterval(this.timersChange, 1000);
    })
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  timersChange() {
    if(this.state.timesLeft.length === 0) {
      clearInterval(this.timer);
      return
    }
    const timesLeft = [];
    const data = this.state.data.slice();
    let removed = 0;
    for(let timers in this.state.timesLeft){
      const time =this.state.timesLeft[timers]-1;
      if(time < 1)
        data.spice(timers-(removed--),1);
      else
        timesLeft.push(time);
    }
    this.setState({
      timesLeft: timesLeft,
      data: data
    })
  }

// TODO seperate timer in seperate component to be used by others
  secToTime(secs) {
    // let total = secs;
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
        <div style={style.title} className='timer-title'>Next Timer  Ending</div>
        <div>{seconds}<div>secs</div></div>
        {minDiv}
        {hoursDiv}
        {dayDiv}
      </div>
    )
  }

  getNearestTimer(timesLeft){
    if(timesLeft.length > 1)
      return this.secToTime(timesLeft[0]);
    if(this.state.mightHaveMore){
      // fetch for more cause there mightHaveMore timers left
      return
    }
    return 'No timers found'
  }

  render() {
    // TODO:
    // - design
    // - need to get more timers when if all finish
    return(
      <div>
        {this.getNearestTimer(this.state.timesLeft)}
      </div>
    )
  }
}
