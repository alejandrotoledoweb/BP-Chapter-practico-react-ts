import { axiosMock } from '../../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BrowserRouter, Router } from 'react-router-dom'
import { Publicaciones } from './Publicaciones'
import store, { BookInterface } from '../../store/Store'

describe('Publicaciones Page', () => {
  const jwt =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Inc3cWZzYTVmMjEiLCJ1c2VybmFtZSI6ImtzdWFyZXoifSwiaWF0IjoxNjU5MzA2NzgwLCJleHAiOjE2NTkzMjgzODB9.d5n_1NIl5T3_L_iyoX_ikv9d5xXxvniTmiLTIhMYMyY'
  test('should render the title of the page', () => {
    render(
      <BrowserRouter>
        <Publicaciones jwt={jwt} />
      </BrowserRouter>
    )
    const title = screen.getByText('Publicaciones')
    const filtroTitle = screen.getByText('Filtro')

    expect(title).toBeVisible()
    expect(filtroTitle).toBeVisible()
  })
  test('should render the title of the first book', () => {
    const books: BookInterface[] = [
      {
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
      },
      {
        id: 'zv0gskqufve',
        public: true,
        author: 'Unknow',
        resume: '',
        title: 'Progressive Web Apps with Angular',
        subtitle: 'Create Responsive, Fast and Reliable PWAs Using Angular',
        image: 'https://itbook.store/img/books/9781484244470.png',
        url: 'https://itbook.store/books/9781484244470',
        category: [57],
        userRegister: 'w7qfsa5f21'
      },
      {
        id: 'nkizz2ctq0o',
        public: true,
        author: 'Unknow',
        resume: '',
        title: 'Angular for Material Design',
        subtitle:
          'Leverage Angular Material and TypeScript to Build a Rich User Interface for Web Apps',
        image: 'https://itbook.store/img/books/9781484254332.png',
        url: 'https://itbook.store/books/9781484254332',
        category: [57],
        userRegister: 'w7qfsa5f21'
      },
      {
        id: 'lf3lw1307f',
        public: true,
        author: 'Unknow',
        resume: '',
        title: 'Angular: Up and Running',
        subtitle: 'Learning Angular, Step by Step',
        image: 'https://itbook.store/img/books/9781491999837.png',
        url: 'https://itbook.store/books/9781491999837',
        category: [57],
        userRegister: 'w7qfsa5f21'
      }
    ]
    store.books = books
    render(
      <BrowserRouter>
        <Publicaciones jwt={jwt} />
      </BrowserRouter>
    )
    const title = screen.getByText('Publicaciones')
    const filtroTitle = screen.getByText('Filtro')

    expect(title).toBeVisible()
    expect(filtroTitle).toBeVisible()
  })
})
