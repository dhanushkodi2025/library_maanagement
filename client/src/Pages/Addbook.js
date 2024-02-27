import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Addbook() {
    const [books, setBooks] = useState([]);
    const [initialValues, setInitialValues] = useState({
        title: "",
        author: "",
        subject: "",
        genre: "",
        publishdate: ""
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:3001/Books");
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const onSubmit = async (data, { resetForm }) => {
        try {
            const response = await axios.post("http://localhost:3001/Books", data);
            navigate('/Addbooks');
            resetForm();
            fetchBooks(); // Refresh books list after adding a new book
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

   const onDelete = async (id) => {
    try {
        await axios.delete(`http://localhost:3001/Books/${id}`);
        setBooks(books.filter(book => book.id !== id)); // Remove the deleted book from the state
    } catch (error) {
        console.error('Error deleting book:', error);
    }
};

  const goToHome = () => {
    navigate('/Home'); // Navigate to the Home page
  }
    const navigate = useNavigate();

    return (
        <div className='Addbook d-flex align-items-center justify-content-center flex-column'>
            <div className="row">
                <div className="col-md-6">
                              <button className="btn btn-primary" onClick={goToHome}>Go to Home</button> {/* Button to navigate to Home */}
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form className='m-3'>
                            <div className='form-group'>
                                <label htmlFor="title"> <strong>Title:</strong></label>
                                <Field className='form-control' name="title" id="title" placeholder="Enter Title" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="author"><strong>Author:</strong></label>
                                <Field className='form-control' name="author" id="author" placeholder="Enter Author" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="subject"><strong>Subject:</strong></label>
                                <Field className='form-control' name="subject" id="subject" placeholder="Enter Subject" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="genre"><strong>Genre:</strong></label>
                                <Field className='form-control' name="genre" id="genre" placeholder="Enter Genre" />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="publishdate"><strong>Publish Date:</strong></label>
                                <Field className='form-control' name="publishdate" id="publishdate" placeholder="Enter Publish Date" />
                            </div>
                            <button className='btn btn-button btn-lg bg-primary text-white' type="submit">ADD</button>
                        </Form>
                    </Formik>
                </div>
                <div className="col-md-6">
                    <div className="mt-5">
                        <h2>Books</h2>
                        <ul>
                            {books.map((book) => (
                                <li key={book.id}>
                                    <div>
                                        <strong>Title:</strong> {book.title}<br />
                                        <strong>Author:</strong> {book.author}<br />
                                        <strong>Subject:</strong> {book.subject}<br />
                                        <strong>Genre:</strong> {book.genre}<br />
                                        <strong>Publish Date:</strong> {book.publishdate}<br />
                                    </div>
                                    <hr />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Addbook;
