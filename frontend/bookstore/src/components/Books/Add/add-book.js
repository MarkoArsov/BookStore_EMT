import React from "react";
import BookService from "../../../service/bookService";
import AuthorService from "../../../service/authorService";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const navigate = useNavigate();
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
  });

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
    const name = formData.name;
    const authorId = formData.authorId;
    const category = formData.category;
    const availableCopies = formData.availableCopies;
    BookService.addBook(name, category, authorId, availableCopies).then(() => {
      navigate("/books");
    });
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
            required
            placeholder="Enter Book Name"
          ></input>
        </div>

        <div class="form-group">
          <label for="category">Select Book Category</label>
          <select
            name="category"
            class="form-control"
            id="category"
            onChange={handleChange}
          >
            <option value="" selected disabled hidden>
              Select Category
            </option>
            {categories.map((category) => (
              <option value={category}>{category}</option>
            ))}
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
            <option value="" selected disabled hidden>
              Select Author
            </option>
            {authors.map((author) => (
              <option value={author.id}>
                {author.name + " " + author.surname}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label for="availableCopies">Available Copies</label>
          <input
            onChange={handleChange}
            name="availableCopies"
            type="number"
            className="form-control"
            id="availableCopies"
            placeholder="Enter Available Copies"
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

export default AddBook;
