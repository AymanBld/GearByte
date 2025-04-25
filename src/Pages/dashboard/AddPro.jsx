import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Toast from "../../components/Toast"; // Make sure this path is correct
import { fetchApi } from "../../utils/fetchWithAuth";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  
  const [product, setProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: null,
  });

  // Reset form function
  const resetForm = () => {
    setProduct({
      name: "",
      category: "",
      price: "",
      stock: "",
      description: "",
      image: null,
    });
    // Reset the file input
    const fileInput = document.querySelector('input[type="file"]');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetchApi('Store/category/');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('description', product.description);
      if (product.image) {
        formData.append('image', product.image);
      }

      const response = await fetch('http://localhost:8000/Store/product/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to add product');
      }

      // Show success toast
      setToast({
        show: true,
        message: 'Product added successfully!',
        type: 'success'
      });

      // Reset the form
      resetForm();

    } catch (err) {
      console.error("Error adding product:", err);
      // Show error toast
      setToast({
        show: true,
        message: err.message || 'Failed to add product',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      {/* Show Toast notification */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-2xl font-bold text-black mb-6 text-center">Add Product</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
          <input 
            type="text" 
            name="name" 
            value={product.name} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-lg" 
            required 
          />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category</label>
          <select 
            name="category" 
            value={product.category} 
            onChange={handleChange} 
            className="w-full p-3 border rounded-lg text-lg"
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price ($)</label>
            <input 
              type="number" 
              name="price" 
              value={product.price} 
              onChange={handleChange} 
              step="0.01"
              min="0"
              className="w-full p-3 border rounded-lg text-lg" 
              required 
            />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Stock</label>
            <input 
              type="number" 
              name="stock" 
              value={product.stock} 
              onChange={handleChange} 
              min="0"
              className="w-full p-3 border rounded-lg text-lg" 
              required 
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Description</label>
          <textarea 
            name="description" 
            value={product.description} 
            onChange={handleChange} 
            rows="4" 
            className="w-full p-3 border rounded-lg text-lg"
            required
          />
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Image</label>
          <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer hover:border-gray-400 transition-colors">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="hidden" 
              required
            />
            <Upload className="mx-auto text-gray-500" size={28} />
            <span className="text-gray-600 text-lg">Upload Image</span>
            {product.image && (
              <div className="mt-2 text-sm text-gray-500">
                Selected file: {product.image.name}
              </div>
            )}
          </label>
        </div>

        {/* Submit Button */}
        <button 
          type="submit" 
          className="w-full p-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? 'Adding Product...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
