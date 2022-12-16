import axios from 'axios';
import { auth, db } from '../firebase/firebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { createUserWithEmailAndPassword, User } from 'firebase/auth';

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

export type SignUp = {
  email: string;
  password: string;
};

export type ApiClient = {
  getBooks: (query?: Query) => Promise<Book[]> | PromiseLike<Book[]> | unknown;
  getBookById: (bookId: string) => Promise<Book>;
  addBook: (formData: any) => Promise<any>;
  deleteDocById: (bookId: string) => Promise<any>;
  signUp: (formData: SignUp) => Promise<{ message: string; user: User }> | any;
};

export const createApiClient = (): ApiClient => {
  const collectionRef = collection(db, 'books');
  return {
    getBooks: async (queryObject?: Query) => {
      const controller = new AbortController();
      try {
        // const wantedQuery = query(ref, where('title', '==', queryObject?.q));
        const snapshot = await getDocs(collectionRef);
        const books = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Book));
        return books;
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('The request was cancelled:', controller.signal.reason);
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
    addBook: async (formData) => {
      const controller = new AbortController();
      try {
        const res = await addDoc(collectionRef, formData);
        return { message: 'A document was successfully added.', id: res.id };
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('the request was cancelled:', controller.signal.reason);
        } else {
          console.log('There was a problem with adding the document.');
          return error;
        }
      }
      return () => controller.abort();
    },
    deleteDocById: async (docId: string) => {
      const controller = new AbortController();
      try {
        const docRef = doc(db, 'books', docId);
        await deleteDoc(docRef);
        return { message: 'A document was successfully deleted.', id: docId };
      } catch (error) {
        if (controller.signal.aborted) {
          console.log('The request was cancelled:', controller.signal.reason);
        } else {
          console.log('There was a problem with deleting the document.');
          return error;
        }
      }
      return () => controller.abort();
    },
    signUp: async (formData: SignUp) => {
      const controller = new AbortController();
      const { email, password } = formData;
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        return { message: 'A user was successfully signed up.', user: userCredential.user };
      } catch (error: any) {
        if (controller.signal.aborted) {
          console.log('The request was cancelled:', controller.signal.reason);
        } else {
          console.log('There was a problem with signing up.');
          return { message: error.message, code: error.code };
        }
      }
      return () => controller.abort();
    },
  };
};
