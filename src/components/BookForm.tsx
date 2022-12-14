import { useState } from 'react';
import { createApiClient } from '../api/api';

//API calls
const api = createApiClient();

export default function BookForm() {
  const [newBook, setNewBook] = useState('');
  const [serverResponse, setServerResponse] = useState({ message: '' });

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await api.addBook({ title: newBook });
    setNewBook('');
    setServerResponse({ message: res.message });
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverResponse?.message?.length > 0 ? <p>{serverResponse.message}</p> : null}
      <label>
        <span>Add a new book title:</span>
        <input required type='text' onChange={(e) => setNewBook(e.target.value)} value={newBook} />
      </label>
      <button>Add</button>
    </form>
  );
}
