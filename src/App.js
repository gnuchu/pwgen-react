//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { generatePassword } from './Functions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';


// const subtractTwoArrays = (arr1, arr2) => {
//   arr1.filter( el => !arr2.includes(el) )
// }

const initialState = {
  upper: ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'],
  lower: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
  numbers: ['0','1','2','3','4','5','6','7','8','9'],
  special: ['!', '$', '@', '&', '?', '*', '^'], 
  allChars: [],
  length: 20,
  useUpper: true,
  useLower: true,
  useNumbers: true,
  useSpecial: true,
  password: "password"
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = initialState
  }
  
  componentDidMount() {
    const allChars = this.state.upper.concat(this.state.lower, this.state.numbers, this.state.special)
    this.setState({
      allChars: allChars
    })
  }
  
  onChangeUseUpper = (event) => {
    this.setState(initialState => ({
      useUpper: !initialState.useUpper,
      password: generatePassword(this.state)
    }))
    
  }

  onChangeUseLower = () => {
    this.setState(initialState => ({
      useLower: !initialState.useLower,
      password: generatePassword(this.state)
    }))
  }

  onChangeUseNumbers = () => {
    this.setState(initialState => ({
      useNumbers: !initialState.useNumbers,
      password: generatePassword(this.state)
    }))
  }

  onChangeUseSpecial = () => {
    this.setState(initialState => ({
      useSpecial: !initialState.useSpecial,
      password: generatePassword(this.state)
    }))
  }

  generateNewPassword = () => {
    console.log(this.state)
    this.setState({
      password: generatePassword(this.state)
    })
  }

  handleFocus = (event) => {
    event.target.select();
  }

  handleLength = (event) => {
    let newLength = Number(event.target.value);
    newLength = newLength > 77 ? 77 : newLength;
    this.setState({
      length: newLength,
      password: generatePassword(this.state)
    })
  }

  copyPassword = () => {
    const passwordBox = document.getElementById("password-box");
    const password = passwordBox.value;

    navigator.clipboard.writeText(password);
    
    let notificationDiv = document.getElementById("copied-notification")
    notificationDiv.innerHTML = "Copied!"

    $('#copied-notification').show()
    $('#copied-notification').fadeOut(5000)
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="jumbotron">
            <div className="row">
              <div className="col col-sm-12">
                <center>
                  <h3>Password Generator</h3>
                </center>
                <div className="checkBoxes">
                  <div className="row">
                    <div className="col-6">
                      <div className="form-check form-check-inline">
                        <input 
                          checked={this.state.useUpper}
                          onChange={this.onChangeUseUpper}
                          className="form-check-input"
                          type="checkbox"
                          id="upperCheck">
                        </input>
                        <label className="form-check-label" htmlFor="upperCheck">Uppercase</label>
                      </div>
                    </div>
                    
                    <div className="col-6">
                      <div className="form-check form-check-inline">
                        <input 
                          checked={this.state.useLower}
                          onChange={this.onChangeUseLower}
                          className="form-check-input" 
                          type="checkbox" 
                          id="lowerCheck">
                        </input>
                        <label className="form-check-label" htmlFor="lowerCheck">Lowercase</label>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <div className="form-check form-check-inline">
                        <input 
                          checked={this.state.useNumbers}
                          onChange={this.onChangeUseNumbers}
                          className="form-check-input"
                          type="checkbox"
                          id="numberCheck">
                        </input>
                        <label className="form-check-label" htmlFor="numberCheck">Numbers</label>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="form-check form-check-inline">
                        <input 
                          checked={this.state.useSpecial}
                          onChange={this.onChangeUseSpecial}
                          className="form-check-input"
                          type="checkbox"
                          id="specialCheck">
                        </input>
                        <label className="form-check-label" htmlFor="specialCheck">Special</label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <input
                      type="number"
                      className="form-control input-margins input-box-center"
                      aria-label="Password Length"
                      value={this.state.length}
                      onChange={(event) => this.handleLength(event)}>
                    </input>

                    <div className="input-group">
                      <input 
                        id="password-box"
                        type="text" 
                        className="form-control input-box-center input-margins"
                        placeholder="Password" 
                        aria-label="Password"
                        value={ this.state.password }
                        onFocus={ (event) => this.handleFocus(event) }
                        onMouseUp={ (event) => event.preventDefault() }
                        readOnly>
                      </input>

                      <button 
                        className="btn btn-outline-secondary input-margins"
                        type="button" 
                        id="copy-button"
                        aria-label="Copy"
                        onClick={this.copyPassword}>
                        
                        <FontAwesomeIcon icon={faCopy} />

                      </button>

                    </div>
                  </div>
                </div>
                  
                <div className="row">
                  <div className="col col-sm-4"></div>

                  <div className="col col-sm-4">
                    <button 
                      type="button" 
                      className="btn btn-primary float-right"
                      onClick={this.generateNewPassword}>
                    
                      Generate

                    </button>
                  </div>

                  <div className="col col-sm-4">
                    <div id="copied-notification"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
