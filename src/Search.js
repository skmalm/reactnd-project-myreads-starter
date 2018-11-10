import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';

class Search extends Component {
  state = {
    query: '',
    results: []
  }

  updateQuery = query => {
    BooksAPI.search(query)
    .then(searchResults => {
      console.log(searchResults);
      this.setState({
        results: searchResults,
        query: query.trim()
      });
    })
  }

  render() {
    const query = this.state.query;
    const onUpdateShelf = this.props.onUpdateShelf;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to = "/"
            className = "close-search"
          >Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={event => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {(this.state.results.length > 0) ? (
            <ol className="books-grid">
              {this.state.results.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks ? (
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail}` }}></div>
                      ) : (
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url("http://books.google.com/books/content?id=nggnmAEAC%E2%80%A6J&printsec=frontcover&img=1&zoom=1&source=gbs_api")' }}></div>
                      )}
                      <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={function (event) {
                        onUpdateShelf(book, event.target.value);
                      }}>
                          <option value="move" disabled>Move to...</option>
                          <option value="currentlyReading">Currently Reading</option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors ? (
                      <div className="book-authors">{book.authors.join(', ')}</div>
                    ) : (<div className="book-authors">(No Author)</div>)}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <div>no results</div>
          )}
        </div>
      </div>
    );
  }

}

export default Search;