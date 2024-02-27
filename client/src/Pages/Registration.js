import React from 'react'
import { Formik, Form, Field } from 'formik';
import axios from 'axios';
function Registration() {
     const initialValues={
         username: "",
         password:"",
    };
    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data).then(() => {
            alert("Registered");
        })
    }

  return (<div className='d-flex w-80 h-50 align-items-center justify-content-center flex-column'>
      <h1>Registration</h1>
    
                    <Formik initialValues={initialValues} onSubmit={onSubmit}>
                        <Form className='m-3'>
                            <div className='form-group mt-3'>
                                <label htmlFor="username"> <strong>username:</strong></label>
                                <Field className='form-control' name="username" id="username" placeholder="Enter username" />
                            </div>
                            <div className='form-group mt-3'>
                                <label htmlFor="password"><strong>password:</strong></label>
                                <Field className='form-control' name="password" id="password" type="password" placeholder="Enter password" />
                            </div>
                            <button className='btn btn-button btn-lg bg-primary text-white mt-3 w-100' type="submit">Register</button>
                        </Form>
                    </Formik></div>
  );
}

export default Registration;