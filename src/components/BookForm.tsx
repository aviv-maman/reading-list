import { useState } from 'react';
import { createApiClient } from '../api/api';
import { useGlobalContext } from '../core/context/initialContextState';
//API calls
const api = createApiClient();

export default function BookForm() {
  const [newBook, setNewBook] = useState('');
  const [serverResponse, setServerResponse] = useState({ message: '' });

  const { state } = useGlobalContext();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (state.user) {
      const res = await api.addBook({ title: newBook, uid: state.user.uid });
      setNewBook('');
      setServerResponse({ message: res.message });
    }
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
