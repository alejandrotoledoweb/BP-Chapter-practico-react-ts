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

      <Button>
        <Link to="/registro" className="App-link">
          Registrarme
        </Link>
      </Button>
    </div>
  )
}

export default App
