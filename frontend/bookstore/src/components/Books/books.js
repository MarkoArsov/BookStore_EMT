import React from "react";
import { Component } from "react";
import BookService from "../../service/bookService";

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

  render() {
    return (
      <div>
        <h1>Books</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Author</th>
              <th>Available Copies</th>
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Books;
