import React from 'react'
import { hot } from 'react-hot-loader/root'

import './App.scss'

const App = () => (
  <div className="App">
    <header className="main-header">
      <h1 className="banner">
        <span className="banner__title">
          react-bowl{' '}
          <span role="img" aria-label="Steaming Bowl emoji">
            🍜
          </span>
        </span>
        <span className="banner__caption">An React Boilerplate</span>
      </h1>
    </header>

    <div className="main-content">
      <p>Welcome to the `react-bowl` - An React Boilerplate.</p>
      <p>
        <code>Let the Code begins</code>
      </p>
    </div>
  </div>
)

export default hot(App)
