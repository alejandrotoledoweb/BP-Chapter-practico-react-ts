import { axiosMock } from '../../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
AgregarLibro
import { BrowserRouter, Router } from 'react-router-dom'
import AgregarLibro from './AgregarLibro'

describe('Agregar Libro Page', () => {
  test('test to render the title of the form', () => {
    render(
      <BrowserRouter>
        <AgregarLibro />
      </BrowserRouter>
    )
    const title = screen.getByText('Registro Libro')
    const numbreDelLibro = screen.getByText('Nombre de Libro')
    const urlLbro = screen.getByText('URL del libro')
    const resumenLibro = screen.getByText('Resumen del libro')
    const catTitle = screen.getByText('Categorías')

    const nombreInput = screen.getByPlaceholderText('Ej. Angular, NRGX')
    const urlLibroInput = screen.getByPlaceholderText('Ej. https://books-all.com')
    const authorInput = screen.getByPlaceholderText('Ej. Isabel Allende')

    const cancelarButton = screen.getByText('Cancelar')
    const submitButton = screen.getByText('Registrar')

    expect(title).toBeVisible()
    // expect(title).toHaveValue('')
    expect(numbreDelLibro).toBeVisible()
    expect(urlLbro).toBeVisible()
    expect(resumenLibro).toBeVisible()
    expect(catTitle).toBeVisible()

    expect(nombreInput).toBeVisible()
    expect(urlLibroInput).toBeVisible()
    expect(authorInput).toBeVisible()

    expect(cancelarButton).toBeVisible()
    expect(submitButton).toBeVisible()

    // fireEvent.click(cancelarButton)
    // expect(cancelarButton).toHaveBeenCalledTimes(0)
  })
})
