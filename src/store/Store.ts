import axios from 'axios'
import { makeAutoObservable, runInAction } from 'mobx'

const fetchBooks = async (title: string | number, categories: number[], jwt: string | null) => {
  console.log({ jwt })
  try {
    const response = await axios.post(
      `https://cangular-api.herokuapp.com/books/filter`,
      {
        title: title,
        categories: categories
      },
      {
        headers: {
          Authorization: `Bearer ${jwt}`
        }
      }
    )
    const books = await response
    console.log(books.data)
    if (books.status === 200) {
      return books.data.items
    }
  } catch (e) {
    console.log({ error: e })
  } finally {
  }
}
const fetchOneBooks = async (id: string | undefined, jwt: string | null | undefined) => {
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

export interface BookInterface {
  id: string
  public: boolean
  author: string
  resume: string
  title: string
  subtitle: string
  image: string
  url: string
  category: number[]
  userRegister: string
}

// STORE DEFINITION
class Store {
  currentUserId = ''

  currentUserJWT: string | null = ''

  currentUserName: string | null = ''

  books: BookInterface[] = []

  selectedBook: BookInterface = {
    id: '',
    public: true,
    author: '',
    resume: '',
    title: '',
    subtitle: '',
    image: '',
    url: '',
    category: [],
    userRegister: ''
  }

  isLoggedIn = false
  store: BookInterface

  constructor() {
    makeAutoObservable(this)
  }

  saveId(id: string) {
    this.currentUserId = id
  }

  saveJWTAndName(token: string | null, username: string | null) {
    runInAction(() => {
      this.currentUserJWT = token
      this.currentUserName = username
      this.isLoggedIn = true
    })
  }

  saveUserId(id: string) {
    this.currentUserId = id
  }

  changeLoggedInStatus() {
    this.isLoggedIn = true
    console.log({ loggedIn: this.isLoggedIn })
  }

  async fecthBooks(title: string | number, cat: number[], jwt: string | null) {
    const books = await fetchBooks(title, cat, jwt)
    runInAction(() => {
      this.books = books
    })
  }

  saveSelectedBook(book: BookInterface) {
    runInAction(() => {
      this.selectedBook = book
    })
  }

  async fetchBook(id: string | undefined, jwt: string | null | undefined) {
    const book = await fetchOneBooks(id, jwt)
    runInAction(() => {
      this.selectedBook = book
    })
  }
}

const store = new Store()
export default store
