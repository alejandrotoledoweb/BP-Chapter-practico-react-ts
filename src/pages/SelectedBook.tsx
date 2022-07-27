import React, { useEffect, useMemo, useState } from 'react'
import store, { BookInterface } from '../store/Store'
import { Button } from '../components/atoms/Button/Button'
import { Link, useParams } from 'react-router-dom'
import { observer } from 'mobx-react'
import { useFetchBook } from '../components/Hooks/useFetchBook'

interface SelectedBookProps {
  isLoading?: boolean
  jwt?: string | null
}
export const SelectedBook: React.FC<SelectedBookProps> = observer(({ isLoading = false, jwt }) => {
  const { id } = useParams()
  const [bookSel, setBookSel] = useState<any>({})
  const [isGetting, setIsGetting] = useState<any>(true)

  const bookId = useMemo(() => {
    return id
  }, [id])

  const jwtVar = useMemo(() => {
    return jwt
  }, [jwt])

  useEffect(() => {
    // ;(async () => {
    //   await store.fetchBook(bookId, jwtVar)
    // })()
    return () => {
      store.fetchBook(bookId, jwtVar)
    }
  }, [store.fetchBook, bookId, jwtVar])

  useEffect(() => {
    setIsGetting(false)
  })

  // useEffect(() => {
  //   store.fetchBook(bookId, jwtVar)
  // }, [])
  // fetchB()
  // store.fetchBook(bookId, jwtVar)
  // return () => {
  // }
  //   setBookSel(store.selectedBook)
  // }, [store.fetchBook])

  // const { bookS, fetchBook } = useFetchBook(id, jwt)
  // useEffect(() => {
  //   fetchBook()
  // setBookSel(bookS)
  // }, [])

  return (
    <div>
      {isGetting && <h1>Loading...</h1>}
      <div className="top-books">
        <pichincha-typography variant="h3">Biblioteca</pichincha-typography>
        <pichincha-typography variant="bodyText">{store.currentUserName}</pichincha-typography>
      </div>
      <div className="buttons-book">
        <Link to="/books" className="btn-book">
          <Button color="secondary">Volver</Button>
        </Link>
        <Link to="/edit" className="btn-book">
          <Button color="primary">Editar</Button>
        </Link>
      </div>

      <section>
        <div className="book-container">
          <img src={`${store.selectedBook?.image}`} title="selectedBook" />
          <div className="titles-container">
            <div className="titles-book">
              <pichincha-typography variant="">Título:</pichincha-typography>
              <pichincha-typography>{store.selectedBook?.title}</pichincha-typography>
              {/* <h2>{store?.selectedBook?.title}</h2> */}
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
    </div>
  )
})
