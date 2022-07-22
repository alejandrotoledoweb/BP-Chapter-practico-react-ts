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

      <div className="buttons-div">
        <Button color="complementary">
          <Link to="/login" className="App-link-1">
            Iniciar Sesión
          </Link>
        </Button>
        <Button>
          <Link to="/registro" className="App-link">
            Registrarme
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default App
