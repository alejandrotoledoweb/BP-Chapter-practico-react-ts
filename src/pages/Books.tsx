import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Input } from '../components/atoms/Input/Input'
import { Select } from '../components/atoms/Select/Select'
import { Spinner } from '../components/atoms/Spinner/Spinner'
import store from '../store/Store'
import BookInterface from '../store/Store'

export const Books = () => {
  const navigate = useNavigate()
  const [booksList, setBooksList] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const token = sessionStorage.getItem('token')
    const username = sessionStorage.getItem('username')
    if (!token && !username) {
      navigate('/login')
    } else {
      store.saveJWTAndName(token, username)
    }
  })

  useEffect(() => {
    setLoading(true)
    const booksList1 = async () => {
      await store.fecthBooks('angular', [57])
      // setBooksList(store.books)
      setLoading(false)
    }
    setTimeout(() => {
      booksList1()
    }, 5000)
  }, [])

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
          <Select />
        </div>
        <section className="books-container">
          {loading && <Spinner />}
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
