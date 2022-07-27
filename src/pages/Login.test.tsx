import { axiosMock } from '../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from './Login'
import { BrowserRouter, Router } from 'react-router-dom'

describe('Login Page', () => {
  it('renders la página de login', () => {
    const container = render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    expect(container).toBeTruthy
  })

  it('test the login action', async () => {
    axiosMock.post.mockResolvedValue({
      data: {
        user: {
          userId: 'w7qfsa5f21',
          username: 'ksuarez'
        },
        access_token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Inc3cWZzYTVmMjEiLCJ1c2VybmFtZSI6ImtzdWFyZXoifSwiaWF0IjoxNjU4NDU1MTE4LCJleHAiOjE2NTg0NzY3MTh9.YbVG2rD81VOyxrSC10FxFKjMdAvZYK_h_3RLTyQ3hPY',
        tokenType: 'Bearer '
      }
    })
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const title = screen.getByText('Iniciar Sesión')
    const usernameInput = screen.getAllByPlaceholderText('Nombre de usuario')
    const passwordInput = screen.getAllByPlaceholderText('*****')
    const buttonIniciarSesión = screen.getByText('Inciar Sesión')
    expect(title).toBeVisible()
    userEvent.type(usernameInput[0], 'ksuarez')
    userEvent.type(passwordInput[0], 'adm12345')
    fireEvent.click(buttonIniciarSesión)
    expect(buttonIniciarSesión).toBeTruthy()
    await waitFor(() => {
      screen.getByText('Registrarme')
    })
  })
})
