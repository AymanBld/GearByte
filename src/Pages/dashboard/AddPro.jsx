import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import Toast from "../../components/Toast";
import { fetchApi, fetchWithAuth} from "../../utils/fetchWithAuth";

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

  const [bulkUpload, setBulkUpload] = useState({
    sheet: null,
    images: {},
    isUploading: false
  });
  const [showBulkUpload, setShowBulkUpload] = useState(false);

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

  // Handle sheet file selection
  const handleSheetChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBulkUpload(prev => ({
        ...prev,
        sheet: file
      }));
    }
  };

  // Handle multiple image selection
  const handleImagesChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const newImages = { ...bulkUpload.images };
      
      Array.from(files).forEach(file => {
        // Use filename without extension as the key
        const fileName = file.name.split('.')[0];
        newImages[fileName] = file;
      });
      
      setBulkUpload(prev => ({
        ...prev,
        images: newImages
      }));
    }
  };

  // Remove an image from the selection
  const removeImage = (fileName) => {
    const newImages = { ...bulkUpload.images };
    delete newImages[fileName];
    
    setBulkUpload(prev => ({
      ...prev,
      images: newImages
    }));
  };

  // Handle bulk upload submission
  const handleBulkUpload = async (e) => {
    e.preventDefault();
    
    if (!bulkUpload.sheet) {
      setToast({
        show: true,
        message: 'Please select a sheet file',
        type: 'error'
      });
      return;
    }
    
    setBulkUpload(prev => ({ ...prev, isUploading: true }));
    
    try {
      const formData = new FormData();
      formData.append('sheet', bulkUpload.sheet);
      
      // Append each image with its filename as the key
      Object.entries(bulkUpload.images).forEach(([fileName, file]) => {
        formData.append(fileName, file);
      });
      
      const response = await fetchWithAuth('Store/products/bulk-upload/', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to upload products');
      }
      
      setToast({
        show: true,
        message: 'Products uploaded successfully!',
        type: 'success'
      });
      
      // Reset bulk upload form
      setBulkUpload({
        sheet: null,
        images: {},
        isUploading: false
      });
      
    } catch (err) {
      console.error("Error uploading products:", err);
      setToast({
        show: true,
        message: err.message || 'Failed to upload products',
        type: 'error'
      });
    } finally {
      setBulkUpload(prev => ({ ...prev, isUploading: false }));
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
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 text-center">Add Products</h2>
          <button
            onClick={() => setShowBulkUpload(!showBulkUpload)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            {showBulkUpload ? 'Single Product' : 'Bulk Upload'}
          </button>
        </div>
        
        {showBulkUpload ? (
          <form onSubmit={handleBulkUpload} className="space-y-6">
            <div className="p-5 bg-blue-50 rounded-lg mb-6 border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Bulk Upload Instructions
              </h3>
              <ul className="list-disc pl-5 text-sm text-blue-700 space-y-2">
                <li>Prepare an Excel/CSV file with product details</li>
                <li>Name your image files to match product identifiers in the sheet</li>
                <li>Upload the sheet and all product images</li>
                <li>Image filenames must match the product identifiers in your sheet</li>
              </ul>
            </div>
            
            {/* Sheet File Upload */}
            <div className="p-5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Product Sheet (Excel/CSV)
              </label>
              <div className="flex items-center justify-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm tracking-wide border border-blue cursor-pointer hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal text-gray-600">Select a file</span>
                  <input 
                    type="file" 
                    onChange={handleSheetChange}
                    className="hidden"
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                  />
                </label>
              </div>
              {bulkUpload.sheet && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg flex items-center justify-between">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm font-medium text-gray-700">{bulkUpload.sheet.name}</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => setBulkUpload(prev => ({...prev, sheet: null}))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              )}
            </div>
            
            {/* Multiple Images Upload */}
            <div className="p-5 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition-colors">
              <label className="block text-lg font-semibold text-gray-700 mb-3 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Product Images
              </label>
              <div className="flex items-center justify-center">
                <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-sm tracking-wide border border-blue cursor-pointer hover:bg-blue-50 transition-colors">
                  <svg className="w-8 h-8 text-blue-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="mt-2 text-base leading-normal text-gray-600">Select images</span>
                  <input 
                    type="file" 
                    onChange={handleImagesChange}
                    className="hidden"
                    accept="image/*"
                    multiple
                  />
                </label>
              </div>
              
              {/* Display selected images */}
              {Object.keys(bulkUpload.images).length > 0 && (
                <div className="mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-medium text-gray-700">Selected Images ({Object.keys(bulkUpload.images).length})</h4>
                    <button 
                      type="button" 
                      onClick={() => setBulkUpload(prev => ({...prev, images: {}}))}
                      className="text-xs text-red-500 hover:text-red-700"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {Object.entries(bulkUpload.images).map(([fileName, file]) => (
                      <div key={fileName} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 shadow-sm">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={fileName}
                            className="h-full w-full object-cover object-center"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              type="button"
                              onClick={() => removeImage(fileName)}
                              className="p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </button>
                          </div>
                        </div>
                        <span className="text-xs text-gray-500 truncate block mt-1">{fileName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Progress indicator */}
            {bulkUpload.isUploading && (
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div className="bg-blue-600 h-2.5 rounded-full animate-pulse w-full"></div>
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full py-4 px-6 bg-blue-600 text-white rounded-lg text-xl font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-8 flex items-center justify-center"
              disabled={bulkUpload.isUploading || !bulkUpload.sheet}
            >
              {bulkUpload.isUploading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Uploading Products...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-5 w-5" />
                  Upload Products
                </>
              )}
            </button>
          </form>
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default AddProduct;
