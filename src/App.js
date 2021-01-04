//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { generatePassword } from './Functions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import $ from 'jquery';

class App extends React.Component {

  state = {
    password: generatePassword(20),
    length: 20,
    useUpper: true,
    useLower: true,
    useNumbers: true,
    useSpecial: true
  }

  onChangeUseUpper = (event) => {
    this.setState(initialState => ({
      useUpper: !initialState.useUpper,
    }))
  }

  onChangeUseLower = () => {
    this.setState(initialState => ({
      useLower: !initialState.useLower
    }))
  }

  onChangeUseNumbers = () => {
    this.setState(initialState => ({
      useNumbers: !initialState.useNumbers
    }))
  }

  onChangeUseSpecial = () => {
    this.setState(initialState => ({
      useSpecial: !initialState.useSpecial
    }))
  }

  generateNewPassword = () => {
    this.setState({
      password: generatePassword(this.state.length)
    })
  }

  handleFocus = (event) => {
    event.target.select();
  }

  handleLength = (event) => {
    let newLength = Number(event.target.value);
    newLength = newLength > 77 ? 77 : newLength;
    this.setState({
      length: newLength
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

  selectChangedHandler(event) {
    console.log(event);
  }

  render() {
    return (
      <div className="App">
        <div className="container-fluid">
          <div className="jumbotron">
            <div className="row">
              <div className="col-3">
              </div>
              <div className="col"> 
                <div className="row d-flex justify-content-center title">
                  <h3>Password Generator</h3>
                </div>
                <div className="row d-flex justify-content-center">
                  <div className="checkBoxes">
                    {/* <div className="form-group mb-3 flex-nowrap"> */}
                      <div className="input-group-prepend">
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
                        
                        <input
                          type="number"
                          className="form-control password-input input-box-center"
                          aria-label="Password Length"
                          value={this.state.length}
                          onChange={(event) => this.handleLength(event)}>
                        </input>
                      </div>
                    </div>
                      
                    <div className="input-group mb-3">
                      <input 
                        id="password-box"
                        type="text" 
                        className="form-control input-box-center"
                        placeholder="Password" 
                        aria-label="Password"
                        value={this.state.password}
                        onFocus={(event) => this.handleFocus(event)}
                        readOnly>
                      </input>

                      <div className="input-group-append">
                        <button 
                          type="button" 
                          className="btn btn-light float-right"
                          onClick={this.generateNewPassword}>
                        
                          Generate

                        </button>
                      </div>

                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="copy-button"
                          aria-label="Copy"
                          onClick={this.copyPassword}>
                          
                          <FontAwesomeIcon icon={faCopy} />

                        </button>
                      </div>
                      <div id="copied-notification"></div>
                    </div>
                </div>
              </div>
              <div className="col-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
