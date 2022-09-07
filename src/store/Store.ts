import axios from 'axios'
import { makeAutoObservable, runInAction, observable, action } from 'mobx'

const fetchBooks = async (title: string | number, categories: number[], jwt: string | null) => {
  try {
    const { data } = await axios.post(
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

    return data.items
  } catch (e) {
    // console.log({ error: e })
  } finally {
  }
}
const fetchOneBook = async (id: string | undefined, jwt: string | null | undefined) => {
  try {
    const { data } = await axios.get(`https://cangular-api.herokuapp.com/books/owner/${id}`, {
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    })
    return data
  } catch (e) {
    // console.log({ error: e })
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

  editableBook: BookInterface = {
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

  constructor() {
    makeAutoObservable(this, { selectedBook: observable, books: observable, fetchBook: action })
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

  cleanSelectedBook() {
    runInAction(() => {
      this.selectedBook = {
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
    })
  }

  async fetchBook(id: string | undefined, jwt: string | null | undefined) {
    const book = await fetchOneBook(id, jwt)
    runInAction(() => {
      this.selectedBook = book
    })
  }

  saveEditBook(book: BookInterface) {
    this.editableBook = book
  }

  cleanBook() {
    this.editableBook = {
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
  }
}

const store = new Store()
export default store
