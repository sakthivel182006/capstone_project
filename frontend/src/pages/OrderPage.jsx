import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../config/Api";

const OrderPage = () => {

  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");

  const [product, setProduct] = useState(null);
  const [inventories, setInventories] = useState([]);
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);

  const getUserLocation = () => {

    navigator.geolocation.getCurrentPosition(async (position) => {

      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
      );

      const data = await res.json();
      const address = data.address;

      const userLocation = {
        city:
          address.city ||
          address.town ||
          address.village ||
          address.county ||
          address.state_district ||
          address.municipality ||
          "Unknown",
        state: address.state,
        country: address.country,
        address: data.display_name,
        pincode: address.postcode
      };

      setLocation(userLocation);

      fetchWarehousesByLocation(userLocation.city);

    });

  };

  const fetchWarehousesByLocation = async (cityName) => {

    try {

      const res = await api.get(
        `/api/warehouse-inventory/product/location`,
        {
          params: {
            productId: productId,
            city: cityName
          }
        }
      );

      setInventories(res.data);

    } catch (error) {
      console.error(error);
    }

  };

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/api/products/${productId}`);
      setProduct(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleBook = async () => {

    const userId = localStorage.getItem("userid");
    const username = localStorage.getItem("username");

    if (!userId) {
      alert("Please login first");
      return;
    }

    if (!selectedWarehouse) {
      alert("Please select a warehouse");
      return;
    }

    try {

      setLoading(true);

      await api.post("/api/warehouse-inventory/book", null, {
        params: {
          warehouseId: selectedWarehouse,
          productId: productId,
          quantity: 1
        }
      });

      await api.post("/api/orders/place", null, {
        params: {
          userId: userId,
          username: username,
          productId: productId,
          warehouseId: selectedWarehouse,
          quantity: 0,
        }
      });

      alert("Order placed successfully");

    } catch (error) {

      console.error("Order failed:", error);
      alert("Order failed");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="p-10">

      <button
        onClick={getUserLocation}
        className="mb-6 bg-green-600 text-white px-6 py-3 rounded"
      >
        Click here to access your location
      </button>

      {location && (
        <div className="mb-6 border p-4 rounded bg-gray-50">
          <p><strong>City:</strong> {location.city}</p>
          <p><strong>State:</strong> {location.state}</p>
          <p><strong>Country:</strong> {location.country}</p>
          <p><strong>Address:</strong> {location.address}</p>
          <p><strong>Pincode:</strong> {location.pincode}</p>
        </div>
      )}

      {product && (
        <div className="mb-10 border p-6 rounded shadow">

          {product.imageUrls?.length > 0 && (
            <img
              src={product.imageUrls[0]}
              alt={product.name}
              className="h-48 w-full object-cover mb-4 rounded"
            />
          )}

          <h2 className="text-2xl font-bold">{product.name}</h2>
          <p className="text-gray-600">{product.brand}</p>
          <p className="mt-2 text-lg">₹ {product.finalPrice}</p>

        </div>
      )}

      <h3 className="text-xl font-semibold mb-6">
        Available Warehouses
      </h3>

      <div className="grid grid-cols-2 gap-6">

        {inventories.map((inv) => {

          const deliveryDays =
            inv.productLoadPercentage < 30
              ? 2
              : inv.productLoadPercentage < 60
              ? 4
              : 6;

          return (
            <div
              key={inv.id}
              onClick={() => setSelectedWarehouse(inv.warehouseId)}
              className={`border p-5 rounded shadow cursor-pointer transition ${
                selectedWarehouse === inv.warehouseId
                  ? "border-green-600 bg-green-50"
                  : "hover:shadow-lg"
              }`}
            >

              <h4 className="text-lg font-bold mb-2">
                {inv.warehouseName}
              </h4>

              <p><strong>City:</strong> {inv.city}</p>
              <p><strong>State:</strong> {inv.state}</p>
              <p><strong>Country:</strong> {inv.country}</p>
              <p><strong>Address:</strong> {inv.address}</p>
              <p><strong>Pincode:</strong> {inv.pincode}</p>

              <hr className="my-3" />

              <p><strong>Total Capacity:</strong> {inv.totalCapacity}</p>
              <p><strong>Used Capacity:</strong> {inv.usedCapacity}</p>
              <p><strong>Available Capacity:</strong> {inv.availableCapacity}</p>
              <p><strong>Warehouse Load:</strong> {inv.loadPercentage?.toFixed(2)}%</p>

              <hr className="my-3" />

              <p><strong>Product Total Stock:</strong> {inv.totalStock}</p>
              <p><strong>Booked Stock:</strong> {inv.bookedStock}</p>
              <p><strong>Available Stock:</strong> {inv.availableStock}</p>
              <p><strong>Product Load:</strong> {inv.productLoadPercentage?.toFixed(2)}%</p>

              <hr className="my-3" />

              <p><strong>Manager:</strong> {inv.managerName}</p>

              <p className="mt-2 text-blue-600 font-semibold">
                Estimated Delivery: {deliveryDays} days
              </p>

            </div>
          );
        })}

      </div>

      <button
        onClick={handleBook}
        disabled={loading}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded"
      >
        {loading ? "Processing..." : "Confirm Order"}
      </button>

    </div>
  );
};

export default OrderPage;