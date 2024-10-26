import React, { useEffect, useState } from 'react';

function House() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    // Fetch the products from the backend
    fetch('http://localhost:8083/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Error loading products: {error.message}</p>;
  }

  return (
    <div>
      <h2>All Products</h2>
      <ul>
        {products.length > 0 ? (
          products.map(product => (
            <li key={product.prodId}>
              <h3>{product.prodName}</h3>
              <p>ID : {product.prodId}</p>
              <p>Price: ${product.price}</p>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
    </div>
  );
}

export default House;
