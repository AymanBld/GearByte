import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../utils/fetchWithAuth";
import Toast from "../../Components/Toast";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newCategory, setNewCategory] = useState({ 
    name: '', 
    description: '', 
    icon: null  // Changed to null for file handling
  });
  const [editingCategory, setEditingCategory] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth('Store/category/');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', newCategory.name);
      formData.append('description', newCategory.description);
      if (newCategory.icon) {
        formData.append('icon', newCategory.icon);
      }

      const response = await fetchWithAuth('Store/category/', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header - it will be set automatically for FormData
      });

      if (!response.ok) {
        throw new Error('Failed to add category');
      }

      const addedCategory = await response.json();
      setCategories([...categories, addedCategory]);
      setNewCategory({ name: '', description: '', icon: null });
      setShowForm(false);
      setToast({
        show: true,
        message: 'Category added successfully!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to add category',
        type: 'error'
      });
    }
  };

  const handleEditCategory = async (category) => {
    try {
      const formData = new FormData();
      formData.append('name', editingCategory.name);
      formData.append('description', editingCategory.description);
      
      // Only append icon if it's a new file
      if (editingCategory.icon instanceof File) {
        formData.append('icon', editingCategory.icon);
      }

      const response = await fetchWithAuth(`Store/category/${category.id}/`, {
        method: 'PATCH',
        body: formData,
        // Don't set Content-Type header - it will be set automatically for FormData
      });

      if (!response.ok) {
        throw new Error('Failed to update category');
      }

      const updatedCategory = await response.json();
      setCategories(categories.map(cat => 
        cat.id === category.id ? updatedCategory : cat
      ));
      setEditingCategory(null);
      setToast({
        show: true,
        message: 'Category updated successfully!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to update category',
        type: 'error'
      });
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    
    try {
      const response = await fetchWithAuth(`Store/category/${categoryId}/`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(categories.filter(cat => cat.id !== categoryId));
      setToast({
        show: true,
        message: 'Category deleted successfully!',
        type: 'success'
      });
    } catch (err) {
      setToast({
        show: true,
        message: 'Failed to delete category',
        type: 'error'
      });
    }
  };

  const handleFileChange = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (file) {
      if (isEditing) {
        setEditingCategory(prev => ({ ...prev, icon: file }));
      } else {
        setNewCategory(prev => ({ ...prev, icon: file }));
      }
    }
  };

  if (loading) {
    return <div className="p-4">Loading categories...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg hover:bg-[#d62828] transition-colors"
        >
          {showForm ? 'Cancel' : 'Add Category'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAddCategory} className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <div className="grid gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                type="text"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Icon</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                accept="image/*"
              />
            </div>
            <button
              type="submit"
              className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg hover:bg-[#d62828] transition-colors"
            >
              Add Category
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <div className="w-full">
                      <div className="flex items-center gap-4">
                        {editingCategory.icon instanceof File ? (
                          <img 
                            src={URL.createObjectURL(editingCategory.icon)}
                            alt="New icon preview"
                            className="w-10 h-10 object-cover rounded"
                          />
                        ) : (
                          <img 
                            src={category.icon || '/default-category-icon.png'}
                            alt={category.name}
                            className="w-10 h-10 object-cover rounded"
                            onError={(e) => {
                              e.target.src = '/default-category-icon.png';
                            }}
                          />
                        )}
                        <input
                          type="file"
                          onChange={(e) => handleFileChange(e, true)}
                          className="hidden"
                          id={`icon-input-${category.id}`}
                          accept="image/*"
                        />
                        <label
                          htmlFor={`icon-input-${category.id}`}
                          className="flex items-center gap-2 text-sm cursor-pointer"
                        >
                          <i className='bx bx-upload text-[#EA3C3C]'></i>
                          Choose New Icon
                        </label>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={category.icon || '/default-category-icon.png'} 
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded"
                      onError={(e) => {
                        e.target.src = '/default-category-icon.png';
                      }}
                    />
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.name}
                      onChange={(e) => setEditingCategory({...editingCategory, name: e.target.value})}
                      className="w-full outline-none px-2"
                    />
                  ) : (
                    <div className="text-sm font-medium text-gray-900">{category.name}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingCategory?.id === category.id ? (
                    <input
                      type="text"
                      value={editingCategory.description}
                      onChange={(e) => setEditingCategory({...editingCategory, description: e.target.value})}
                      className="w-full outline-none px-2"
                    />
                  ) : (
                    <div className="text-sm text-gray-500">{category.description}</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {editingCategory?.id === category.id ? (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => handleEditCategory(category)}
                        className="text-green-600 hover:text-green-900"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCategory(null)}
                        className="text-gray-600 hover:text-gray-900"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2 justify-end">
                      <button
                        onClick={() => setEditingCategory(category)}
                        className="edit-btn flex items-center gap-1 px-3 py-1 rounded-lg text-gray-600 hover:bg-gray-100"
                      >
                        <i className='bx bx-edit'></i> Edit
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })}
        />
      )}
    </div>
  );
};

export default Categories;









