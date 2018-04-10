import React, { Component } from 'react';
import './styles/Menu.css';

class Hamburger extends Component {
  render(){
    const style = {
      wrapper: {
        width: '32px',
        height: '32px',
        position: 'relative',
        cursor: 'pointer',
        zIndex: '30'
      },
      lines: {
        width: '100%',
        height: '5px',
        position: 'absolute',
        transition: '400ms'
      },
      line1: {
        marginTop: this.props.active ? '50%' : '4px',
        transform: this.props.active ? 'rotate(45deg)' : 'rotate(-180deg)',
      },
      line2: {
        marginTop: '13px',
        opacity: this.props.active ? '0' : '1',
      },
      line3: {
        marginTop: this.props.active ? '50%' : '22px',
        transform: this.props.active ? 'rotate(-45deg)' : 'rotate(180deg)',
      },
    }
    return(
      <div  style={style.wrapper} onClick={this.props.onClick} className='Hamburger'>
        <div style={Object.assign({},style.lines, style.line1)}/>
        <div style={Object.assign({},style.lines, style.line2)}/>
        <div style={Object.assign({},style.lines, style.line3)}/>
      </div>
    )
  }
}

export default class Menu extends Component {
  render() {
    const active_link = '';
    const style = {
      nav: {
        display: 'flex',
        width: '100vw',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: '20px 25px'
      },
      titles: {
        textAlign: 'center',
        marginRight: '30px',
      },
      title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
      },
      subtitle: {
        fontWeight: '200',
      },
      links: {
        display: 'flex',
        transition: '400ms',
        // might make this part of a class in css
        transform: this.props.isActive ? '' : 'translateY(-100%)',
        zIndex: '20',
      },
      link: {
        fontSize: '1.25rem',
        transition: '400ms',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
    return(
      <div style={style.nav}>
        <div style={style.titles}>
          <div style={style.title}>Unknown Timers</div>
          <div style={style.subtitle}>Simply Random Timers</div>
        </div>
        <Hamburger
          active={this.props.isActive}
          onClick={()=>this.props.menuClick(!this.props.isActive)}/>
        <div style={style.links} className='HamLinks'>
          <a onClick={()=>this.props.menuClick(false)} style={style.link} href='/'>Home</a>
          <a onClick={()=>this.props.menuClick(false)} style={style.link} href='/timers'>Timers</a>
          <a onClick={()=>this.props.menuClick(false)} style={style.link} href='/submit'>Submit</a>
          <a onClick={()=>this.props.menuClick(false)} style={style.link} href='/about'>About</a>
          <a onClick={()=>this.props.menuClick(false)} style={style.link}  href='https://github.com/josuerojasrojas/Unknown-Timers'>Source</a>
        </div>
      </div>
    )
  }
}
