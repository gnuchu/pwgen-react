//import logo from './logo.svg';
import React from 'react';
import './App.css';

let copyButtonUnchecked = "<i class='bi bi-clipboard'></i>"
let copyButtonChecked = "<i class='bi bi-clipboard-check'></i>"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      password: ""
    }
  }

  componentDidMount() {
    fetch("http://localhost:3001/api/v1/passphrase")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          password: result.passphrase
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
  
  generateNewPassword = () => {
    //This returns the copied button to its natural state.
    let copiedButton = document.getElementById("copy-button")
    copiedButton.innerHTML = copyButtonUnchecked

    //Get a new password
    fetch("http://localhost:3001/api/v1/passphrase")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          password: result.passphrase
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

  render() {
    return (
      <div className="App">
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

          <div className="btn-group shadow" role="group" aria-label="Buttons">
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
    )
  }
}

export default App;
