import React, { Component } from 'react';
import SingleTimer from './SingleTimer';

export default class SingleTimerView extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: [{name: ''}],
      time: 0,
      ended: false,
    }
    this.timerChange = this.timerChange.bind(this);
  }

  componentDidMount() {
    const id = window.location.hash.substring(1);
    fetch(`/gettimer?&id=${id}`)
    .then((res)=>{return res.json()})
    .then((data)=>{
      const now = new Date().valueOf();
      let time = 0;
      if(data.length === 0) {
        // prevent error if it does not exist
        window.location = '/';
        return;
      }
      time = parseInt(((new Date(data[0].expiration).valueOf() - now)/1000),10);
      document.title = data[0].name === '' ? 'Timer' : `${data[0].name}'s Timer`;

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
    if(this.state.time < 1) {
      clearInterval(this.timer);
      this.setState({ ended: true })
      return
    }
    this.setState({ time: this.state.time-1 })
  }

  render() {
    return(
      <div>
        <SingleTimer
          title={this.state.data[0].name === '' ? false :  `${this.state.data[0].name}'s Timer`}
          secs={this.state.time}/>
      </div>
    )
  }
}
