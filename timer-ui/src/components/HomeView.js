import React, { Component } from 'react';

export default class HomeView extends Component {
  componentDidMount() {
    document.title = 'Unknown Timers';
  }

  render() {
    return(
      <div>
        Home View
      </div>
    )
  }
}
