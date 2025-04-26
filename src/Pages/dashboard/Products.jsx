import React, { useState, useEffect, useRef } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../components/Toast";
import { useClickOutside } from "../../Hooks/use-click-outside";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const modalRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useClickOutside([modalRef], () => {
    if (selectedProduct && !isEditing) {
      setSelectedProduct(null);
    }
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories(); // Add this to fetch categories when component mounts
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('Store/product/');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data.results);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetchWithAuth('Store/category/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setToast({
        show: true,
        message: 'Failed to fetch categories',
        type: 'error'
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetchWithAuth(`Store/product/${id}/`, {
        method: 'DELETE'
      });
      
      if (!response.ok) { 
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(product => product.id !== id));
      setSelectedProduct(null);
      setToast({
        show: true,
        message: 'Product deleted successfully',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to delete product',
        type: 'error'
      });
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProduct({
      ...selectedProduct,
      category: selectedProduct.category // The category ID should already be a number from the API
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setEditedProduct(prev => ({
        ...prev,
        [name]: files[0] // Store the actual File object
      }));
    } else if (name === 'category') {
      setEditedProduct(prev => ({
        ...prev,
        [name]: parseInt(value, 10) // Convert category ID to integer
      }));
    } else {
      setEditedProduct(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      
      // Only append image if it's a new file
      if (editedProduct.image instanceof File) {
        formData.append('image', editedProduct.image);
      }

      // Append other fields
      Object.keys(editedProduct).forEach(key => {
        if (key !== 'image' && editedProduct[key] !== null && editedProduct[key] !== '') {
          formData.append(key, editedProduct[key]);
        }
      });

      const response = await fetchWithAuth(`Store/product/${editedProduct.id}/`, {
        method: 'PATCH',
        body: formData,
        // Remove the Content-Type header to let the browser set it with boundary for FormData
        headers: {
          // Don't set 'Content-Type' here - it will be set automatically for FormData
        }
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      
      setProducts(prevProducts =>
        prevProducts.map(product => 
          product.id === editedProduct.id ? updatedProduct : product
        )
      );
      
      setSelectedProduct(updatedProduct);
      setIsEditing(false);
      setToast({
        show: true,
        message: 'Product updated successfully!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to update product',
        type: 'error'
      });
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProduct(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#EA3C3C]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}

      <h2 className="text-3xl font-bold text-black mb-6 text-center">Our Products</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className={`border-b hover:bg-gray-50 transition cursor-pointer ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <td className="p-3">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      e.target.src = '/default-product.jpg';
                    }}
                  />
                </td>
                <td className="p-3 font-medium">{product.name}</td>
                <td className="p-3 text-gray-600">{product.category}</td>
                <td className="p-3 font-semibold text-[#EA3C3C]">${product.price}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-sm ${
                    product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Updated Details Dialog */}
      {selectedProduct && (
        <div className="fixed inset-0 backdrop-blur-[2px] bg-transparent flex items-center justify-center z-50">
          <div 
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-[#EA3C3C]">Product Details</h3>
              {!isEditing && (
                <button
                  onClick={handleEdit}
                  className="edit-btn flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  <i className='bx bx-edit'></i> Edit Product
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Left Column - Image */}
              <div>
                <div className="relative">
                  <img 
                    src={isEditing ? (editedProduct.image instanceof File ? URL.createObjectURL(editedProduct.image) : editedProduct.image) : selectedProduct.image}
                    alt={isEditing ? editedProduct.name : selectedProduct.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = '/default-product.jpg';
                    }}
                  />
                  {isEditing && (
                    <div className="mt-2">
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="hidden"
                        id="imageInput"
                        accept="image/*"
                      />
                      <label
                        htmlFor="imageInput"
                        className="w-full py-2 px-3 flex items-center justify-center gap-2 text-sm bg-white border border-gray-300 rounded hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                      >
                        <i className='bx bx-upload text-[#EA3C3C]'></i>
                        Choose New Image
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Product Details */}
              <div>
                {isEditing ? (
                  <div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={editedProduct.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C] transition-all duration-200"
                      >
                        {categories.map(category => (
                          <option 
                            key={category.id} 
                            value={category.id}
                            selected={category.id === editedProduct.category}
                          >
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <div className="relative">
                        <span className="absolute left-2 top-[11px] text-gray-500">$</span>
                        <input
                          type="number"
                          name="price"
                          value={editedProduct.price}
                          onChange={handleChange}
                          className="w-full p-2 pl-6 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C] transition-all duration-200"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C] transition-all duration-200"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={editedProduct.description}
                        onChange={handleChange}
                        rows="3"
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C] transition-all duration-200 resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mb-4">
                      <p className="font-bold mb-2">Product Information:</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="mb-2"><strong>Name:</strong> {selectedProduct.name}</p>
                        <p className="mb-2"><strong>Category:</strong> {
                          categories.find(cat => cat.id === selectedProduct.category)?.name || selectedProduct.category
                        }</p>
                        <p className="mb-2">
                          <strong>Price:</strong> 
                          <span className="text-[#EA3C3C] font-medium"> ${selectedProduct.price}</span>
                        </p>
                        <p>
                          <strong>Stock Status:</strong> 
                          <span className={`ml-1 ${selectedProduct.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {selectedProduct.stock > 0 ? `${selectedProduct.stock} units` : 'Out of Stock'}
                          </span>
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="font-bold mb-2">Description:</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p>{selectedProduct.description}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="w-full bg-[#EA3C3C] text-white px-4 py-2 rounded hover:bg-[#ea3c3cb1]"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={handleCancel}
                    className="w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleDelete(selectedProduct.id)}
                    className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="w-full bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                  >
                    Close
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
