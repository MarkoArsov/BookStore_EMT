import axios from "../custom-axios/axios";

const BookService = {
  fetchCategories: () => {
    return axios.get("/categories");
  },

  fetchBooks: () => {
    return axios.get("/books");
  },

  getBook: (id) => {
    return axios.get("/books/" + id);
  },

  markBook: (id) => {
    return axios.get("/books/mark/" + id);
  },

  deleteBook: (id) => {
    return axios.delete("/books/delete/" + id);
  },

  addBook: (name, category, authorId, availableCopies) => {
    return axios.post("/books", {
      name: name,
      category: category,
      authorId: authorId,
      availableCopies: availableCopies,
    });
  },

  editBook: (id, name, category, authorId, availableCopies) => {
    return axios.put("/books/" + id, {
      name: name,
      category: category,
      authorId: authorId,
      availableCopies: availableCopies,
    });
  },
};

export default BookService;
