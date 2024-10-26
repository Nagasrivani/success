import React, { useState, useEffect } from 'react';

const Updateproduct = () => {
  const [products, setProducts] = useState([]); //state to store the list of products
  const [selectedProduct, setSelectedProduct] = useState(null); //state for currently selected product
  const [updateField, setUpdateField] = useState(''); // Field to update (name or price)
  const [newValue, setNewValue] = useState(''); // New value for the selected field
  const [error, setError] = useState(null); 
  const [successMessage, setSuccessMessage] = useState(''); // Success message after update

  // Fetch products when the component mounts
  useEffect(() => {
    fetch('http://localhost:8083/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => setError(error.message));
  }, []); //empty dependency array ensures this runs only once when the component mounts

  // Select a product to update
  const handleSelectProduct = (prodId) => {
    const product = products.find((p) => p.prodId === prodId); //finding the selected product by id
    setSelectedProduct(product); //setting the selected product in state
    setSuccessMessage(''); // Clear any previous success message when selecting a new product
  };

  // Update the selected product
  const handleUpdate = (e) => {
    e.preventDefault(); //preventing default form submission behaviour

    if (!selectedProduct) {
      alert('Please select a product to update.');
      return;
    }

    //creating an updated product object with the new value for the selected field
    const updatedProduct = {
      ...selectedProduct,
      [updateField]: newValue, //updating the field based on user input
    };

    //making a put request to update the product on the server
    fetch('http://localhost:8083/products', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', //specifying the content type of the request
      },
      body: JSON.stringify(updatedProduct), //converting the updated product object to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to update product');
        }
        return response.json();
      })
      .then(() => {
        // Update product list
        setProducts((prevProducts) =>
          prevProducts.map((prod) =>
            prod.prodId === selectedProduct.prodId ? updatedProduct : prod //replacing the updated product in the list
          )
        );
        setSuccessMessage('Product updated successfully!'); // Show success message
        setUpdateField('');
        setNewValue('');

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
          setSelectedProduct(null); // Close popup after success message
        }, 3000);
      })
      .catch((error) => setError(error.message));
  };

  return (
    <div>
      <h2>Update Product</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      {/* Display product list */}
      <ul>
        {products.map((product) => (
          <li key={product.prodId}>
            <h3>{product.prodName}</h3>
            <p>ID: {product.prodId}</p>
            <p>Price: ${product.price}</p>
            <button onClick={() => handleSelectProduct(product.prodId)}>
              Select this product
            </button>
          </li>
        ))}
      </ul>

      {/* Popup-like overlay for update form */}
      {selectedProduct && (
        <div style={overlayStyle}>
          <div style={popupStyle}>
            <h3>Update Product ID: {selectedProduct.prodId}</h3>

            {/* Success message displayed briefly after updating */}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}

            <form onSubmit={handleUpdate}>
              <label>
                Choose Field to Update:
                <select
                  value={updateField}
                  onChange={(e) => setUpdateField(e.target.value)}
                  required
                >
                  <option value="">Select a field</option>
                  <option value="prodName">Name</option>
                  <option value="price">Price</option>
                </select>
              </label>
              <br />
              <label>
                New Value:
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  required
                />
              </label>
              <br />
              <button type="submit"onClick={() => setSuccessMessage()}>Update Product</button>
              <button type="button" onClick={() => setSelectedProduct(null)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Styles for the overlay and popup
const overlayStyle = {
  position: 'fixed', //fixed positioning for full-screen overlay
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex', //using flexbox for centering the popup
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,//ensuring the overlay appears above other content
};

const popupStyle = {
  backgroundColor: 'white', //white background for the popup
  padding: '20px',
  borderRadius: '8px',
  width: '300px',
  textAlign: 'center',
};

export default Updateproduct;
