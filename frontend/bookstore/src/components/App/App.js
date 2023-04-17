import { Component } from "react";
import Books from "../Books/List/books";
import EditBook from "../Books/Edit/edit-book";
import AddBook from "../Books/Add/add-book";
import Header from "../Header/header";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Navigate,
  Route,
} from "react-router-dom";
import Categories from "../Categories/categories";
import Authors from "../Authors/authors";

class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <main>
          <div className="container">
            <Routes>
              <Route path={"/books/edit/:id"} element={<EditBook></EditBook >} />
              <Route path={"/books/add"} element={<AddBook></AddBook >} />
              <Route path={"/books"} element={<Books></Books>} />
              <Route path={"/categories"} element={<Categories></Categories>} />
              <Route path={"/authors"} element={<Authors></Authors>} />
              <Route path="/" element={<Navigate replace to="/books" />} />
            </Routes>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
