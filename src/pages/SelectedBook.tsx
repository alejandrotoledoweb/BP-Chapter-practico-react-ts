import React, { useEffect, useState } from 'react'
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
  // const [bookSel, setBookSel] = useState<any>({})
  const [isGetting, setIsGetting] = useState<any>(true)

  const fetchB = async () => {
    await store.fetchBook(id, jwt || store.currentUserJWT)
  }
  useEffect(() => {
    fetchB()
    // setBookSel(store.selectedBook)
    setIsGetting(false)
  })

  // const { bookS, fetchBook } = useFetchBook(id, jwt)
  // useEffect(() => {
  //   fetchBook()
  // setBookSel(bookS)
  // }, [])

  return (
    <div>
      {isGetting && <h1>Loading...</h1>}
      <Link to="/books">
        <Button color="secondary">Volver</Button>
      </Link>
      <Link to="/edit">
        <Button color="primary">Editar</Button>
      </Link>
      <section>
        <div>
          <div>
            <h2>{store.selectedBook?.title}</h2>
          </div>
          <div>
            <h2>{store.selectedBook?.author}</h2>
          </div>
          <div>
            <h2>{store.selectedBook?.url}</h2>
          </div>
          <div>{/* <h2>{store.selectedBook?.resumen}</h2> */}</div>
          <h2>{store.selectedBook?.category}</h2>
          <img src={`${store.selectedBook?.image}`} title="selectedBook" />
        </div>
      </section>
    </div>
  )
})
