import {createBrowserRouter,RouterProvider} from "react-router-dom";
import React from "react";
import { useState } from "react";
import Layout from "./routes/layout";
import Page from "./routes/dashboard/page"

import AddProduct from "./routes/dashboard/AddPro";
import Ord from "./routes/dashboard/ord";
import Products from "./routes/dashboard/Products";
import TaskManager from "./routes/dashboard/Task";

function App() {
    const [products, setProducts] = useState([
        
      ]);
    
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Page />,
                },
                
                {
                    path: "TasksManager",
                    element: <TaskManager/>,
                },
                {
                    path: "Orders",
                    element: <Ord/>,
                },
                {
                    path: "products",
                    element: <Products products={products} setProducts={setProducts}/>
                },
               
               
                {
                    path: "new-product",
                    element: <AddProduct addProduct={(newProduct) => setProducts((prev) => [...prev, newProduct])}/>
                },
                
                
                {
                    path: "logout",
                    element: <h1 className="title">Log Out</h1>,
                },
            ],
        },
    ]);

    return (
      <>
      
       <RouterProvider router={router} />
      </>
    );
}

export default App;
