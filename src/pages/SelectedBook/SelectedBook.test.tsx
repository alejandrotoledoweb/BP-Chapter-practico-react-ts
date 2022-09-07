import store, { BookInterface } from '../../store/Store'
import { SelectedBook } from './SelectedBook'
import { axiosMock } from '../../setupTests'
import { fireEvent, render, screen, waitFor, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { BrowserRouter, Router } from 'react-router-dom'

describe('SelectedBook page', () => {
  const book: BookInterface = {
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

  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6Inc3cWZzYTVmMjEiLCJ1c2VybmFtZSI6ImtzdWFyZXoifSwiaWF0IjoxNjU4NzkwNTY1LCJleHAiOjE2NTg4MTIxNjV9.FCZ329lsnLZIQ1izY8mP93JUoI4WhM9kJ_7NhMPlVI0'

  test('should render title, author and resumen', async () => {
    axiosMock.get.mockResolvedValueOnce({
      data: {
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
    })

    render(
      <BrowserRouter>
        <SelectedBook jwt={token} />
      </BrowserRouter>
    )
    // store.selectedBook = book
    screen.getByTestId('spinner')

    await waitFor(() => {
      const title = screen.getByText('Learning Angular, 2nd Edition')
      expect(title).toBeVisible()
    })
  })
})
