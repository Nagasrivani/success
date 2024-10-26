import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [prodId, setProdId] = useState("");
  const [prodName, setProdName] = useState("");
  const [price, setPrice] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = { prodId, prodName, price };

    fetch("http://localhost:8083/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((error) => {
            throw new Error(`Failed to add product: ${error.message || response.statusText}`);
          });
        }
        // Check if there's content in the response
        return response.text().then((text) => {
          return text ? JSON.parse(text) : {}; // Parse if there is text; otherwise, return an empty object
        });
      })
      .then(() => {
        alert("Product added successfully!");
        navigate("/get-products");
      })
      .catch((error) => {
        console.log("Error occurred:", error);
        setError(error.message);
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product ID:</label>
          <input type="text" value={prodId} onChange={(e) => setProdId(e.target.value)} required />
        </div>
        <div>
          <label>Product Name:</label>
          <input type="text" value={prodName} onChange={(e) => setProdName(e.target.value)} required />
        </div>
        <div>
          <label>Price:</label>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
