import React, { useEffect, useState } from "react";
import api from "../config/Api";
import { useNavigate } from "react-router-dom";

const OrdersDetails = () => {

  const navigate = useNavigate();

  const userId = localStorage.getItem("userid");
  const username = localStorage.getItem("username");

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // ================= FETCH USER ORDERS =================
  const fetchOrders = async () => {
    try {
      const res = await api.get(`/api/orders/user/${userId}`);
      setOrders(res.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId) {
      navigate("/"); // redirect if not logged in
    } else {
      fetchOrders();
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="p-10 text-lg font-semibold">
        Loading orders...
      </div>
    );
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        {username ? `${username}'s Orders` : "My Orders"}
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-lg">
          You have not placed any orders yet.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {orders.map((order) => (
            <div key={order.id} className="border p-5 rounded shadow">

              {order.productImage && (
                <img
                  src={order.productImage}
                  alt={order.productName}
                  className="h-40 w-full object-cover mb-3 rounded"
                />
              )}

              <h3 className="font-bold text-lg">
                {order.productName}
              </h3>

              <p className="text-gray-600">
                Warehouse: {order.warehouseName}
              </p>

              <p className="text-gray-600">
                City: {order.city}
              </p>

              <p className="mt-2">
                Quantity: {order.quantity}
              </p>

              <p>
                Total Price: ₹ {order.totalPrice}
              </p>

              <p className="mt-2 font-semibold text-blue-600">
                Status: {order.status}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Ordered On:{" "}
                {order.createdAt
                  ? new Date(order.createdAt).toLocaleString()
                  : "N/A"}
              </p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default OrdersDetails;