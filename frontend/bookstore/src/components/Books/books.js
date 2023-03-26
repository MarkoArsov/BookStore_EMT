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
                      </tr>
                      </thead>
                      <tbody>
                      {this.state.books.map(book => {
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
          </div>
      </div>
    );
  }
}

export default Books;
