// import { useState } from "react";
// import AddProduct from "./AddPro";
// import Products from "./Products";
// import Nvidia from "../../assets/NVIDIA";
// import Samsung from "../../assets/samsung";
// const AddProFunc = () => {
//   const [products, setProducts] = useState([
//     {
//       id: 1,
//       name: "RTX 4070 Ti",
//       category: "Desktop Components",
//       price: "$799",
//       image: Nvidia,
//       description: "Powerful NVIDIA RTX 4070 Ti for next-gen gaming.",
//     },
//     {
//       id: 2,
//       name: "Samsung 27” Monitor",
//       category: "Monitors",
//       price: "$299",
//       image: Samsung,
//       description: "4K UHD Samsung monitor with HDR support.",
//     },
//   ]);

//   // Function to add a new product
//   const addProduct = (product) => {
//     setProducts((prevProducts) => [
//       ...prevProducts,
//       { ...product, id: prevProducts.length + 1 },
//     ]);
//   };

//   return (
//     <div>
//       <AddProduct addProduct={addProduct} />
//       <Products products={products} setProducts={setProducts} />
//     </div>
//   );
// };

// export default AddProFunc;



import { useState, useEffect } from "react";
import AddProduct from "./AddPro";
import Products from "./Products";
import Nvidia from "../../assets/NVIDIA";
import Samsung from "../../assets/samsung";

const AddProFunc = () => {
  // Load products from localStorage or use default ones
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [
      {
        id: 1,
        name: "RTX 4070 Ti",
        category: "Desktop Components",
        price: "$799",
        image: Nvidia,
        description: "Powerful NVIDIA RTX 4070 Ti for next-gen gaming.",
      },
      {
        id: 2,
        name: "Samsung 27” Monitor",
        category: "Monitors",
        price: "$299",
        image: Samsung,
        description: "4K UHD Samsung monitor with HDR support.",
      },
    ];
  });

  // Save products to localStorage whenever products change
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // Function to add a new product
  const addProduct = (product) => {
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts, { ...product, id: prevProducts.length + 1 }];
      localStorage.setItem("products", JSON.stringify(newProducts)); // Save instantly
      return newProducts;
    });
  };

  return (
    <div>
      <AddProduct addProduct={addProduct} />
      <Products products={products} setProducts={setProducts} />
    </div>
  );
};

export default AddProFunc;
