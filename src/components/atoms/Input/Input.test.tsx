import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Router } from 'react-router-dom'
import { Input } from './Input'

describe('Input component', () => {
  it('renders Input component', () => {
    const container = render(
      <BrowserRouter>
        <Input placeholder="Registro panel" type="text" />
      </BrowserRouter>
    )
    expect(container).toBeTruthy
  })

  it('test the placeholder passed with props', async () => {
    render(
      <BrowserRouter>
        <Input placeholder="Registro panel" type="text" />
      </BrowserRouter>
    )
    const input = screen.getByPlaceholderText('Registro panel')
    expect(input).toBeVisible()
  })
})
