import React, { useEffect, useMemo, useState } from 'react'
import store, { BookInterface } from '../../store/Store'
import { Button } from '../../components/atoms/Button/Button'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useFetchBook } from '../../components/Hooks/useFetchBook'
import { Spinner } from '../../components/atoms/Spinner/Spinner'

interface SelectedBookProps {
  isLoading?: boolean
  jwt?: string | null
}
export const SelectedBook: React.FC<SelectedBookProps> = observer(({ jwt }) => {
  const { id } = useParams()
  const [isGetting, setIsGetting] = useState<boolean>(true)

  const bookId = useMemo(() => {
    return id
  }, [id])

  const jwtVar = useMemo(() => {
    return jwt
  }, [jwt])

  useEffect(() => {
    store.fetchBook(bookId, jwtVar)
  }, [])

  useEffect(() => {
    if (store?.selectedBook?.id !== '') {
      setIsGetting(false)
    }
  }, [store?.selectedBook])

  return (
    <div>
      <div className="top-books">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{store.currentUserName}</pichincha-typography>
      </div>
      <div className="buttons-book">
        <Link to="/books" className="btn-book">
          <Button color="secondary">Volver</Button>
        </Link>
        <Link
          to="/editarlibro"
          className="btn-book"
          onClick={() => store.saveEditBook(store.selectedBook)}
        >
          <Button color="primary">Editar</Button>
        </Link>
      </div>

      {isGetting && <Spinner />}
      {!isGetting && (
        <section>
          <div className="book-container">
            <img
              src={`${store.selectedBook?.image}`}
              title="selectedBook"
              width="200px"
              height="auto"
              className="book-container__image"
            />
            <div className="titles-container">
              <div className="titles-book">
                <pichincha-typography variant="">Título:</pichincha-typography>
                <pichincha-typography>{store.selectedBook?.title}</pichincha-typography>
              </div>
              <div className="titles-book">
                <pichincha-typography variant="">Autor:</pichincha-typography>
                <pichincha-typography>{store.selectedBook?.author}</pichincha-typography>
                {/* <h2>{store.selectedBook?.author}</h2> */}
              </div>
              <div className="titles-book">
                <pichincha-typography variant="">URL del libro:</pichincha-typography>
                <pichincha-typography>{store.selectedBook?.url}</pichincha-typography>
                {/* <h2>{store.selectedBook?.url}</h2> */}
              </div>
              <div className="titles-book">
                <pichincha-typography variant="">Resumen:</pichincha-typography>
                <pichincha-typography>{store.selectedBook?.resume}</pichincha-typography>
                {/* <h2>{store.selectedBook?.resume}</h2> */}
              </div>
            </div>
            {/* <pichincha-typography variant="">Categorías:</pichincha-typography>
          <h2>{store.selectedBook?.category}</h2> */}
          </div>
        </section>
      )}
    </div>
  )
})
