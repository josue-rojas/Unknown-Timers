import React, { Component } from 'react';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import './styles/SubmitView.css'

export default class SubmitView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      date: moment(),
      time: moment(),
      color: '#345678',
      inputCheck: {
        name: true,
        date: true,
        time: true,
        color: true,
      },
    }
    this.onChangeInput = this.onChangeInput.bind(this);
    this.submitform = this.submitform.bind(this);
    // functions to check inputs
    this.checker = {
      name: (v) => { return true },
      date: (v) => { return moment().isSameOrBefore(v, 'day')},
      time: (v) => {
        if(moment().isSame(this.state.date, 'day')){
          const test = moment().set({
            'hour': v.hours(),
            'minute': v.minutes(),
          })
          return moment().isBefore(test);
        }
        return moment().isBefore(this.state.date);
      },
      // https://stackoverflow.com/questions/8027423/how-to-check-if-a-string-is-a-valid-hex-color-representation
      // might not need since the color kind of make sure it is correct.
      color: (v) => { return  /^#[0-9A-F]{6}$/i.test(v) },
    }
  }

  componentDidMount() {
    document.title = 'Submit New Timer';
  }

  //dynamic onchange for every input
  // https://stackoverflow.com/questions/29280445/reactjs-setstate-with-a-dynamic-key-name
  onChangeInput(e, statekey) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
    let inputCheck = {...this.state.inputCheck};
    inputCheck[statekey] = this.checker[statekey](e.target.value);
    this.setState({
      [statekey]: e.target.value,
      inputCheck: inputCheck,
    })
  }

  submitform() {
    // last check
    let hasError = 0;
    const inputCheck = {};
    for(let key in this.state.inputCheck) {
      inputCheck[key] = this.checker[key](this.state[key]);
      hasError += inputCheck[key] ? 0 : 1;
    }
    this.setState({ inputCheck: inputCheck });
    if (hasError > 0){
      return false;
    }
    const hour = this.state.time._d.getHours();
    const min = this.state.time._d.getMinutes();
    const sec = this.state.time._d.getSeconds();
    const data = {
      name: this.state.name,
      expiration: new Date(this.state.date._d.setHours(hour, min, sec)),
      color: this.state.color,
    }
    fetch('/timer', {
      method: 'post',
      body: JSON.stringify(data),
      headers: new Headers({'Content-Type': 'application/json'})
    })
    .then(res => res.json())
    .catch(error => window.location = '/failed')
    .then(response => {
      if(['error'] in response){
        window.location = '/failed';
        return
      }
      window.location = '/success';
    });
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
        padding: '25px 50px 20px',
        margin: 'auto',
      },
      title: {
        textAlign: 'center',
        fontSize: '1.25rem',
      },
      line: {
        width: '75%',
        borderTop: '1px solid rgb(209, 209, 209)',
        margin: 'auto',
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
      button: {
        margin: 'auto',
        marginTop: '20px',
        minHeight: '30px',
        display: 'table',
        padding: '10px',
        cursor: 'pointer',
      }
    }
    return(
      <div style={style.wrapper}>
        <div style={style.formBox} className='FormBox'>
          <div style={style.title}>Submit A New Timer</div>
          <div style={style.line}/>
          <div style={style.form}>
            <div style={style.label}>Name</div>
            <input
              style={style.input}
              value={this.state.name}
              onChange={(e) => this.onChangeInput(e, 'name')}
              type='text'
              placeholder='Name of timer'
              className={this.state.inputCheck.name ? 'check' : 'error'}/>
            <div style={style.label}>Date</div>
            <DatePicker
              selected={this.state.date}
              onChange={(date)=>{
                const e = {target:{value:date}};
                this.onChangeInput(e, 'date');
              }}
              className={this.state.inputCheck.date ? 'check' : 'error'}/>
            <div style={style.label}>Time</div>
            <DatePicker
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={30}
              dateFormat="LT"
              timeCaption="Time"
              selected={this.state.time}
              onChange={(date)=>{
                const e = {target:{value:date}};
                this.onChangeInput(e, 'time');
              }}
              className={this.state.inputCheck.time ? 'check' : 'error'}/>
            <div style={style.label}>Color</div>
             <ColorPicker
              color={this.state.color}
              enableAlpha={false}
              onChange={(color)=>{
                const e = {target:{value:color.color}};
                this.onChangeInput(e, 'color');
              }}
              placement="topRight"
              className={this.state.inputCheck.color ? 'check' : 'error'}/>
            <div style={style.button} className='form-button' onClick={this.submitform}>Submit</div>
          </div>
        </div>
      </div>
    )
  }
}
