import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, Router } from 'react-router-dom'
import Panel from './Panel'

describe('Panel component', () => {
  it('renders panel component', () => {
    const container = render(
      <BrowserRouter>
        <Panel title="Registro panel" />
      </BrowserRouter>
    )
    expect(container).toBeTruthy
  })

  it('test the title passed with props', async () => {
    render(
      <BrowserRouter>
        <Panel title="Registro panel" />
      </BrowserRouter>
    )
    const title = screen.getByText('Registro panel')
    expect(title).toBeVisible()
  })
})
