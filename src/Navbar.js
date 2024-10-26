import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Nachina Product Enchuko</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/get-product">Get Product</Link></li>
        <li><Link to="/add-product">Add Product</Link></li>
        <li><Link to="/update-product">Update Product</Link></li>
        <li><Link to="/delete-product">Delete Product</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
