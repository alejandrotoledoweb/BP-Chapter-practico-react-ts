import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { User, UserService } from './user.service'

const axiosMock = new MockAdapter(axios)

describe('User Service', () => {
  it('should get navigation properties', async () => {
    axiosMock.onGet().reply(200, [
      {
        email: 'myemail@domain.com'
      }
    ] as User[])
    const users = await UserService.getUsers()
    expect(users).toBeDefined()
    expect(users).toBeInstanceOf(Array)
  })
})
