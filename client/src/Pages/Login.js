import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [loginStatus, setLoginStatus] = useState("");

    const onSubmit = (values, { setSubmitting }) => {
        axios.post("http://localhost:3001/auth/login", values)
            .then((response) => {
                if (response.data === "YOU LOGGED IN") {
                    if (values.username === "admin" && values.password === "123") {
                        navigate("/Addbook"); // Redirect to the admin page
                    } else {
                        navigate("/userview"); // Redirect to the home page
                    }
                } else {
                    setLoginStatus("Login failed"); // Set login status if login fails
                }
            })
            .catch((error) => {
                console.error('Error logging in:', error);
                setLoginStatus("Login failed"); // Set login status if there's an error
            })
            .finally(() => {
                setSubmitting(false);
            });
    };

    const initialValues = {
        username: "",
        password: "",
    };

    return (
        <div className='d-flex w-80 h-50 align-items-center justify-content-center flex-column'>
            <h1>Login</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ isSubmitting }) => (
                    <Form className='m-3'>
                        <div className='form-group mt-3'>
                            <label htmlFor="username"><strong>Username:</strong></label>
                            <Field className='form-control' name="username" id="username" placeholder="Enter username" />
                        </div>
                        <div className='form-group mt-3'>
                            <label htmlFor="password"><strong>Password:</strong></label>
                            <Field className='form-control' name="password" id="password" type="password" placeholder="Enter password" />
                        </div>
                        <button className='btn btn-button btn-lg bg-primary text-white mt-3 w-100' type="submit" disabled={isSubmitting}>Login</button>
                        <h2>{loginStatus}</h2>
                    </Form>
                )}
            </Formik>
        </div>
    );
}

export default Login;
