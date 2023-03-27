import React from "react";
import { Component } from "react";
import BookService from "../../../service/bookService";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

class Books extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      page: 0,
      size: 5,
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
    const pageCount = Math.ceil(this.state.books.length / this.state.size);
    const offset = this.state.size * this.state.page;
    const nextPageOffset = offset + this.state.size;
    const bookPage = this.getBookPage(offset, nextPageOffset);

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
              <tbody>{bookPage}</tbody>
            </table>
          </div>
        </div>
        <ReactPaginate
          previousLabel={"back"}
          nextLabel={"next"}
          breakLabel={'...'}
          breakClassName={"item break-me"}
          pageClassName={"item pagination-page ml-5"}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={this.handlePageClick}
          containerClassName={"pagination m-4 justify-content-center"}
          activeClassName={"item active"}
          disabledClassName={'disabled-page'}
          nextClassName={"item next"}
          previousClassName={"item previous"}
        />
      </div>
    );
  }

  handlePageClick = (data) => {
      this.setState({
        page: data.selected
      })

  };

  getBookPage = (offset, nextPageOffset) => {
    return this.state.books.map((book) => {
      return (
        <tr>
          <td>{book.name}</td>
          <td>{book.category}</td>
          <td>{book.author.name + " " + book.author.surname}</td>
          <td>{book.availableCopies}</td>
          <td>
            <Link className="btn btn-warning" to={"/books/edit/" + book.id}>
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
    }).filter( (book, index) => index >= offset && index < nextPageOffset);
  };
}

export default Books;
