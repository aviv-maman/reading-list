import { FC } from 'react';
import type { Book } from '../api/api';

type BookListProps = {
  books: Book[];
};

const BookList: FC<BookListProps> = ({ books }) => {
  const handleClick = async (id: string) => {
    console.log(id);
  };

  return (
    <div className='book-list'>
      <ul>
        {books.map((book) => (
          <li key={book.id} onClick={() => handleClick(book.id)}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
