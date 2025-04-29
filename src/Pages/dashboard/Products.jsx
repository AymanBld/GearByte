import React, { useState, useEffect, useRef } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../components/Toast";
import { useClickOutside } from "../../Hooks/use-click-outside";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const modalRef = useRef(null);

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
      category: selectedProduct.category.id
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
      
      if (editedProduct.image instanceof File) {
        formData.append('image', editedProduct.image);
      }

      Object.keys(editedProduct).forEach(key => {
        if (key !== 'image' && editedProduct[key] !== null && editedProduct[key] !== '') {
          if (key === 'category') {
            formData.append(key, Number(editedProduct[key])); // Send category id as number
          } else {
            formData.append(key, editedProduct[key]);
          }
        }
      });

      const response = await fetchWithAuth(`Store/product/${editedProduct.id}/`, {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update product');
      }

      const updatedProduct = await response.json();
      
      const categoryObject = categories.find(cat => cat.id === updatedProduct.category);
      
      const finalUpdatedProduct = {
        ...updatedProduct,
        category: categoryObject 
      };

      setProducts(prevProducts =>
        prevProducts.map(product => 
          product.id === editedProduct.id ? finalUpdatedProduct : product
        )
      );
        
      setSelectedProduct(finalUpdatedProduct);
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
                <td className="p-3 text-gray-600">{product.category.name}</td>
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

      {/* Details Dialog */}
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
                    src={isEditing && editedProduct ? 
                      (editedProduct.image instanceof File ? 
                        URL.createObjectURL(editedProduct.image) : 
                        editedProduct.image) : 
                      selectedProduct.image}
                    alt={isEditing && editedProduct ? editedProduct.name : selectedProduct.name}
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

              {/* Right Column - Details */}
              <div className="space-y-4">
                {isEditing && editedProduct ? (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editedProduct.name || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <select
                        name="category"
                        value={editedProduct.category || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C]"
                      >
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <input
                        type="number"
                        name="price"
                        value={editedProduct.price || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <input
                        type="number"
                        name="stock"
                        value={editedProduct.stock || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <textarea
                        name="description"
                        value={editedProduct.description || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-[#EA3C3C]"
                        rows="3"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="text-gray-900">{selectedProduct.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Category</label>
                      <p className="text-gray-900">{selectedProduct.category.name}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Price</label>
                      <p className="text-gray-900">${selectedProduct.price}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Stock</label>
                      <p className="text-gray-900">{selectedProduct.stock}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Description</label>
                      <p className="text-gray-900">{selectedProduct.description}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-[#EA3C3C] text-white rounded hover:bg-[#d62828]"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => handleDelete(selectedProduct.id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete Product
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
