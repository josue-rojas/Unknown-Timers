import React, { Component } from 'react';
import SingleTimer from './SingleTimer';

export default class SingleTimerView extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: {},
      time: 0,
    }
    this.timerChange = this.timerChange.bind(this);
  }

  componentDidMount() {
    // document.title = 'Unknown Timers';
    const id = window.location.hash.substring(1);
    fetch(`/gettimer?&id=${id}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
      const timesLeft = [];
      const now = new Date().valueOf();
      let time = 0;
      if(data){
        time = parseInt(((new Date(data[0].expiration).valueOf() - now)/1000),10)
      }
      this.setState({
        time: time,
        data: data,
      });
      this.timer = setInterval(this.timerChange, 1000);
    })
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  timerChange() {
    // TODO handle expire timers better; maybe show a message
    if(this.state.time < 1) {
      clearInterval(this.timer);
      window.location = '/';
      return
    }
    this.setState({
      time: this.state.time-1,
    })
  }


  render() {
    return(
      <div>
        <SingleTimer
          title={this.state.data.name}
          secs={this.state.time}/>
      </div>
    )
  }
}
