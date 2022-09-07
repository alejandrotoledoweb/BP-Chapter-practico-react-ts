import { observer } from 'mobx-react'
import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AgregarLibro from './pages/AgregarLibro/AgregarLibro'
import { Books } from './pages/Books/Books'
import { Home } from './pages/Home/Home'
import Login from './pages/Login/Login'
import Registro from './pages/Registro/Registro'
import { SelectedBook } from './pages/SelectedBook/SelectedBook'
import store from './store/Store'

const App: React.FC = observer(() => {
  // const navigate = useNavigate()

  const token = sessionStorage.getItem('token')
  const username = sessionStorage.getItem('username')
  useEffect(() => {
    //   if (!token && !username) {
    //     navigate('/login')
    //   } else {
    store.saveJWTAndName(token, username)
    //   }
  }, [sessionStorage])
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/books"
            element={
              <Books
                jwt={store.currentUserJWT || token}
                username={store.currentUserName || username}
              />
            }
          />
          <Route
            path="/selectedbook/:id"
            element={<SelectedBook jwt={store.currentUserJWT || token} />}
          />
          <Route path="/agregarlibro" element={<AgregarLibro />} />
          <Route path="/editarlibro" element={<AgregarLibro />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
})

export default App
