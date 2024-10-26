import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import House from './House'; 
import './App.css';
import Addproduct from './Addproduct';
import Updateproduct from './Updateproduct';
import Deleteproduct from './Deleteproduct';
import Getproduct from './Getproduct';

//const Home = () => <h2>Home Page</h2>;
//const GetProduct = () => <h2>Get Product Page</h2>;
//const AddProduct = () => <h2>Add Product Page</h2>;
//const UpdateProduct = () => <h2>Update Product Page</h2>;
//const DeleteProduct = () => <h2>Delete Product Page</h2>;

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<House />} />
        <Route path="/get-product" element={<Getproduct />} />
        <Route path="/add-product" element={<Addproduct />} />
        <Route path="/update-product" element={<Updateproduct />} />
        <Route path="/delete-product" element={<Deleteproduct />} />
      </Routes>
    </Router>
  );
}

export default App;
