import React, { useState, useEffect } from 'react';

const Deleteproduct = () => {
  const [products, setProducts] = useState([]);
  const [prodId, setProdId] = useState(''); // Product ID to delete
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    fetch('http://localhost:8083/products')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleDelete = (e) => {
    e.preventDefault();

    if (!prodId) {
      alert('Please enter a product ID to delete.');
      return;
    }

    fetch(`http://localhost:8083/products/${prodId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete product');
        }
        alert('Product deleted successfully!');
        // Remove deleted product from the state
        setProducts(products.filter((prod) => prod.prodId !== parseInt(prodId)));
        setProdId('');
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h2>Delete Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <ul>
        {products.map((product) => (
          <li key={product.prodId}>
            <h3>{product.prodName}</h3>
            <p>ID: {product.prodId}</p>
            <p>Price: ${product.price}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={handleDelete}>
        <label>
          Enter Product ID to Delete:
          <input
            type="number"
            value={prodId}
            onChange={(e) => setProdId(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Delete Product</button>
      </form>
    </div>
  );
};

export default Deleteproduct;
