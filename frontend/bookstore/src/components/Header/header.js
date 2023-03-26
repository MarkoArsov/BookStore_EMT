import React from "react";
import { Link } from "react-router-dom";

const header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark navbar-fixed bg-dark">
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link className="nav-link" to={"/books"}>
                Books
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/books"}>
                Categories
              </Link>
            </li>
            <li className="nav-item active">
              <Link className="nav-link" to={"/books"}>
                Add New Book
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default header;
