import { Component } from "react";
import Books from "../Books/BookList/books";
import Header from '../Header/header'
import "./App.css";
import { BrowserRouter as Router, Routes, Navigate, Route } from "react-router-dom";
import Categories from "../Categories/categories";

class App extends Component {
  render() {
    return (
      <Router>
        <Header></Header>
        <main>
          <div className="container">
            <Routes>
              <Route path={"/books"} element={<Books></Books>} />
              <Route path={"/categories"} element={<Categories></Categories>} />
              <Route path="/" element={<Navigate replace to="/books" />} />
            </Routes>
          </div>
        </main>
      </Router>
    );
  }
}

export default App;
