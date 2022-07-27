import { axiosMock } from '../../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BrowserRouter } from 'react-router-dom'
import Registro from './Registro'

describe('Registro Page', () => {
  it('renders la página de login', () => {
    const container = render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    )
    expect(container).toBeTruthy
  })

  it('test the login action', async () => {
    axiosMock.post.mockResolvedValue({
      data: {
        status: 'success',
        id: 'hnlk1cevs2u'
      }
    })
    render(
      <BrowserRouter>
        <Registro />
      </BrowserRouter>
    )
    const title = screen.getByText('Iniciar Sesión')
    const usernameInput = screen.getAllByPlaceholderText('Nombre de usuario')
    const emailInput = screen.getAllByPlaceholderText('Ej. name@example.com')
    const passwordInput = screen.getAllByPlaceholderText('*****')[0]
    const passwordConfirmationInput = screen.getAllByPlaceholderText('*****')[1]
    const buttonIRegistro = screen.getByText('Registrar')
    expect(title).toBeVisible()
    userEvent.type(usernameInput[0], 'ksuarez')
    userEvent.type(emailInput[0], 'ksuarez@email.com')
    userEvent.type(passwordInput, 'adm12345')
    userEvent.type(passwordConfirmationInput, 'adm12345')
    fireEvent.click(buttonIRegistro)
    expect(buttonIRegistro).toBeTruthy()
    await waitFor(() => {
      screen.getByText('Registrar')
    })
  })
})
