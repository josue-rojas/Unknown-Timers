import React, { Component } from 'react';
import BigBox from './BigBox';

export default class AboutView extends Component {
  componentDidMount() {
    document.title = 'About Unknown Timer';
  }

  render() {
    const style = {
      wrapper: {
        textAlign: 'center',
        marginTop: '15px',
      },
      title: {
        fontSize: '1.25rem'
      }
    }
    return(
      <div style={style.wrapper}>
        <BigBox>
          <div style={style.title}>About</div>
          <p>
            So in every project I do, I try to challenge myself by doing something I am learning or something new I can learn from. In this project I tackle react.js but also having a backend server for api calls. But before I get to the boring stuff this project is inspired by a previous project I did called <a href='http://dream-deferred.xyz'>&nbsp;'Dream Defered'</a>. That previous project did not use react nor a proper backend. The point of that project was to make a statement about defered action and its urgency to change it. Anyway I liked the project and wanted to recreate it using react and make it have a proper backend but to also be more loose and just not have a statement. It is just random timers from anyone (unknown) who has <a href='/submit'>&nbsp;submited one</a>, shown in a 'simple' UI.
          </p>
          <div style={style.title}>Boring Stuff</div>
          <p>
            In this project I wanted to show off a few things. The first is the UI. From the menu to the tile <a href='/timers'>timers</a>, I tried to be as simple as possible but also to the point where it looks clean and clear. Next is using react. Although I have done other projects using react, this is the first project that handles routes and dynamic pages. In the backend I am using express for api calls and routes and postgresSQL for the database. I have used both of these but not with react. The challenge here was figuring how to go about routing the page. I guess the next challenges here is thinking more like a designer and fixing little stylings things.
          </p>
        </BigBox>
      </div>
    )
  }
}
