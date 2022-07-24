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
  const [values, setValues] = useState({
    filter: '',
    category: [57]
  })

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
      await store.fecthBooks('', values.category)
      // setBooksList(store.books)
      setLoading(false)
    }

    booksList1()
  }, [])

  const handleOnChange =
    (property: 'filter' | 'category') => async (value: string, validInput: string) => {
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
      setLoading(true)
      try {
        console.log(values.filter, values.category)
        await store.fecthBooks(values.filter, values.category)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }

      // setBooksList(store.books)
    }

  const handleOnSelect = () => {}
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
            pattern="[A-Za-z0-9]{0,20}"
          />
          <Select onChange={handleOnChange('category')} />
        </div>
        <section className="books-container">
          {loading && <Spinner />}
          {store.books?.map((book) => (
            <div className="book-div" key={book.id}>
              <img className="book-image" src={book.image} alt={book.title} />
            </div>
          ))}
        </section>
      </section>
    </div>
  )
}
