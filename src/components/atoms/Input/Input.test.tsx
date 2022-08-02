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
    const onChange = jest.fn()
    render(
      <BrowserRouter>
        <Input placeholder="Registro panel" type="text" onChange={onChange} />
      </BrowserRouter>
    )
    const input = screen.getByPlaceholderText('Registro panel')
    expect(input).toBeVisible()
  })
  it('test the placeholder passed with props', async () => {
    const onChange = jest.fn()
    render(
      <BrowserRouter>
        <Input placeholder="Registro panel" type="text" onChange={onChange} />
      </BrowserRouter>
    )
    const input = screen.getByPlaceholderText('Registro panel')
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toBeCalledWith('', 'normal')
    fireEvent(input, new CustomEvent('eventValue', { detail: '123' }))
    expect(onChange).toBeCalledWith('123', 'error')
    expect(onChange).toBeCalledTimes(2)
  })
})
