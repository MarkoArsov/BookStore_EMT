import React from "react";
import AuthorService from "../../service/authorService";

const Authors = () => {
  const [authors, setAuthors] = React.useState([]);

  React.useEffect(() => {
    AuthorService.fetchAuthors().then((data) => {
      setAuthors(data.data);
    });
  }, []);

  return (
    <div className="container mm-4 mt-5">
      <h1>Authors</h1>
      <ul className="list-group">
        {authors.map((aut) => {
          return <li className="list-group-item">{aut.name + ' ' + aut.surname}</li>;
        })}
      </ul>
    </div>
  );
};

export default Authors;
