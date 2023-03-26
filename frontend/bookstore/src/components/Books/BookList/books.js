import React from "react";
import { Component } from "react";
import BookService from "../../../service/bookService";
import { Link } from "react-router-dom";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks = () => {
    BookService.fetchBooks().then((data) => {
      this.setState({
        books: data.data,
      });
    });
  };

  deleteBook = (id) => {
    BookService.deleteBook(id).then(() => {
      this.fetchBooks();
    });
  };

  markBook = (id) => {
    BookService.markBook(id).then(() => {
      this.fetchBooks();
    });
  };

  render() {
    return (
      <div className={"container mm-4 mt-5"}>
        <h1>Books</h1>
        <div className={"row"}>
          <div className={"table-responsive"}>
            <table className={"table table-striped"}>
              <thead>
                <tr>
                  <th scope={"col"}>Name</th>
                  <th scope={"col"}>Category</th>
                  <th scope={"col"}>Author</th>
                  <th scope={"col"}>Available Copies</th>
                  <th scope={"col"}>Edit</th>
                  <th scope={"col"}>Delete</th>
                  <th scope={"col"}>Mark As Taken</th>
                </tr>
              </thead>
              <tbody>
                {this.state.books.map((book) => {
                  return (
                    <tr>
                      <td>{book.name}</td>
                      <td>{book.category}</td>
                      <td>{book.author.name}</td>
                      <td>{book.availableCopies}</td>
                      <td>
                        <Link className="btn btn-warning" to={"/categories"}>
                          Edit
                        </Link>
                      </td>
                      <td>
                        <button
                          onClick={() => this.deleteBook(book.id)}
                          type="button"
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() => this.markBook(book.id)}
                          type="button"
                          className="btn btn-info"
                        >
                          Mark As Taken
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Books;
