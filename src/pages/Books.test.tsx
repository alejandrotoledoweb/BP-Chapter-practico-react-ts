global.sessionStorage.getItem = jest.fn(() => 'ksuarez')
import { axiosMock } from '../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom'
import { Books } from './Books'
import store, { BookInterface } from '../store/Store'

// const localStorageMock = (() => {
//   let store = {}

//   return {
//     getItem(key) {
//       return store[key] || null
//     },
//     setItem(key, value) {
//       store[key] = value.toString()
//     },
//     removeItem(key) {
//       delete store[key]
//     },
//     clear() {
//       store = {}
//     }
//   }
// })()

// Object.defineProperty(window, 'sessionStorage', {
//   value: localStorageMock
// })

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Inc3cWZzYTVmMjEiLCJ1c2VybmFtZSI6ImtzdWFyZXoifSwiaWF0IjoxNjU4NzkwNTY1LCJleHAiOjE2NTg4MTIxNjV9.FCZ329lsnLZIQ1izY8mP93JUoI4WhM9kJ_7NhMPlVI0'
const username = 'ksuarez'

// describe('getUserInfo', () => {
//   beforeEach(() => {
//     window.sessionStorage.clear();
//     jest.restoreAllMocks();
//   });
//   it('should get user info from session storage', () => {
//     const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
//     window.sessionStorage.setItem('userInfo', JSON.stringify({ userId: 1, userEmail: 'example@gmail.com' }));
//     const actualValue = getUserInfo();
//     expect(actualValue).toEqual({ userId: 1, userEmail: 'example@gmail.com' });
//     expect(getItemSpy).toBeCalledWith('userInfo');
//   });

//   it('should get empty object if no user info in session storage', () => {
//     const getItemSpy = jest.spyOn(window.sessionStorage, 'getItem');
//     const actualValue = getUserInfo();
//     expect(actualValue).toEqual({});
//     expect(window.sessionStorage.getItem).toBeCalledWith('userInfo');
//     expect(getItemSpy).toBeCalledWith('userInfo');
//   });
// });

describe('Books Page', () => {
  test('should render the username', () => {
    render(
      <BrowserRouter>
        <Books jwt={token} username={'ksuarez'} />
      </BrowserRouter>
    )
    const username = screen.getByText('ksuarez')
    const title = screen.getByText('Tus Libros')
    expect(username).toBeVisible()
    expect(title).toBeVisible()
  })

  test('should render the titles, input and button', () => {
    render(
      <BrowserRouter>
        <Books jwt={token} username={'ksuarez'} />
      </BrowserRouter>
    )

    const title = screen.getByText('Tus Libros')
    const input = screen.getAllByPlaceholderText('Ej. Angular, React')
    const button = screen.getByText('Agregar Libro')

    expect(title).toBeVisible()
    expect(input[0]).toBeVisible()
    expect(button).toBeVisible()
  })

  test('should render a list of books', () => {
    // jest.mock('../store/Store', () => {
    //   return { books: books.items }
    // })

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
        <Books jwt={token} username={'ksuarez'} />
      </BrowserRouter>
    )

    const img1 = screen.getAllByAltText('Learning Angular, 2nd Edition')
    const img2 = screen.getAllByAltText('Progressive Web Apps with Angular')
    const img3 = screen.getAllByAltText('Angular for Material Design')
    const img4 = screen.getAllByAltText('Angular: Up and Running')

    expect(img1[0]).toBeVisible()
    expect(img2[0]).toBeVisible()
    expect(img3[0]).toBeVisible()
    expect(img4[0]).toBeVisible()
  })
})
