import React, { Component } from 'react';
import Background from './components/Background';
import Menu from './components/Menu';
import HomeView from './components/HomeView';
import TimersView from './components/TimersView';
import SubmitView from './components/SubmitView';
import AboutView from './components/AboutView';
import SuccessView from './components/SuccessView';
import FailedView from './components/FailedView';



export default class App extends Component {
  constructor(props) {
    super(props);
    // this should match to the links in the nav.... maybe just pass this as a prop..........TODO: pass this as a prop so it can be handled when changing links, might need titles
    this.views = {
      '/': true,
      '/timers': true,
      '/submit': true,
      '/about': true,
      '/success': true,
      '/failed': true,
    }
    this.state = {
      menuActive: false,
      activeView: this.views[window.location.pathname] ? window.location.pathname : '/',
    }
    this.menuClick = this.menuClick.bind(this);
    this.getView = this.getView.bind(this);
  }

  menuClick(isActive) {
    this.setState({menuActive: isActive});
  }

  // simple method for 'changing and handling' pages
  // this is to avoid using react-router
  getView(activeView) {
    const style = {
      viewWrapper: {
        opacity: this.state.menuActive ? '0' : '1',
        // making the view fixed will stop it from scrolling (cause view ui is invisible)
        position: this.state.menuActive ? 'fixed' : '',
        width: '100%',
        transition: '400ms',
      }
    }
    const view = {
      '/': (<HomeView/>),
      '/timers': (<TimersView/>),
      '/submit': (<SubmitView/>),
      '/about': (<AboutView/>),
      '/success': (<SuccessView/>),
      '/failed': (<FailedView/>),
    }[activeView];
    return(
      <div style={style.viewWrapper}>
        {view}
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <Background
          isActive={this.state.menuActive}/>
        <Menu
          isActive={this.state.menuActive}
          menuClick={this.menuClick}/>
        {this.getView(this.state.activeView)}
      </div>
    );
  }
}
