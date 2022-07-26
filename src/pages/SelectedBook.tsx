import React, { useEffect, useState } from 'react'
import store, { BookInterface } from '../store/Store'
import { Button } from '../components/atoms/Button/Button'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { fetchOneBooks } from '../services/Api/Books.services'

interface SelectedBookProps {
  isLoading?: boolean
  jwt?: string | null
}
export const SelectedBook: React.FC<SelectedBookProps> = observer(({ isLoading = true, jwt }) => {
  const { id } = useParams()
  const [book, setBook] = useState<any>({})

  useEffect(() => {
    store.fetchBook(id, store.currentUserJWT || jwt)
    setBook(store.selectedBook)
  }, [])

  return (
    <div>
      SelectedBook
      <Link to="/books">
        <Button color="secondary">Volver</Button>
      </Link>
      <Link to="/edit">
        <Button color="primary">Editar</Button>
      </Link>
      <section>
        <div>
          <h2>{book.title}</h2>
          <img src={`${book.image}`} title="selectedBook" />
        </div>
        <div>
          <h2>{store.selectedBook?.title}</h2>
          <img src={`${store.selectedBook?.image}`} title="selectedBook" />
        </div>
      </section>
    </div>
  )
})