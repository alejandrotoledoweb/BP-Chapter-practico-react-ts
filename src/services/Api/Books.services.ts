import axios from 'axios'

export const fetchOneBooks = async (id: string | undefined, jwt: string | null) => {
  try {
    const response = await axios.get(`https://cangular-api.herokuapp.com/books/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    const book = await response
    console.log(book.data)
    if (book.status === 200) {
      return book.data.items
    }
  } catch (e) {
    console.log({ error: e })
  } finally {
  }
}
