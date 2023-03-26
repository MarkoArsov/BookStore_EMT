import React from "react";
import { Component } from "react";
import BookService from "../../service/bookService";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = () => {
    BookService.fetchCategories().then((data) => {
      this.setState({
        categories: data.data,
      });
    });
  };

  render() {
    return (
      <div className="cointainer">
        <br></br>
        <ul className="list-group">
          {this.state.categories.map((cat) => {
            return <li className="list-group-item">{cat}</li>;
          })}
        </ul>
      </div>
    );
  }
}

export default Categories;
