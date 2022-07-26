import axios from 'axios'
import React, { useState } from 'react'
import store from '../../store/Store'

export const useFetchBook = (id: any, token: any) => {
  const [bookS, setBook] = useState<any>({})

  const fetchBook = () =>
    axios
      .get(`https://cangular-api.herokuapp.com/books/owner/${id}`, {
        headers: { Authorization: 'Bearer ' + token }
      })
      .then((res) => {
        if (res.data) {
          setBook(res.data)
          store.saveSelectedBook(res.data)
        }
      })
  return { bookS, fetchBook }
}
