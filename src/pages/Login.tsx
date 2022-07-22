import axios from 'axios'
import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Input } from '../components/atoms/Input/Input'
import { Panel } from '../components/molecules/Panel/Panel'
import store from '../store/Store'

const Login: React.FC = observer(() => {
  const [loading, setLoading] = useState<boolean>(false)
  const [values, setValues] = useState({
    nombre: '',
    password: ''
  })
  const [info, setInfo] = useState({})
  const [valid1, setValid1] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (store.isLoggedIn) {
      navigate('/books')
    }
  })

  useEffect(() => {
    const areTruly = Object.values(info).every((value) => value === true)
    setValid1(areTruly)
  }, [info])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const body = {
        username: values.nombre,
        password: values.password
      }
      console.log({ body })
      const register = await axios.post('https://cangular-api.herokuapp.com/users/login', body)
      const data = await register.data
      console.log(data)
      if (data) {
        sessionStorage.setItem('token', data.access_token)
        sessionStorage.setItem('username', data.user.username)
        store.saveJWTAndName(data.access_token, data.user.username)
        store.saveUserId(data.user.userId)
        store.changeLoggedInStatus()
        navigate('/books')
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }

  const handleOnChange =
    (property: 'nombre' | 'password') => async (value: string, validInput: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))
      if (validInput === 'normal' || validInput === 'error' || validInput === 'disabled') {
        setInfo((current) => ({
          ...current,
          [property]: false
        }))
      }
      if (validInput === 'success') {
        setInfo((current) => ({
          ...current,
          [property]: true
        }))
      }
    }
  return (
    <div className="login-container">
      <Panel title="Iniciar Sesión">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <Input
              label="Nombre de Usuario"
              placeholder="Nombre de usuario"
              initialValue={values.nombre}
              onChange={handleOnChange('nombre')}
              name="nombre"
              inputId="nombre"
              errorMessage="Nombre de usuario es requerido"
              pattern="[A-Za-z0-9]{4,20}"
              required={true}
            />
            <Input
              label="Contraseña"
              placeholder="*****"
              initialValue={values.password}
              onChange={handleOnChange('password')}
              name="password"
              inputId="password"
              type="text"
              errorMessage="Contraseña es requerida"
              pattern="[A-Za-z0-9]{4,20}"
              required={true}
            />
          </div>
          <div className="panel-footer">
            <Link to="/registro">
              <pichincha-typography variant="h7">Registrarme</pichincha-typography>
            </Link>
            <div className="button-div">
              <Button onClick={handleSubmit} loading={loading} disabled={valid1 ? false : true}>
                Inciar Sesión
              </Button>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  )
})

export default Login
