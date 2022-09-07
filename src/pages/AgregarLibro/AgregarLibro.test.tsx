import { axiosMock } from '../../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AgregarLibro from './AgregarLibro'
import store from '../../store/Store'

describe('Agregar Libro Page', () => {
  test('to render the info of the book', () => {
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

  test('should render selected book to edit in inputs', () => {
    store.editableBook = {
      id: '2ac4ly00oen',
      public: true,
      author: 'Unknow',
      resume: '',
      title: 'Learning Angular, 2nd Edition',
      subtitle: 'A Hands-On Guide to Angular 2 and Angular 4',
      image: 'https://itbook.store/img/books/9780134576978.png',
      url: 'https://itbook.store/books/9780134576978',
      category: [57],
      userRegister: 'w7qfsa5f21'
    }
    render(
      <BrowserRouter>
        <AgregarLibro />
      </BrowserRouter>
    )

    const nombreInput = screen.getByPlaceholderText('Ej. Angular, NRGX')
    const urlLibroInput = screen.getByPlaceholderText('Ej. https://books-all.com')
    const authorInput = screen.getByPlaceholderText('Ej. Isabel Allende')

    expect(nombreInput).toBeVisible()
    expect(urlLibroInput).toBeVisible()
    expect(authorInput).toBeVisible()

    // expect(nombreInputWithValue).toBeTruthy()

    // expect(urlLibroInput).toHaveValue('https://itbook.store/books/9780134576978')
    // expect(authorInput).toHaveValue('Unknow')
  })
})
