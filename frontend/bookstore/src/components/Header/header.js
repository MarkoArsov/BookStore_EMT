import React from "react";
import { Link } from "react-router-dom";

const header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/books"}>
              Books
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/categories"}>
              Categories
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/authors"}>
              Authors
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to={"/books/add"}>
              Add New Book
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default header;
