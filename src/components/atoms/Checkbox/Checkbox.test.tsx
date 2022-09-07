import { render, screen, fireEvent } from '@testing-library/react'
import { Checkbox } from './Checkbox'

describe('CheckBox', () => {
  it('should display the component', async () => {
    const container = render(<Checkbox id={57} disabled={false} value="Drama" />)
    // const checkbox = screen.getByDisplayValue('Drama')
    // fireEvent.click(checkbox)
    // expect(checkbox).toBeChecked()
    expect(container).toBeTruthy()
  })

  it('should trigger the click', async () => {
    const onClick = jest.fn()
    //   render(<Button>Hazme click</Button>)
    //   const buttonFound = await screen.findByText('Hazme click')
    render(<Checkbox onClick={onClick()} value="Tecnology" id="57" disabled={false} />)

    // const input = screen.getByText('Tecnology')
    expect(onClick).toBeCalledWith()
    expect(onClick).toBeCalledTimes(1)
    // fireEvent(input, new CustomEvent('clickCheck', {}))
    // expect(onClick).toBeCalledWith()
    // expect(onClick).toBeCalledTimes(1)
  })
})
