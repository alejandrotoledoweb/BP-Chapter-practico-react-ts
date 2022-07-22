import axios from 'axios'
import { makeAutoObservable } from 'mobx'

const fetchBooks = async (title: string, categories: number[], jwt: string | null) => {
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

export interface BookInterface {
  id: string
  public: boolean
  author: string
  resume: string
  title: string
  subtitle: string
  image: string
  url: string
  category: []
  userRegister: string
}

// STORE DEFINITION
class Store {
  currentUserId = ''

  currentUserJWT: string | null = ''

  currentUserName: string | null = ''

  isLoggedIn = false

  books: BookInterface[] = []

  constructor() {
    makeAutoObservable(this)
  }

  saveId(id: string) {
    this.currentUserId = id
  }

  saveJWTAndName(token: string | null, username: string | null) {
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
