import React, { Component } from 'react';
import BigBox from './BigBox';
// TODO: finish
export default class FailedView extends Component {
  constructor(props){
    super(props);
    this.state = {
      redirecttime: 5,
    }
    this.redirectTime = this.redirectTime.bind(this);
  }

  componentDidMount() {
    if(['http://localhost:8081/submit', 'https://unkown-timers.herokuapp.com/submit'].includes(document.referrer)){
      document.title = 'Failed';
      this.timer = setInterval(this.redirectTime, 1000);
    }
    else{
      window.location = '/';
    }
  }

  componentWillUnmount(){
    clearInterval(this.timer);
  }

  redirectTime(){
    if(this.state.redirecttime < 1)
      window.location = '/timers'
    this.setState({redirecttime: this.state.redirecttime-1})
  }

  render() {
    const style = {
      title: {
        fontSize: '1.25rem',
      }
    }
    return(
      <div>
        <BigBox>
          <div style={style.title}>Failed</div>
          :( Something went wrong
          <br/>
          Will redirect to <a href='/'>/timers</a> in {this.state.redirecttime}
        </BigBox>
      </div>
    )
  }
}
