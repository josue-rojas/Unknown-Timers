import React, { Component } from 'react';

export default class SuccessView extends Component {
  componentDidMount() {
    document.title = 'Success';
  }
  
  render() {
    return(
      <div>
        Success View
      </div>
    )
  }
}
