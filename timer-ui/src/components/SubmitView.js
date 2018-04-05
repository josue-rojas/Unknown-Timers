import React, { Component } from 'react';
import './styles/SubmitView.css'
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

export default class SubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#345678',
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(color) {
    console.log(color);
  }

  componentDidMount() {
    document.title = 'Submit New Timer';
  }

  render() {
    const style = {
      wrapper: {
        display: 'flex',
        marginTop: '10px'
      },
      formBox: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderRadius: '5px',
        padding: '25px',
        margin: 'auto',
      },
      title: {
        textAlign: 'center',
        fontSize: '1.25rem',
        marginBottom: '10px',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
      },
      label: {
        marginTop: '7px',
      },
      input: {
        outline: 'none',
        minHeight: '30px',
        marginTop: '0',
        border: '1px solid #ddd',
        borderRadius: '0',
        WebkitAppearance: 'none',
      },
      timewrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      timeinputwrapper: {
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
      }
    }
    return(
      <div style={style.wrapper}>
        <div style={style.formBox} className='FormBox'>
          <div style={style.title}>Submit A New Timer</div>
          <div style={style.form}>
            <div style={style.label}>Name</div>
            <input style={style.input} type='text' placeholder='Name of timer'/>
            <div style={style.label}>Month</div>
            <select style={style.input} name="month">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map(month => (<option value={month}>{month}</option>))}
            </select>
            <div style={style.timewrapper}>
              <div style={style.timeinputwrapper}>
                <div style={style.label}>Day</div>
                <input style={style.input} type='text' placeholder=''/>
              </div>
              <div style={style.timeinputwrapper}>
                <div style={style.label}>Hour</div>
                <input style={style.input} type='text' placeholder=''/>
              </div>
            </div>
            <div style={style.timewrapper}>
              <div style={style.timeinputwrapper}>
                <div style={style.label}>Min</div>
                <input style={style.input} type='text' placeholder=''/>
              </div>
              <div style={style.timeinputwrapper}>
                <div style={style.label}>Sec</div>
                <input style={style.input} type='text' placeholder=''/>
              </div>
            </div>
            <div style={style.label}>Color</div>
             <ColorPicker
              color={'#F10'}
              enableAlpha={false}
              onChange={this.handleChange}
              placement="topRight"/>
          </div>
        </div>
      </div>
    )
  }
}
