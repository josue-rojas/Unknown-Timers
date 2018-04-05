import React, { Component } from 'react';

export default class TimersView extends Component {
  componentDidMount() {
    document.title = 'Unknown Timers';
  }

  render() {
    return(
      <div>
        Timers View
      </div>
    )
  }
}
