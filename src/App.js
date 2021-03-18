//import logo from './logo.svg';
import React from 'react';
import './App.css';

let copyButtonUnchecked = "<i class='bi bi-clipboard'></i>"
let copyButtonChecked = "<i class='bi bi-clipboard-check'></i>"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      capitalise: true,
      numbers: false,
      spaces: true,
      special: false,
      strength: null
    }
  }

  componentDidMount() {
    this.getNewPassword();
  }
  
  generateNewPassword = () => {
    //This returns the copied button to its natural state.
    let copiedButton = document.getElementById("copy-button")
    copiedButton.innerHTML = copyButtonUnchecked
    this.getNewPassword();
  }

  getNewPassword() {
    const url = `https://qasxed.uk:8443/api/v1/passphrase?capitalise=${this.state.capitalise}&numbers=${this.state.numbers}&spaces=${this.state.spaces}&special=${this.state.special}`
    const zxcvbn = require('zxcvbn');

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        var strength = zxcvbn(result.passphrase);

        this.setState({
          isLoaded: true,
          password: result.passphrase,
          strength: strength.crack_times_display.offline_fast_hashing_1e10_per_second
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  handleFocus = (event) => {
    event.target.select();
  }

  copyPassword = () => {
    const passwordBox = document.getElementById("password-box");
    const password = passwordBox.value;

    navigator.clipboard.writeText(password);
    
    let copiedButton = document.getElementById("copy-button")
    copiedButton.innerHTML = copyButtonChecked

    setTimeout(() => {
      copiedButton.innerHTML = copyButtonUnchecked
    }, 2000);

  }
  
  onChangeCapitalise = (event) => {
    this.setState({
      capitalise: !this.state.capitalise
    },
    () => {
      this.getNewPassword();
    })
  }

  onChangeNumbers = () => {
    this.setState({
      numbers: !this.state.numbers
    },
    () => {
      this.getNewPassword();
    })
  }

  onChangeSpaces = () => {
    this.setState({
      spaces: !this.state.spaces
    },
    () => {
      this.getNewPassword();
    })
  }

  onChangeSpecial = () => {
    this.setState({
      special: !this.state.special
    },
    () => {
      this.getNewPassword();
    })
  }

  render() {
    return (
      <div className="App">
        <h1 className="display-4 mb-3">Pass phrase generator</h1>
        <div className="row">
          <div className="form-group input-group">
            <input 
              id="password-box"
              type="text" 
              className="form-control form-control-lg"
              placeholder="Password" 
              aria-label="Password"
              value={ this.state.password || "password" }
              onFocus={ (event) => this.handleFocus(event) }
              onMouseUp={ (event) => event.preventDefault() }
              readOnly>
            </input>

            <div className="btn-group" role="group" aria-label="Buttons">
              <button 
                type="button" 
                className="btn btn-primary has-icon"
                id="generate-button"
                aria-label="Generate new phrase"
                onClick={this.generateNewPassword}>

                <i className="bi bi-play"></i>
              </button>

              <button 
                type="button" 
                className="btn btn-secondary has-icon"
                id="copy-button"
                aria-label="Copy phrase"
                onClick={this.copyPassword}>

                <i className="bi bi-clipboard"></i>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="form-group input-group">
            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="capitaliseCheckbox"
                onChange={this.onChangeCapitalise}
                checked={this.state.capitalise}/>

              <label className="form-check-label" htmlFor="capitaliseCheckbox">Capitalise</label>
            </div>

            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="spacesCheckbox"
                onChange={this.onChangeSpaces}
                checked={this.state.spaces}/>

              <label className="form-check-label" htmlFor="spacesCheckbox">Spaces</label>
            </div>

            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="numbersCheckbox" 
                onChange={this.onChangeNumbers}
                checked={this.state.numbers}/>

              <label className="form-check-label" htmlFor="numbersCheckbox">Numbers</label>
            </div>

            <div className="form-check form-check-inline">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id="specialCheckbox"
                onChange={this.onChangeSpecial}
                checked={this.state.special}/>

              <label className="form-check-label" htmlFor="specialCheckbox">Special</label>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <a target="_new" href="https://github.com/dropbox/zxcvbn">Crack time: </a><em>{this.state.strength}</em>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
