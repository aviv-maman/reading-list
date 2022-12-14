import { FC, useState } from 'react';
import { Book, createApiClient } from '../api/api';

type BookListProps = {
  books: Book[];
};

//API calls
const api = createApiClient();

const BookList: FC<BookListProps> = ({ books }) => {
  const [serverResponse, setServerResponse] = useState({ message: '' });

  const handleClick = async (id: string) => {
    const res = await api.deleteDocById(id);
    setServerResponse({ message: res.message });
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
      {serverResponse?.message?.length > 0 ? <p>{serverResponse.message}</p> : null}
    </div>
  );
};

export default BookList;
