import { useState } from "react";
import { Trash2 } from "lucide-react"; // Importing Lucide trash icon

const Orders = () => {
  const [orders, setOrders] = useState([
    {
      number: 1,
      customerName: "matoub lounes",
      wilaya: "Algiers",
      commune: "Bab Ezzouar",
      phone: "+213 556 78 90 12",
      email: "matoub244@gmail.com",
      status: "Pending",
      total: "$1200",
      items: [
        { name: "RTX 3070", quantity: 1, price: "$600" },
        { name: "Corsair RAM 16GB", quantity: 2, price: "$300" },
      ],
    },
    {
      number: 2,
      customerName: "Ait menguellet",
      wilaya: "Oran",
      commune: "Aokas",
      phone: "+213 661 23 45 67",
      email: "justinBiber@gmail.com",
      status: "Pending",
      total: "$850",
      items: [
        { name: "i7 12700K", quantity: 1, price: "$350" },
        { name: "MSI Motherboard", quantity: 1, price: "$500" },
      ],
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (number, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.number === number ? { ...order, status: newStatus } : order
      )
    );
  };

  const markAsDelivered = (number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.number === number ? { ...order, status: "Delivered" } : order
      )
    );
  };

  const deleteOrder = (number) => {
    setOrders((prevOrders) => prevOrders.filter((order) => order.number !== number));
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-black mb-6 text-center">Orders</h2>

      {/* Modern Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#EA3C3C] text-white">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Wilaya</th>
              <th className="p-4">Commune</th>
              <th className="p-4">Status</th>
              <th className="p-4">Total</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr
                key={order.number}
                className={`border-b hover:bg-gray-100 transition ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="p-4 text-center font-semibold">{order.number}</td>
                <td className="p-4">{order.customerName}</td>
                <td className="p-4">{order.wilaya}</td>
                <td className="p-4">{order.commune}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.number, e.target.value)}
                    className="p-2 border rounded-lg"
                  >
                   
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Canceled">Canceled</option>
                  </select>
                </td>
                <td className="p-4 font-semibold text-[#EA3C3C]">{order.total}</td>
                <td className="p-4 flex gap-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="bg-[#EA3C3C] text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                  >
                    View
                  </button>
                  {order.status !== "Delivered" && (
                    <button
                      onClick={() => markAsDelivered(order.number)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
                    >
                      ✔
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(order.number)}
                    className="bg-gray-500 text-white p-2 rounded-lg shadow-md hover:bg-gray-700 transition flex items-center"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Order Details Pop-up with Blurred Background */}
      {selectedOrder && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-30 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4 text-[#EA3C3C]">Order Details</h3>
            <p className="mb-2"><strong>Customer:</strong> {selectedOrder.customerName}</p>
            <p className="mb-2"><strong>Wilaya:</strong> {selectedOrder.wilaya}</p>
            <p className="mb-2"><strong>Commune:</strong> {selectedOrder.commune}</p>
            <p className="mb-2"><strong>Phone:</strong> {selectedOrder.phone}</p>
            <p className="mb-2"><strong>Email:</strong> {selectedOrder.email}</p>
            <p className="mb-2"><strong>Total:</strong> {selectedOrder.total}</p>
            <h4 className="font-semibold mt-4 mb-2">Items:</h4>
            <ul className="list-disc ml-5">
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.quantity} x {item.price}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-[#EA3C3C] text-white px-4 py-2 rounded-lg w-full hover:bg-[#ea3c3cb1] transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
