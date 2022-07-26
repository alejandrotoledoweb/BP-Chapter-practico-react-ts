import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
import { User, UserService } from './user.service'

// const axiosMock = new MockAdapter(axios)
global.sessionStorage.getItem = jest.fn(() => 'ksuarez')
// global.sessionStorage.getItem = jest.fn(() => 'ksuarez')
describe('User Service', () => {
  it('should get navigation properties', async () => {
    // const token = sessionStorage.setItem(
    //   'token',
    //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Inc3cWZzYTVmMjEiLCJ1c2VybmFtZSI6ImtzdWFyZXoifSwiaWF0IjoxNjU4Nzg0MzM2LCJleHAiOjE2NTg4MDU5MzZ9.gZUtOQiCu46UgctHjaKUtaZ6Bovldj89it5t4Mc6zZ0'
    // )
    // const username = sessionStorage.setItem('username', 'ksuarez')

    //   axiosMock.onGet().reply(200, [
    //     {
    //       email: 'myemail@domain.com'
    //     }
    //   ] as User[])
    //   const users = await UserService.getUsers()
    //   expect(users).toBeDefined()
    //   expect(users).toBeInstanceOf(Array)
  })
})
