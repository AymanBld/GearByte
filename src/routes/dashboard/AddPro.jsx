// import { useState } from "react";
// import { Upload, X } from "lucide-react";

// const AddProduct = () => {
//   const [product, setProduct] = useState({
//     name: "",
//     type: "sell",
//     category: "desktop",
//     price: "",
//     stock: "",
//     description: "",
//     mainImage: null,
//     detailImages: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMainImageChange = (e) => {
//     setProduct((prev) => ({ ...prev, mainImage: e.target.files[0] }));
//   };

//   const handleDetailImagesChange = (e) => {
//     setProduct((prev) => ({
//       ...prev,
//       detailImages: [...prev.detailImages, ...Array.from(e.target.files)],
//     }));
//   };

//   const handleRemoveDetailImage = (index) => {
//     setProduct((prev) => ({
//       ...prev,
//       detailImages: prev.detailImages.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Product submitted:", product); // dayiiiiiiii
//     setProduct({
//       name: "",
//       type: "sell",
//       category: "desktop",
//       price: "",
//       stock: "",
//       description: "",
//       mainImage: null,
//       detailImages: [],
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-black mb-6 text-center">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
        
        
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
//           <input
//             type="text"
//             name="name"
//             value={product.name}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg text-lg"
//             required
//           />
//         </div>

        
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Type</label>
//             <select
//               name="type"
//               value={product.type}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg text-lg"
//             >
//               <option value="sell">For Sale</option>
//               <option value="rent">For Rent</option>
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Category</label>
//             <select
//               name="category"
//               value={product.category}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg text-lg"
//             >
//               <option value="desktop">Desktop Components</option>
//               <option value="monitors">Monitors</option>
//               <option value="accessories">Accessories</option>
//             </select>
//           </div>
//         </div>

       
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Price</label>
//             <input
//               type="number"
//               name="price"
//               value={product.price}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg text-lg"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Stock Quantity</label>
//             <input
//               type="number"
//               name="stock"
//               value={product.stock}
//               onChange={handleChange}
//               className="w-full p-3 border rounded-lg text-lg"
//               required
//             />
//           </div>
//         </div>

        
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Description</label>
//           <textarea
//             name="description"
//             value={product.description}
//             onChange={handleChange}
//             className="w-full p-3 border rounded-lg text-lg"
//             rows="3"
//           />
//         </div>

        
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Main Product Image</label>
//           <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer">
//             <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
//             <Upload className="mx-auto text-gray-500" size={28} />
//             <span className="text-gray-600 text-lg">Upload Main Image</span>
//           </label>
//           {product.mainImage && (
//             <div className="mt-2 text-gray-700 text-sm">{product.mainImage.name}</div>
//           )}
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Detail Images</label>
//           <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer">
//             <input type="file" accept="image/*" multiple onChange={handleDetailImagesChange} className="hidden" />
//             <Upload className="mx-auto text-gray-500" size={28} />
//             <span className="text-gray-600 text-lg">Upload Detail Images</span>
//           </label>

         
//           <div className="flex flex-wrap gap-3 mt-3">
//             {product.detailImages.map((image, index) => (
//               <div key={index} className="relative w-20 h-20 border rounded-lg overflow-hidden">
//                 <img src={URL.createObjectURL(image)} alt="Detail" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
//                   onClick={() => handleRemoveDetailImage(index)}
//                 >
//                   <X size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

      
//         <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg text-lg font-semibold">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
















// import { useState } from "react";
// import { Upload, X } from "lucide-react";

// const AddProduct = ({ addProduct }) => {
//   const [product, setProduct] = useState({
//     name: "",
//     type: "sell",
//     category: "desktop",
//     price: "",
//     stock: "",
//     description: "",
//     mainImage: null,
//     detailImages: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMainImageChange = (e) => {
//     setProduct((prev) => ({ ...prev, mainImage: e.target.files[0] }));
//   };

