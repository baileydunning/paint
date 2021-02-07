import React, { Component, Fragment } from 'react'
import Canvas from './Canvas'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h3 style={{ textAlign: 'center' }}>Paint!</h3>
        <main className="main">
          <Canvas />
        </main>
      </Fragment>
    );
  }
}
export default App