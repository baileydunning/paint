import React, { Component, Fragment } from 'react'
import Canvas from './Canvas'
import './App.css'

class App extends Component {
  render() {
    return (
      <Fragment>
        <h3 style={{ textAlign: 'center' }}>Paint!</h3>
        <div className="main">
          <div className="color-guide">
            <h5>Color Guide</h5>
            {/* <div className="user user">User</div> */}
            {/* <div className="user guest">Guest</div> */}
          </div>
          <Canvas />
        </div>
      </Fragment>
    );
  }
}
export default App