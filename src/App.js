import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      orig: [],
      hatesPeople: true,
      copyText: 'Copy'
    }
  }

  soRandomWow = (letter) => {
    let format = '';

    if (this.state.hatesPeople) format = ['*', '~', '_', '```', ''][Math.floor(Math.random() * Math.floor(4))]
    if (Math.random() > 0.5) {
      return format + letter.toUpperCase() + format
    }
    return format + letter.toLowerCase() + format
  }

  changeFormat = (orig) => {
    let annoying = [];
    for (const letter of orig) {
      if (letter !== ' ') annoying.push(this.soRandomWow(letter));
      if (letter === ' ') annoying.push(letter);
    }

    this.setState({
      text: annoying.join(''),
      orig: orig
    })
  }

  handleChange = (e) => {
    let { orig } = this.state;

    orig.push(e.key)

    this.changeFormat(orig)
  }

  handleBackspace = (e) => {
    let { orig } = this.state;

    if (e.key === 'Backspace') {
      orig.pop();

      this.changeFormat(orig)
    }
  }

  changeHate = () => {
    this.setState({
      hatesPeople: !this.state.hatesPeople
    })
    this.changeFormat(this.state.orig)
  }

  copyToUser = () => {
    navigator.clipboard.writeText(this.state.text)
      .then(() => this.setState({copyText: 'Copied'}))
  }

  render() {
    const { text, hatesPeople, copyText } = this.state;
    return (
      <div className="App">
        <h1>Annoy-o-meter 4000</h1>
        <label id="text-field">
          <input
              type="text"
              value={text}
              onKeyPress={this.handleChange}
              onKeyDown={this.handleBackspace}
            ></input>
            <input type="button" value={copyText} onClick={this.copyToUser}/>
        </label>
        <label id="checkbox" >
          <input
            type="checkbox"
            checked={hatesPeople}
            onChange={this.changeHate}
          />
          I hate people
        </label>
      </div>
    );
  }
}

export default App;
