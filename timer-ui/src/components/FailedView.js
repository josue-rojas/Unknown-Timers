import React, { Component } from 'react';

export default class FailedView extends Component {
  componentDidMount() {
    document.title = 'Failed';
  }

  render() {
    return(
      <div>
        Failed View
      </div>
    )
  }
}
