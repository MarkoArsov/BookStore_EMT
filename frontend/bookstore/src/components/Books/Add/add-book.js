import { Component } from "react";
import BookService from "../../../service/bookService";
import AuthorService from "../../../service/authorService";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      authors: [],
      formData: {
        name: "",
        category: "",
        authorId: 0,
        availableCopies: 0,
      },
    };
  }

  componentDidMount() {
    this.fetchCategories();
    this.fetchAuthors();
  }

  fetchCategories = () => {
    BookService.fetchCategories().then((data) => {
      this.setState({
        categories: data.data,
      });
    });
  };

  fetchAuthors = () => {
    AuthorService.fetchAuthors().then((data) => {
      this.setState({
        authors: data.data,
      });
    });
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    const name = this.state.formData.name;
    const authorId = this.state.formData.authorId;
    const category = this.state.formData.category;
    const availableCopies = this.state.formData.availableCopies;
    BookService.addBook(name, category, authorId, availableCopies).then(() => {
      window.location.href = "http://localhost:3000/books";
    });
  };

  handleChange = (e) => {
    this.setState({
      formData: {
        ...this.state.formData,
        [e.target.name]: e.target.value.trim(),
      },
    });
  };

  render() {
    return (
      <div className={"container mm-4 mt-5"}>
        <form onSubmit={this.onFormSubmit}>
          <div className="form-group">
            <label for="name">Book Name</label>
            <input
              onChange={this.handleChange}
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
              onChange={this.handleChange}
            >
              <option value="" selected disabled hidden>
                Select Category
              </option>
              {this.state.categories.map((category) => (
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
              onChange={this.handleChange}
            >
              <option value="" selected disabled hidden>
                Select Author
              </option>
              {this.state.authors.map((author) => (
                <option value={author.id}>
                  {author.name + " " + author.surname}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label for="availableCopies">Available Copies</label>
            <input
              onChange={this.handleChange}
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
  }
}

export default AddBook;
