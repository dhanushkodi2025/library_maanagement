import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Userview() {
  const [listOfBooks, setListOfBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  let navigate=useNavigate()
  const [filters, setFilters] = useState({
    title: '',
    author: '',
    genre: ''
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios.get("http://localhost:3001/Books")
      .then((response) => {
        setListOfBooks(response.data);
        setFilteredBooks(response.data); // Initially set filtered books to all books
      })
      .catch((error) => {
        console.error('Error fetching books:', error);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setCurrentPage(1);
  };

  useEffect(() => {
    const filtered = listOfBooks.filter(book =>
      (filters.title ? book.title.toLowerCase().includes(filters.title.toLowerCase()) : true) &&
      (filters.author ? book.author.toLowerCase().includes(filters.author.toLowerCase()) : true) &&
      (filters.genre ? book.genre.toLowerCase().includes(filters.genre.toLowerCase()) : true)
    );
    setFilteredBooks(filtered);
  }, [filters, listOfBooks]);

  const totalPages = Math.ceil(filteredBooks.length / 3);

  
  const startIndex = (currentPage - 1) * 3;
  const endIndex = startIndex + 3;

  const currentBooks = filteredBooks.slice(startIndex, endIndex);

  return (
    <div className="App vh-100">
      <div className='mt-5'>
        <div className="container mt-5">
          <div className="row">
            <div className="col">
              <input type="text" className="form-control mb-3" name="title" placeholder="Search by Title" onChange={handleFilterChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control mb-3" name="author" placeholder="Search by Author" onChange={handleFilterChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control mb-3" name="genre" placeholder="Search by Genre" onChange={handleFilterChange} />
            </div>
          </div>
          <div className="row">
            {currentBooks.map((book, index) => (
              <div className="col-4 mb-4" key={index}>
                <div className="card" onClick={()=>{navigate(`/Book/${book.id}`)}}>
                  <div className="card-body">
                    <h5 className="card-title">Title: {book.title}</h5>
                    <p className="card-text"><strong>Author:</strong> {book.author}</p>
                    <p className="card-text"><strong>Subject:</strong> {book.subject}</p>
                    <p className="card-text"><strong>Genre:</strong> {book.genre}</p>
                    <p className="card-text"><strong>Publish Date:</strong> {book.publishdate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col">
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <li className={`page-item ${currentPage === index + 1 ? 'active' : ''}`} key={index}>
                      <button className="page-link" onClick={() => setCurrentPage(index + 1)}>{index + 1}</button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userview;
