import React from 'react'
import { render, screen } from '@testing-library/react'
import App from './App'
import { BrowserRouter, Router, Routes } from 'react-router-dom'

test('renders learn react link', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  const linkElement = screen.getByText(/onboard express/i)
  expect(linkElement).toBeInTheDocument()
})
