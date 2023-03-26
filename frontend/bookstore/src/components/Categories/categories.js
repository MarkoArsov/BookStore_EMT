import React from "react";
import BookService from "../../service/bookService";

const Categories = () => {
  const [categories, setCategories] = React.useState([]);

  React.useEffect(() => {
    BookService.fetchCategories().then((data) => {
      setCategories(data.data);
    });
  }, []);

  return (
    <div className="container mm-4 mt-5">
      <h1>Categories</h1>
      <ul className="list-group">
        {categories.map((cat) => {
          return <li className="list-group-item">{cat}</li>;
        })}
      </ul>
    </div>
  );
};

export default Categories;
