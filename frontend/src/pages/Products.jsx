import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/Api";

const Products = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Available Products</h1>

      <div className="grid grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded shadow">

            {product.imageUrls?.length > 0 && (
              <img
                src={product.imageUrls[0]}
                alt={product.name}
                className="h-40 w-full object-cover mb-3 rounded"
              />
            )}

            <h3 className="font-bold text-lg">{product.name}</h3>
            <p className="text-gray-600">{product.brand}</p>

            <p className="mt-2">
              ₹ {product.finalPrice}
              <span className="line-through text-gray-400 ml-2">
                ₹ {product.price}
              </span>
            </p>

            <button
              onClick={() => navigate(`/order?productId=${product.id}`)}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Order Now
            </button>

          </div>
        ))}
      </div>

    </div>
  );
};

export default Products;