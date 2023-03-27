import React from "react";
import { Component } from "react";
import BookService from "../../../service/bookService";
import AuthorService from "../../../service/authorService";

class EditBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {},
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
    const id = window.location.href.split("/")[5];
    this.getBook(id);
  }

  getBook = (id) => {
    BookService.getBook(id).then((data) => {
      this.setState({
        book: data.data,
      });
      this.setState({
        formData: {
          name: this.state.book.name,
          category: this.state.book.category,
          authorId: this.state.book.author.id,
          availableCopies: this.state.book.availableCopies,
        },
      });
    });
  };

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
    const id = this.state.book.id;
    const name = this.state.formData.name;
    const authorId = this.state.formData.authorId;
    const category = this.state.formData.category;
    const availableCopies = this.state.formData.availableCopies;
    BookService.editBook(id, name, category, authorId, availableCopies).then(
      () => {
        window.location.href = "http://localhost:3000/books"
      }
    );
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
              placeholder={this.state.book.name}
            ></input>
          </div>

          <div class="form-group">
            <label for="category">Select Book Category</label>
            <select
              class="form-control"
              name="category"
              id="category"
              onChange={this.handleChange}
            >
              {this.state.categories.map((category) => {
                if (this.state.book.category === category)
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
              onChange={this.handleChange}
            >
              {this.state.authors.map((author) => {
                if (this.state.book.author.id === author.id)
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
              onChange={this.handleChange}
              type="number"
              className="form-control"
              id="availableCopies"
              name="availableCopies"
              placeholder={this.state.book.availableCopies}
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

export default EditBook;
