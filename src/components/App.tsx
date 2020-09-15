import * as React from 'react'
import { hot } from 'react-hot-loader/root'

import './App.scss'

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 className="banner">
          <span className="banner__title">
            react-bowl{' '}
            <span role="img" aria-label="Steaming Bowl emoji">
              🍜
            </span>
          </span>
          <span className="banner__caption">An React Boilerplate</span>
        </h1>
        <p>
          <code>Let the Code begins</code>
        </p>
      </header>
    </div>
  )
}

export default hot(App)
