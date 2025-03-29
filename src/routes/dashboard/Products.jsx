

// import React, { useEffect, useState } from "react";

// const Products = () => {
//   const [products, setProducts] = useState([]);

//   // Load products from localStorage on first render
//   useEffect(() => {
//     const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
//     setProducts(storedProducts);
//   }, []);

//   // Delete product
//   const handleDelete = (id) => {
//     const updatedProducts = products.filter((product) => product.id !== id);
//     setProducts(updatedProducts);
//     localStorage.setItem("products", JSON.stringify(updatedProducts));
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-3xl font-bold text-black mb-6 text-center">Our Products</h2>

//       {products.length === 0 ? (
//         <p className="text-center text-gray-500">No products available.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
//               <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
//               <h3 className="text-lg font-semibold">{product.name}</h3>
//               <p className="text-gray-500">{product.category}</p>
//               <p className="text-xl font-bold text-[#EA3C3C]">{product.price}</p>

//               <button onClick={() => handleDelete(product.id)} className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Products;






import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Load products from localStorage on first render
  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    setProducts(storedProducts);
  }, []);

  // Delete product
  const handleDelete = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Our Products</h2>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white shadow-md rounded-lg p-4">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-lg mb-4" />
              <h3 className="text-lg font-semibold">{product.name}</h3>
              <p className="text-gray-500">{product.category}</p>
              <p className="text-xl font-bold text-[#EA3C3C]">{product.price}</p>

              <div className="flex justify-between mt-3">
                {/* View Details Button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                >
                  View Details
                </button>

                {/* Delete Button */}
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
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">{selectedProduct.name}</h3>
            <img src={selectedProduct.image} alt={selectedProduct.name} className="w-full h-40 object-cover rounded-lg mb-4" />
            <p className="mb-2"><strong>Category:</strong> {selectedProduct.category}</p>
            <p className="mb-2"><strong>Price:</strong> {selectedProduct.price}</p>
            <p className="mb-2"><strong>Stock:</strong> {selectedProduct.stock}</p>
            <p className="mb-2"><strong>Type:</strong> {selectedProduct.type}</p>
            <p className="mb-4"><strong>Description:</strong> {selectedProduct.description}</p>

            {/* Additional Detail Images */}
            {selectedProduct.detailImages && selectedProduct.detailImages.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold">More Images:</h4>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.detailImages.map((img, index) => (
                    <img key={index} src={img} alt={`Detail ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
                  ))}
                </div>
              </div>
            )}

            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-4 bg-[#EA3C3C] text-white px-4 py-2 rounded-lg w-full hover:bg-gray-700 transition"
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
