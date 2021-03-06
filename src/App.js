import React from 'react';
import './App.css';

const LOCALTESTING = 0;

let copyButtonUnchecked = "<i class='bi bi-clipboard'></i>";
let copyButtonChecked = "<i class='bi bi-clipboard-check'></i>";

const options = [
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
  { value: 5, label: '5' },
  { value: 6, label: '6' },
  { value: 7, label: '7' },
  { value: 8, label: '8' },
  { value: 9, label: '9' },
]

function passwordStrength(password) {
  const zxcvbn = require('zxcvbn');
  var strength = zxcvbn(password);
  return strength;
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: "",
      capitalise: true,
      numbers: false,
      spaces: true,
      special: false,
      strength: null,
      freeformStrength: null,
      numberOfWords: 4
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
    var url = ""

    if( LOCALTESTING ) {
      url = `http://localhost:3001/api/v1/passphrase?capitalise=${this.state.capitalise}&numbers=${this.state.numbers}&spaces=${this.state.spaces}&special=${this.state.special}&words=${this.state.numberOfWords}`
    }
    else {
      url = `https://qasxed.uk:8443/api/v1/passphrase?capitalise=${this.state.capitalise}&numbers=${this.state.numbers}&spaces=${this.state.spaces}&special=${this.state.special}&words=${this.state.numberOfWords}`
    }

    fetch(url)
    .then(res => res.json())
    .then(
      (result) => {
        var strength = passwordStrength(result.passphrase);

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
  
  handleFreeformChange = (event) => {
    var strength = passwordStrength(event.target.value);

    this.setState({
      freeformStrength: strength.crack_times_display.offline_fast_hashing_1e10_per_second
    });

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

  copyDown = () => {
    const passwordBox = document.getElementById("password-box");
    const password = passwordBox.value;

    const input = document.getElementById("password-box-freeform");
    input.value = password;

    var strength = passwordStrength(password);

    this.setState({
      freeformStrength: strength.crack_times_display.offline_fast_hashing_1e10_per_second
    });
  }

  onNumberChange = event => {
    this.setState({
      numberOfWords: event.target.value
    },
    () => {
      this.getNewPassword();
    })
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
        <h1 className="display-4 mb-3">Generate</h1>
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

              <button 
                type="button" 
                className="btn btn-info has-icon"
                id="move-down-button"
                aria-label="Copy password to other inout box"
                onClick={this.copyDown}>

                <i className="bi bi-arrow-down-circle"></i>
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

            <div className="">
              <select
                value={this.state.numberOfWords}
                onChange={this.onNumberChange}
                className="form-select form-select-sm">

                {options.map(({ value, label }, index) => <option value={value} key={value}>{label}</option>)}
              </select>
            </div>

          </div>
        </div>
        
        <div className="row">
          <div className="col">
            <a target="_new" href="https://github.com/dropbox/zxcvbn">Crack time: </a><em>{this.state.strength}</em>
          </div>
        </div>

        <p></p>
        <h1 className="display-4 mb-3">Check</h1>
        <div className="row">
          <div className="form-group input-group">
            <input
              id="password-box-freeform"
              type="text"
              className="form-control form-control-lg"
              placeholder="Password"
              aria-label="Password"
              onFocus={(event) => this.handleFocus(event)}
              onMouseUp={(event) => event.preventDefault()}
              onKeyPress={(event) => this.handleFreeformChange(event)}>
            </input>

            <div className="btn-group" role="group" aria-label="Buttons">
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
          <div className="row">
            <div className="col">
              <a target="_new" href="https://github.com/dropbox/zxcvbn">Crack time: </a><em>{this.state.freeformStrength}</em>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
