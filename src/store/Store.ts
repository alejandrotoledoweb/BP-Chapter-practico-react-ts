import axios from 'axios'
import { makeAutoObservable } from 'mobx'

const fetchBooks = async (title: string, categories: number[], jwt: string) => {
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
    const books = await response.data
    if (books) {
      return books.items
    }
  } catch (e) {
    console.log({ error: e })
  } finally {
  }
}

interface Book {
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

  currentUserJWT = ''

  currentUserName = ''

  isLoggedIn = false

  books: Book[] = []

  constructor() {
    makeAutoObservable(this)
  }

  saveId(id: string) {
    this.currentUserId = id
  }

  saveJWTAndName(token: string, username: string) {
    this.currentUserJWT = token
    this.currentUserName = username
  }

  saveUserId(id: string) {
    this.currentUserId = id
  }

  changeLoggedInStatus() {
    this.isLoggedIn = true
    console.log({ loggedIn: this.isLoggedIn })
  }

  async fecthBooks(title: string, cat: number[]) {
    const books = await fetchBooks(title, cat, this.currentUserJWT)
    this.books = books
  }
}

const store = new Store()
export default store
