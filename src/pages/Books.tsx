import { observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../components/atoms/Button/Button'
import { Input } from '../components/atoms/Input/Input'
import { Select } from '../components/atoms/Select/Select'
import { Spinner } from '../components/atoms/Spinner/Spinner'
import { BookCard } from '../components/molecules/BookCard/BookCard'
import { Publicaciones } from '../components/templates/Publicaciones'
import store, { BookInterface } from '../store/Store'
interface BooksProps {
  jwt: string | null
  username: string | null
}
export const Books: React.FC<BooksProps> = observer(({ jwt, username }) => {
  const navigate = useNavigate()
  // const [booksList, setBooksList] = useState<BookInterface[]>([])
  const [loading, setLoading] = useState(false)
  const [values, setValues] = useState({
    filter: '',
    category: 57
  })
  const [allBooks, setAllBooks] = useState<BookInterface[]>([])

  useEffect(() => {
    setLoading(true)
    store.fecthBooks('', [values.category], store.currentUserJWT || jwt)
    setAllBooks(store.books)
    setLoading(false)
  }, [])

  const handleOnChange =
    (property: 'filter' | 'category') => async (value: any, validInput: string) => {
      setValues((current) => ({
        ...current,
        [property]: value
      }))

      setLoading(true)
      if (property === 'filter') {
        try {
          await store.fecthBooks(value, [values.category], jwt)
        } catch (error) {
          console.log(error)
        } finally {
          // setLoading(false)
        }
      }
      if (property === 'category') {
        try {
          await store.fecthBooks(values.filter, [value], jwt)
        } catch (error) {
          console.log(error)
        } finally {
        }
      }
      setLoading(false)
    }

  // const selectBook = (book: BookInterface) => {
  //   store.saveSelectedBook(book)
  // }
  return (
    <div>
      <div className="top-books">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{username}</pichincha-typography>
      </div>

      <section>
        <div className="top-books-1">
          <pichincha-typography variant="h3">Tus Libros</pichincha-typography>
          <Link to="/agregarlibro" onClick={() => store.cleanBook()}>
            <Button role={'Agregar Libros'} color="secondary">
              Agregar Libro
            </Button>
          </Link>
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
            <BookCard book={book} key={book.id} />
          ))}
        </section>
      </section>
      <Publicaciones jwt={jwt} />
    </div>
  )
})
