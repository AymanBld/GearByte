import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Toast from "../../components/Toast";
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
    <div className="container mx-auto px-4 py-8">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Add New Product</h2>
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Product Name</label>
            <input 
              type="text" 
              name="name" 
              value={product.name} 
              onChange={handleChange} 
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all" 
              required 
              placeholder="Enter product name"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Category</label>
            <select 
              name="category" 
              value={product.category} 
              onChange={handleChange} 
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all appearance-none bg-white"
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

          {/* Price */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Price (DA)</label>
            <div className="relative">
              <input 
                type="number" 
                name="price" 
                value={product.price} 
                onChange={handleChange} 
                step="0.01"
                min="0"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all pr-12" 
                required 
                placeholder="0.00"
              />
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Stock</label>
            <input 
              type="number" 
              name="stock" 
              value={product.stock} 
              onChange={handleChange} 
              min="0"
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all" 
              required 
              placeholder="Available quantity"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              name="description" 
              value={product.description} 
              onChange={handleChange} 
              rows="5" 
              className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all resize-none"
              required
              placeholder="Enter product description"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700 mb-2">Image</label>
            <input 
              type="file" 
              name="image"
              onChange={handleImageChange}
              className="w-full p-3 border-2 border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 transition-all"
              accept="image/*"
            />
            {product.image && (
              <div className="mt-2 text-sm text-gray-500">
                Selected file: {product.image.name}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button 
            type="submit" 
            className="w-full py-4 px-6 bg-red-600 text-white rounded-lg text-xl font-semibold hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-8"
            disabled={loading}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
