import { useState } from 'react';
import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';
import { Book, createApiClient } from '../api/api';

const api = createApiClient();

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  const url = new URL(request.url);
  const q = url.searchParams.get('q') ?? '';
  const fetchedBooks = await api.getBooks(q);
  // const res = await fetch(newUrl, { signal: request.signal });
  // const myData = await res.json();
  // return myData;
  return { fetchedBooks, q };
}

export default function HomePage() {
  const { fetchedBooks }: any = useRouteLoaderData('root');
  const [books, setBooks] = useState<Book[]>([
    { title: 'the name of the wind', id: '1', author: 'x', publishedYear: 2022, genres: ['a', 'b'] },
    { title: 'the dragon reborn', id: '2', author: 'x', publishedYear: 2022, genres: ['a', 'b'] },
    { title: 'the final empire', id: '3', author: 'x', publishedYear: 2022, genres: ['a', 'b'] },
    { title: 'the way of kings', id: '4', author: 'x', publishedYear: 2022, genres: ['a', 'b'] },
  ]);

  return (
    <div className='App'>
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
