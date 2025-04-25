import React, { useEffect, useState } from "react";
import { fetchApi } from "../../utils/fetchWithAuth";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetchApi('Store/product/');
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

  const handleDelete = async (id) => {
    try {
      const response = await fetchApi(`Store/product/${id}/`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      setProducts(products.filter(product => product.id !== id));
    } catch (err) {
      console.error("Error deleting product:", err);
      // You might want to show an error message to the user here
    }
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
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Our Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-40 object-cover rounded-lg mb-4"
                onError={(e) => {
                  e.target.src = '/default-product.jpg'; // Fallback image
                }}
              />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-xl font-bold text-[#EA3C3C]">${product.price}</p>
              <p className="text-sm text-gray-600 mt-1">Stock: {product.stock}</p>

              <div className="flex justify-between mt-3">
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  View Details
                </button>

                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Details Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">{selectedProduct.name}</h3>
            <img 
              src={selectedProduct.image} 
              alt={selectedProduct.name} 
              className="w-full h-40 object-cover rounded-lg mb-4"
              onError={(e) => {
                e.target.src = '/default-product.jpg'; // Fallback image
              }}
            />
            <p className="mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
            <p className="mb-2"><strong>Price:</strong> ${selectedProduct.price}</p>
            <p className="mb-2"><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedProduct.description}</p>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-[#EA3C3C] text-white px-4 py-2 rounded-lg w-full hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
