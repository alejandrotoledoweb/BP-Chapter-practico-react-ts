import React, { useEffect, useState } from 'react'
import { Input } from '../components/atoms/Input/Input'

export const Registro: React.FC = () => {
  const [values, setValues] = useState({
    nombre: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleOnChange =
    (property: 'nombre' | 'email' | 'password' | 'passwordConfirmation') =>
    async (value: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))
    }

  useEffect(() => {
    console.log({ values })
  }, [values])

  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(values)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
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

        <button>Submit</button>
      </form>
    </div>
  )
}
