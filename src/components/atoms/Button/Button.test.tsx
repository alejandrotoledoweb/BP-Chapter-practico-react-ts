import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button', () => {
  it('should display inner text', async () => {
    render(<Button>Hazme click</Button>)
    const buttonFound = await screen.findByText('Hazme click')
    expect(buttonFound).toBeDefined()
    expect(buttonFound).toHaveTextContent('Hazme click')
  })

  it('should trigger the click', async () => {
    const onClick = jest.fn()
    render(<Button>Hazme click</Button>)
    const buttonFound = await screen.findByText('Hazme click')
  })
})
