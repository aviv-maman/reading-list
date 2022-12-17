import BookList from '../components/BookList';
import BookForm from '../components/BookForm';
import { LoaderFunctionArgs, useRouteLoaderData } from 'react-router-dom';
import { Book, createApiClient } from '../api/api';
import { useCollection } from '../hooks/useCollection';
import { limit, orderBy, where } from 'firebase/firestore';

//API calls
const api = createApiClient();

export async function loader({ request }: LoaderFunctionArgs): Promise<any> {
  // const url = new URL(request.url);
  // const q = url.searchParams.get('q') ?? '';
  // const fetchedBooks = await api.getBooks({ q });
  // return { fetchedBooks, q };
  return null;
}

export default function HomePage() {
  // const { fetchedBooks }: any = useRouteLoaderData('root'); //loader function: not real time data
  const books = useCollection<Book>('books', where('title', '==', 'the final empire'), limit(1));

  return (
    <div className='App'>
      {books && <BookList books={books} />}
      <BookForm />
    </div>
  );
}
