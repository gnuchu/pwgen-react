//import logo from './logo.svg';
import React from 'react';
import './App.css';
import { generatePassword } from './Functions'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

class App extends React.Component {

  state = {
    password: generatePassword(20),
    length: 20
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
              <div className="col-1">
              </div>
              <div className="col"> 
                <div className="row d-flex justify-content-center title">
                  <h1>Password Generator</h1>
                </div>
                <div className="row d-flex justify-content-center">
                <form>
                  <div className="form-group mb-3 flex-nowrap">
                    <div className="input-group-prepend">
                      <div className="form-check form-check-inline">
                        <input onChange={(event)=>this.selectChangedHandler(event)} className="form-check-input" type="checkbox" id="lowerCheck" checked></input>
                        <label className="form-check-label" htmlFor="lowerCheck">Uppercase</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input onChange={(event)=>this.selectChangedHandler(event)} className="form-check-input" type="checkbox" id="upperCheck" checked></input>
                        <label className="form-check-label" htmlFor="upperCheck">Lowercase</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input onChange={(event)=>this.selectChangedHandler(event)} className="form-check-input" type="checkbox" id="numberCheck" checked></input>
                        <label className="form-check-label" htmlFor="numberCheck">Numbers</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input onChange={(event)=>this.selectChangedHandler(event)} className="form-check-input" type="checkbox" id="specialCheck" checked></input>
                        <label className="form-check-label" htmlFor="specialCheck">Special</label>
                      </div>
                    </div>
                    
                    <div className="input-group mb-3">
                      <input 
                        id="password-box"
                        type="text" 
                        className="form-control" 
                        placeholder="Password" 
                        aria-label="Password"
                        value={this.state.password}
                        onFocus={(event) => this.handleFocus(event)}
                        readOnly>
                      </input>

                      <div className="input-group-append">
                        <button 
                          className="btn btn-outline-secondary" 
                          type="button" 
                          id="copy-button"
                          onClick={this.copyPassword}>
                          
                          <FontAwesomeIcon icon={faCopy} />

                        </button>
                      </div>
                    </div>

                    <input
                      type="number"
                      className="form-control password-input"
                      aria-label="Password Length"
                      value={this.state.length}
                      onChange={(event) => this.handleLength(event)}>
                    </input>

                    <button 
                      type="button" 
                      className="btn btn-primary float-right"
                      onClick={this.generateNewPassword}>
                      
                      Generate

                    </button>
                  </div>
                </form>
                </div>
              </div>
              <div className="col-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
