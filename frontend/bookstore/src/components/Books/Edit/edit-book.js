import React from "react";
import BookService from "../../../service/bookService";
import AuthorService from "../../../service/authorService";
import { useParams, useNavigate } from "react-router-dom";

const EditBook = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = React.useState({});
  const [categories, setCategories] = React.useState([]);
  const [authors, setAuthors] = React.useState([]);
  const [formData, setFormData] = React.useState({
    name: "",
    category: "",
    authorId: 0,
    availableCopies: 0,
  });

  React.useEffect(() => {
    fetchCategories();
    fetchAuthors();
    getBook(id);
  }, [id]);

  const getBook = (id) => {
    BookService.getBook(id).then((data) => {
      setBook(data.data);
    });
  };

  const fetchCategories = () => {
    BookService.fetchCategories().then((data) => {
      setCategories(data.data);
    });
  };

  const fetchAuthors = () => {
    AuthorService.fetchAuthors().then((data) => {
      setAuthors(data.data);
    });
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    const id = book.id;
    const name = formData.name ? formData.name : book.name;
    const authorId = formData.authorId ? formData.authorId : book.author.id;
    const category = formData.category ? formData.category : book.category;
    const availableCopies = formData.availableCopies ? formData.availableCopies : book.availableCopies;
    BookService.editBook(id, name, category, authorId, availableCopies).then(
      () => {
        navigate("/books");
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className={"container mm-4 mt-5"}>
      <form onSubmit={onFormSubmit}>
        <div className="form-group">
          <label for="name">Book Name</label>
          <input
            onChange={handleChange}
            type="text"
            className="form-control"
            id="name"
            name="name"
            placeholder={book.name}
          ></input>
        </div>

        <div class="form-group">
          <label for="category">Select Book Category</label>
          <select
            class="form-control"
            name="category"
            id="category"
            onChange={handleChange}
          >
            {categories.map((category) => {
              if (Object.keys(book).length !== 0 && book.category === category)
                return (
                  <option selected value={category}>
                    {category}
                  </option>
                );
              else return <option value={category}>{category}</option>;
            })}
          </select>
        </div>

        <div className="form-group">
          <label for="authorId">Author</label>
          <select
            name="authorId"
            class="form-control"
            id="authorId"
            onChange={handleChange}
          >
            {authors.map((author) => {
              if (
                Object.keys(book).length !== 0 &&
                book.author.id === author.id
              )
                return (
                  <option value={author.id} selected>
                    {author.name + " " + author.surname}
                  </option>
                );
              else
                return (
                  <option value={author.id}>
                    {author.name + " " + author.surname}
                  </option>
                );
            })}
          </select>
        </div>

        <div className="form-group">
          <label for="availableCopies">Available Copies</label>
          <input
            onChange={handleChange}
            type="number"
            className="form-control"
            id="availableCopies"
            name="availableCopies"
            placeholder={book.availableCopies}
          ></input>
        </div>

        <hr></hr>
        <div className="form-group">
          <button id="submit" type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBook;
