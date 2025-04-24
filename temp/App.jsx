import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Layout from "./routes/layout";
import Page from "./routes/dashboard/page";
import AddProduct from "./routes/dashboard/AddPro";
import Ord from "./routes/dashboard/ord";
import Products from "./routes/dashboard/Products";
import TaskManager from "./routes/dashboard/Task";

function App() {
    const [products, setProducts] = useState([]);
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Page />} />
                    <Route 
                        path="TasksManager" 
                        element={<TaskManager />} 
                    />
                    <Route 
                        path="Orders" 
                        element={<Ord />} 
                    />
                    <Route 
                        path="products" 
                        element={<Products products={products} setProducts={setProducts} />} 
                    />
                    <Route 
                        path="new-product" 
                        element={
                            <AddProduct 
                                addProduct={(newProduct) => 
                                    setProducts((prev) => [...prev, newProduct])
                                }
                            />
                        } 
                    />
                    <Route 
                        path="logout" 
                        element={<h1 className="title">Log Out</h1>} 
                    />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
