import React from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import { Button } from './components/atoms/Button/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Onboard Express</h1>
      </header>

      <button className="App-button">
        <Link to="/registro" className="App-link">
          Registrarme
        </Link>
      </button>
    </div>
  )
}

export default App
