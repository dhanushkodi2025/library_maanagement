import React from 'react';
import Home from "./Pages/Home";
import Addbook from './Pages/Addbook';
import Book from './Pages/Book';
import Login from './Pages/Login';
import Registration from './Pages/Registration';
import Userview from './Pages/Userview';
import { BrowserRouter as Router, Route, Routes ,Link} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <div className='bg-dark fs-2 d-flex mb-4'>
        
          
          <Link to="/" className='text-decoration-none text-white m-3'>Login</Link>
          <Link to="/registration" className='text-decoration-none text-white m-3'>Registration</Link>
          </div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Addbook" element={<Addbook />} />
          <Route path="/Book/:id" element={<Book />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/userview" element={<Userview />} />
          <Route path="/Home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
