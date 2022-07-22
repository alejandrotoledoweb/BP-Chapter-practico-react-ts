import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Input } from '../components/atoms/Input/Input'
import store from '../store/Store'

export const Books = () => {
  const navigate = useNavigate()

  useEffect(() => {
    store.fecthBooks('angular', [57])
  })

  useEffect(() => {
    if (!store.isLoggedIn) {
      navigate('/login')
    }
  })

  const [values, setValues] = useState({
    filter: ''
  })

  const handleOnChange = (property: 'filter') => async (value: string, validInput: string) => {
    setValues((current) => ({
      ...current,
      [property]: value
    }))
    // if (validInput === 'normal' || validInput === 'error' || validInput === 'disabled') {
    //   setInfo((current) => ({
    //     ...current,
    //     [property]: false
    //   }))
    // }
    // if (validInput === 'success') {
    //   setInfo((current) => ({
    //     ...current,
    //     [property]: true
    //   }))
    // }
  }
  return (
    <div>
      <div className="top-books">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{store.currentUserName}</pichincha-typography>
      </div>

      <section>
        <div className="top-books-1">
          <pichincha-typography variant="h3">Tus Libros</pichincha-typography>
          <Button color="secondary">Agregar Libro</Button>
        </div>
        <div className="top-books-2">
          <Input
            label="Nombre de Usuario"
            placeholder="Ej. Angular, React"
            initialValue={values.filter}
            onChange={handleOnChange('filter')}
            name="filter"
            inputId="filter"
            errorMessage="Nombre de usuario es requerido"
            pattern="[A-Za-z0-9]{1,20}"
          />
          <Button color="secondary">Agregar Libro</Button>
        </div>
        <section className="books-container">
          {store.books?.map((book) => (
            <div className="book-div">
              <img className="book-image" src={book.image} alt={book.title} />
            </div>
          ))}
        </section>
      </section>
    </div>
  )
}
