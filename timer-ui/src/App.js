import React, { Component } from 'react';
import Background from './components/Background';
import Menu from './components/Menu';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
    }
    this.menuClick = this.menuClick.bind(this);
  }

  menuClick(isActive) {
    this.setState({menuActive: isActive});
  }

  render() {
    return (
      <div className="App">
        <Background/>
        <Menu
          isActive={this.state.menuActive}
          menuClick={this.menuClick}/>
      </div>
    );
  }
}
