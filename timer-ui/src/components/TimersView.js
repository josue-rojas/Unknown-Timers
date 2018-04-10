import React, { Component } from 'react';

class TimerBox extends Component {
  render() {
    const style = {
      box: {
        width: '100px',
        height: '100px',
        border: '1px solid white',
        position: 'relative',
        zIndex: '3'
      },
      backgroundcolor: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        opacity: '.3',
        backgroundColor: this.props.color,
        top: '0',
        left: '0',
        zIndex: '-1',
      }
    }
    return(
      <div style={style.box}>
        <div>
          {this.props.name}
          {this.props.expiration}
        </div>
        <div style={style.backgroundcolor}/>
      </div>
    )
  }
}

export default class TimersView extends Component {
  constructor(props){
    super(props);
    this.state = {
      // timesLeft holds milliseconds left for i timer
      timesLeft: [],
      data: {},
    }
    this.makeTimerBoxes = this.makeTimerBoxes.bind(this);
    this.timersChange = this.timersChange.bind(this);
  }
  componentDidMount() {
    document.title = 'Unknown Timers';
    fetch('/gettimers')
    .then((res)=>{return res.json()})
    .then((data)=>{
      const timesLeft = []
      const now = new Date().valueOf();
      for(let i = 0; i < data.length; i++){
        timesLeft.push(parseInt(((new Date(data[i].expiration).valueOf() - now)/1000)))
      }
      // dummy data
      // timesLeft.splice(0,0,2);
      // data.splice(0, 0, {name: '', expiration: '', color: 'yellow'});
      // timesLeft.splice(0,0,2);
      // data.splice(0, 0, {name: '', expiration: '', color: 'yellow'});
      this.setState({
        data: data,
        timesLeft: timesLeft,
      })
      this.timer = setInterval(this.timersChange, 1000);
    })
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  timersChange(){
    if(this.state.data.length === 0) {
      clearInterval(this.timer);
      return
    }
    const timesLeft = [];
    const data = this.state.data.slice();
    let removed = 0;
    for(let i = 0; i < this.state.timesLeft.length; i++){
      const time = this.state.timesLeft[i]-1;
      if(time < 1){
        data.splice(i-(removed--), 1)
      }
      else{
        timesLeft.push(time)
      }
    }
    this.setState({
      timesLeft: timesLeft,
      data: data
    })
  }

  makeTimerBoxes(timesLeft, data){
    const timersBoxes = [];
    for(let i = 0; i < data.length; i++){
      timersBoxes.push(
        <TimerBox
          color={data[i].color}
          expiration={timesLeft[i]}
          name={data[i].name}
          id={data[i].id}/>
      )
    }
    return timersBoxes;
  }

  render() {
    const style = {
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      }
    }
    return(
      <div style={style.wrapper}>
        {this.makeTimerBoxes(this.state.timesLeft, this.state.data)}
      </div>
    )
  }
}
