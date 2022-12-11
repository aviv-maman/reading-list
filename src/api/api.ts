import axios from 'axios';

export type Book = {
  id: string;
  author: string;
  title: string;
  publishedYear: number;
  genres: string[];
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
  getBooks: (query?: string) => Promise<Book[]>;
  getBookById: (bookId: string) => Promise<Book>;
  createBook: (formData: any) => Promise<Book>;
};

export const createApiClient = (): ApiClient => {
  return {
    getBooks: async (query) => {
      const controller = new AbortController();
      try {
        // const res = await axios.get(`http://localhost:5000/books`, {
        // params: query,
        const res = await axios.get(`http://localhost:5000/books?q=${query}`, {
          signal: controller.signal,
        });
        return res.data;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('the request was cancelled', error.message);
        } else {
          console.log('Could not fetch the data');
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