//   const handleDetailImagesChange = (e) => {
//     setProduct((prev) => ({
//       ...prev,
//       detailImages: [...prev.detailImages, ...Array.from(e.target.files)],
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProduct = {
//       ...product,
//       image: product.mainImage ? URL.createObjectURL(product.mainImage) : null,
//     };

//     addProduct(newProduct); // Add to global state

//     setProduct({
//       name: "",
//       type: "sell",
//       category: "desktop",
//       price: "",
//       stock: "",
//       description: "",
//       mainImage: null,
//       detailImages: [],
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-black mb-6 text-center">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
//         </div>

//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block font-semibold text-gray-700 mb-1">Category</label>
//             <select name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
//               <option value="desktop">Desktop Components</option>
//               <option value="monitors">Monitors</option>
//               <option value="accessories">Accessories</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Description</label>
//           <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" rows="3" />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Main Product Image</label>
//           <input type="file" accept="image/*" onChange={handleMainImageChange} className="w-full p-3 border rounded-lg text-lg" />
//         </div>

//         <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg text-lg font-semibold">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;








// import { useState } from "react";
// import { Upload, X } from "lucide-react";

// const AddProduct = ({ addProduct }) => {
//   const [product, setProduct] = useState({
//     name: "",
//     category: "desktop",
//     price: "",
//     stock: "",
//     description: "",
//     mainImage: null,
//     detailImages: [],
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleMainImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProduct((prev) => ({ ...prev, mainImage: file }));
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!product.name || !product.price) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     const newProduct = {
//       ...product,
//       image: product.mainImage ? URL.createObjectURL(product.mainImage) : null,
//     };

//     addProduct(newProduct); // ✅ Now it adds to the products list

//     setProduct({
//       name: "",
//       category: "desktop",
//       price: "",
//       stock: "",
//       description: "",
//       mainImage: null,
//       detailImages: [],
//     });

//     alert("Product added successfully!");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold text-black mb-6 text-center">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
//           <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Category</label>
//           <select name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
//             <option value="desktop">Desktop Components</option>
//             <option value="monitors">Monitors</option>
//             <option value="accessories">Accessories</option>
//           </select>
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Price ($)</label>
//           <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
//         </div>

//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Product Description</label>
//           <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" rows="3" />
//         </div>

//         {/* Main Image Upload */}
//         <div>
//           <label className="block font-semibold text-gray-700 mb-1">Main Product Image</label>
//           <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer">
//             <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
//             <Upload className="mx-auto text-gray-500" size={28} />
//             <span className="text-gray-600 text-lg">Upload Main Image</span>
//           </label>
//         </div>

//         <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg text-lg font-semibold">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;



import React, { useState } from "react";
import { Upload } from "lucide-react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    type: "sell",
    category: "desktop",
    price: "",
    stock: "",
    description: "",
    mainImage: null,
    detailImages: [],
  });

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // Handle main image upload
  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, mainImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle multiple detail images
  const handleDetailImagesChange = (e) => {
    const files = Array.from(e.target.files);
    const readers = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(readers).then((images) => {
      setProduct((prev) => ({ ...prev, detailImages: [...prev.detailImages, ...images] }));
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Generate unique ID
    const newProduct = { ...product, id: Date.now(), image: product.mainImage };

    // Get previous products from localStorage
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];

    // Update localStorage
    const updatedProducts = [...storedProducts, newProduct];
    localStorage.setItem("products", JSON.stringify(updatedProducts));

    // Reset form
    setProduct({
      name: "",
      type: "sell",
      category: "desktop",
      price: "",
      stock: "",
      description: "",
      mainImage: null,
      detailImages: [],
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-black mb-6 text-center">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
        </div>

        {/* Category */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category</label>
          <select name="category" value={product.category} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
            <option value="desktop">Desktop Components</option>
            <option value="monitors">Monitors</option>
            <option value="accessories">Accessories</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Type</label>
          <select name="type" value={product.type} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg">
            <option value="sell">Sell</option>
            <option value="rent">Rent</option>
          </select>
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Price</label>
            <input type="number" name="price" value={product.price} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
          </div>
          <div>
            <label className="block font-semibold text-gray-700 mb-1">Stock</label>
            <input type="number" name="stock" value={product.stock} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" required />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Description</label>
          <textarea name="description" value={product.description} onChange={handleChange} className="w-full p-3 border rounded-lg text-lg" rows="3" required />
        </div>

        {/* Main Image */}
        <div>
         <label className="block font-semibold text-gray-700 mb-1">Main Product Image</label>
         <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer">
           <input type="file" accept="image/*" onChange={handleMainImageChange} className="hidden" />
           <Upload className="mx-auto text-gray-500" size={28} />
           <span className="text-gray-600 text-lg">Upload Main Image</span>
           {product.mainImage && <img src={product.mainImage} alt="Main Product" className="w-full h-40 object-cover rounded-lg mt-2" />}
         </label>
       </div>
        

        {/* Detail Images */}
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Detail Images</label>
          <label className="block w-full p-6 border-2 border-dashed rounded-lg text-center cursor-pointer">
          <input type="file" accept="image/*" multiple onChange={handleDetailImagesChange} className="hidden" />
          
          <Upload className="mx-auto text-gray-500" size={28} />
          <span className="text-gray-600 text-lg">Upload Detail Images</span>
            {product.detailImages.map((img, index) => (
              <img key={index} src={img} alt={`Detail ${index + 1}`} className="w-20 h-20 object-cover rounded-lg" />
            ))}
          
          </label>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full p-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-amber-700">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;


