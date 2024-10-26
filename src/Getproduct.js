import React, { useState } from 'react';

const Getproduct = () => {
  const [productId, setProductId] = useState(''); // State for storing entered product ID
  const [product, setProduct] = useState(null); // State for storing fetched product details
  const [error, setError] = useState(null); // State for error handling

  //function to handle the product fetching when the form is submitted
  const handleGetProduct = (e) => {
    e.preventDefault(); 

    //checking if the product id has been entered
    if (!productId) {
      setError('Please enter a product ID.'); //setting an error message if the id is missing
      setProduct(null);//clearing any previously fetched producct
      return; //exiting
    }

    // Fetch product by ID from the backend
    fetch(`http://localhost:8083/products/${productId}`) 
      .then((response) => {
        if (!response.ok) {
          throw new Error('Product not found');
        }
        return response.json();
      })
      .then((data) => {
        setProduct(data); //setting the fetched product details in state
        setError(null); // clearing any previous error
      })
      .catch((error) => {
        setError(error.message);
        setProduct(null);
      });
  };

  return (
    <div>
      <h2>Get Product by ID</h2>

      <form onSubmit={handleGetProduct}>
        <label>
          Enter Product ID:
          <input
            type="text" //input field for entering the product id
            value={productId} //controlled input with state
            onChange={(e) => setProductId(e.target.value)} //updating state on input change
            required
          />
        </label>
        <br />
        <button type="submit">Get Product</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {product && ( //rendering product details if a product has been fetched
        <div>
          <h3>Product Details:</h3>
          <p>Product ID: {product.prodId}</p>
          <p>Name: {product.prodName}</p>
          <p>Price: ${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default Getproduct;
