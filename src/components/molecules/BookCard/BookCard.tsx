import React from 'react'
import { Link } from 'react-router-dom'
import { BookInterface } from '../../../store/Store'
import './BookCard.scss'

interface BookCardProps {
  book: BookInterface
}

export const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <div className="book-card book-card--even">
      <Link to={`/selectedbook/${book.id}`}>
        <div className="book-card__container" key={book.id}>
          <img className="book-card__image" src={book.image} alt={book.title} />
        </div>
      </Link>
    </div>
  )
}
