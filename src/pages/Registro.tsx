import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import { ErrorMessage } from '../components/atoms/ErrorMessage/ErrorMessage'
import { Input } from '../components/atoms/Input/Input'
import { Panel } from '../components/molecules/Panel/Panel'
import { Panel2 } from '../components/molecules/Panel2/Panel2'
import store from '../store/Store'
import { observer } from 'mobx-react'

export const Registro: React.FC = observer(() => {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })
  const [loading, setLoading] = useState(false)
  const [checked, setChecked] = useState({
    Anime: false,
    'Ciencia Ficción': false,
    Novelas: false,
    Drama: false,
    'Inteligencia Artificial': false
  })

  const [totalChecked, setTotalChecked] = useState(0)
  const [catgeories, setCategories] = useState<string[]>([])
  const [info, setInfo] = useState({})
  const [valid1, setValid1] = useState(false)
  const [valid2, setValid2] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (totalChecked >= 3) {
      setValid2(true)
    } else {
      setValid2(false)
    }
  }, [catgeories])

  useEffect(() => {
    const areTruly = Object.values(info).every((value) => value === true)
    setValid1(areTruly)
  }, [info])

  const addOrRemoveOne = (status: boolean) => {
    if (status) {
      return 1
    } else {
      return -1
    }
  }

  const addOrRemoveCat = (status: boolean, cat: string) => {
    const indexUnChecked = catgeories.indexOf(cat)
    if (status) {
      setCategories((current) => [...current, cat])
    } else {
      setCategories((current) => current.filter((_, index) => index !== indexUnChecked))
    }
  }

  const handleOnChange =
    (property: 'nombre' | 'email' | 'password' | 'passwordConfirmation') =>
    async (value: string, validInput: string) => {
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

  const handleOnCheckBox =
    (value: 'Anime' | 'Ciencia Ficción' | 'Novelas' | 'Drama' | 'Inteligencia Artificial') =>
    async (status: boolean) => {
      setChecked((current) => ({
        ...current,
        [value]: status
      }))

      setTotalChecked(totalChecked + addOrRemoveOne(status))
      addOrRemoveCat(status, value)
    }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const body = {
        username: values.nombre,
        email: values.email,
        password: values.password,
        categories: catgeories
      }
      console.log({ body })
      const register = await axios.post('https://cangular-api.herokuapp.com/users/', body)
      const data = await register.data
      console.log(data)
      if (data.status === 'success') {
        store.saveId(data.id)
        navigate('/login')
      }
    } catch (error) {
      console.log({ error })
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="panel-container">
      <Panel title="Registrarse">
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
              pattern="[A-Za-z0-9]{6,20}"
              required={true}
            />
            <Input
              label="Correo electrónico"
              placeholder="Ej. name@example.com"
              initialValue={values.email}
              onChange={handleOnChange('email')}
              name="email"
              inputId="email"
              type="email"
              errorMessage="Correo es requerido"
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
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
              pattern="^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-/]).{8,}$"
              required={true}
            />
            <Input
              label="Confirmar contraseña"
              placeholder="*****"
              initialValue={values.passwordConfirmation}
              onChange={handleOnChange('passwordConfirmation')}
              name="password"
              inputId="password"
              type="text"
              errorMessage="Contraseña no coincide"
              pattern={values.password}
              required={true}
            />
          </div>

          <div>
            <Panel2 title="Categorías">
              <Checkbox onClick={handleOnCheckBox('Anime')} value="Anime" id="1" disabled={false} />
              <Checkbox
                onClick={handleOnCheckBox('Ciencia Ficción')}
                value="Ciencia Ficción"
                id="1"
                disabled={false}
              />
              <Checkbox
                onClick={handleOnCheckBox('Novelas')}
                value="Novelas"
                id="1"
                disabled={false}
              />
              <Checkbox onClick={handleOnCheckBox('Drama')} value="Drama" id="1" disabled={false} />
              <Checkbox
                onClick={handleOnCheckBox('Inteligencia Artificial')}
                value="Inteligencia Artificial"
                id="1"
                disabled={false}
              />
              {totalChecked < 3 && <ErrorMessage>Elige por lo menos 3 categorías</ErrorMessage>}
            </Panel2>
          </div>
          <div className="panel-footer">
            <Link to="/login">
              <pichincha-typography variant="h7">Iniciar Sesión</pichincha-typography>
            </Link>
            <div className="button-div">
              <Button
                onClick={handleSubmit}
                loading={loading}
                disabled={valid2 && valid1 ? false : true}
              >
                Registrar
              </Button>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  )
})
