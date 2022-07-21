import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Checkbox } from '../components/atoms/Checkbox/Checkbox'
import { Input } from '../components/atoms/Input/Input'
import { Panel } from '../components/molecules/Panel/Panel'
import { Panel2 } from '../components/molecules/Panel2/Panel2'

export const Registro: React.FC = () => {
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

  useEffect(() => {
    console.log({ totalChecked })
    console.log(checked)
  }, [totalChecked])

  const addOrRemoveOne = (status: boolean) => {
    if (status) {
      return 1
    } else {
      return -1
    }
  }

  const handleOnChange =
    (property: 'nombre' | 'email' | 'password' | 'passwordConfirmation') =>
    async (value: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))
    }

  const handleOnCheckBox =
    (value: 'Anime' | 'Ciencia Ficción' | 'Novelas' | 'Drama' | 'Inteligencia Artificial') =>
    async (status: boolean) => {
      setChecked((current) => ({
        ...current,
        [value]: status
      }))

      setTotalChecked(totalChecked + addOrRemoveOne(status))
    }

  // useEffect(() => {
  //   console.log({ values })
  // }, [values])

  const handleSubmit = async () => {
    // e.preventDefault()
    setLoading(true)
    try {
      const register = await axios.post('http://localhost:3000/signup', {
        email: values.email,
        password: values.password,
        authorid: '3'
      })
      const data: any = await register.data
      if (data.success) {
        console.log(data)
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
                value="Anime"
                id="1"
                disabled={false}
              />
              {totalChecked < 3 && <span>Elige por lo menos 3 categorías</span>}
            </Panel2>
          </div>
          <div className="panel-footer">
            <Link to="/login">
              <pichincha-typography variant="h7">Iniciar Sesión</pichincha-typography>
            </Link>
            <div className="button-div">
              <Button onClick={handleSubmit} loading={loading}>
                Registrar
              </Button>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  )
}
