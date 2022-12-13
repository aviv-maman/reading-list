import axios from 'axios';
import db from '../firebase/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

export type Book = {
  id: string;
  // author: string;
  title: string;
  // publishedYear: number;
  // genres: string[];
};

export type ServerResponse = {
  message?: string;
  books: Book[];
  length: number;
  totalLength: number;
  page: number;
  totalPages: number;
};

export type Query = {
  q?: string;
  page?: number;
};

export type ApiClient = {
  getBooks: (query?: Query) => Promise<Book[]> | PromiseLike<Book[]> | unknown;
  getBookById: (bookId: string) => Promise<Book>;
  createBook: (formData: any) => Promise<Book>;
};

export const createApiClient = (): ApiClient => {
  return {
    getBooks: async (queryObject?: Query) => {
      const controller = new AbortController();
      try {
        // const wantedQuery = query(ref, where('title', '==', queryObject?.q));
        const collectionRef = collection(db, 'books');
        const snapshot = await getDocs(collectionRef);
        const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Book));
        return books;
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('the request was cancelled:', controller.signal.reason);
        } else {
          console.log('Could not fetch the data.');
          return error;
        }
      }
      return () => controller.abort();
    },
    getBookById: async (bookId) => {
      const res = await axios.get(`http://localhost:5000/books/${bookId}`, {
        // params: Number(bookId),
      });
      return res.data;
    },
    createBook: async (formData) => {
      const res = await axios.post(`http://localhost:5000/books`, formData);
      return res.data;
    },
  };
};
