import axios from 'axios'
import { makeAutoObservable } from 'mobx'

class Store {
  currentUserId = ''

  currentUserJWT = ''

  currentUserName = ''

  isLoggedIn = false

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
}

const store = new Store()
export default store
