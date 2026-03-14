import React, { useEffect, useState } from "react";
import api from "../config/Api";

const Packages = () => {

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState({});

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {

    try {

      const res = await api.get("/api/packages/verified");

      setPackages(res.data);

    } catch (err) {

      console.error(err);

    }

    setLoading(false);

  };

  const nextImage = (id, length) => {

    setImageIndex(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) + 1) % length
    }));

  };

  const prevImage = (id, length) => {

    setImageIndex(prev => ({
      ...prev,
      [id]: ((prev[id] || 0) - 1 + length) % length
    }));

  };

  if (loading) {

    return (
      <div className="flex justify-center items-center h-screen">
        Loading packages...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Verified Tour Packages
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {packages.map(pkg => {

            const index = imageIndex[pkg.packageId] || 0;

            return (

              <div
                key={pkg.packageId}
                className="bg-white rounded-xl shadow overflow-hidden"
              >

                {pkg.packageImages && pkg.packageImages.length > 0 && (

                  <div className="relative">

                    <img
                      src={pkg.packageImages[index]}
                      alt="package"
                      className="h-56 w-full object-cover"
                    />

                    {pkg.packageImages.length > 1 && (

                      <>

                        <button
                          onClick={() => prevImage(pkg.packageId, pkg.packageImages.length)}
                          className="absolute left-2 top-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                        >
                          ◀
                        </button>

                        <button
                          onClick={() => nextImage(pkg.packageId, pkg.packageImages.length)}
                          className="absolute right-2 top-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded"
                        >
                          ▶
                        </button>

                      </>

                    )}

                  </div>

                )}

                <div className="p-4 space-y-2">

                  <h2 className="text-lg font-bold">
                    {pkg.packageTitle}
                  </h2>

                  <p className="text-gray-600 text-sm">
                    {pkg.description}
                  </p>

                  <p className="text-sm">
                    📍 Location: {pkg.location}
                  </p>

                  <p className="text-sm">
                    💰 Price: ₹{pkg.price}
                  </p>

                  <p className="text-sm">
                    👥 Max People: {pkg.maxPeople}
                  </p>

                  <p className="text-sm">
                    🕒 Duration: {pkg.durationDays} days
                  </p>

                  <p className="text-sm">
                    🚩 Start: {pkg.startLocation}
                  </p>

                  <p className="text-sm">
                    🏁 End: {pkg.endLocation}
                  </p>

                  <p className="text-sm">
                    ⚡ Difficulty: {pkg.difficultyLevel}
                  </p>

                  <p className="text-sm">
                    🍽 Food Included: {pkg.foodIncluded ? "Yes" : "No"}
                  </p>

                  <p className="text-sm">
                    🚌 Transport Included: {pkg.transportIncluded ? "Yes" : "No"}
                  </p>

                  <p className="text-sm">
                    ⭐ Rating: {pkg.rating}
                  </p>

                  <p className="text-sm">
                    📦 Total Bookings: {pkg.totalBookings}
                  </p>

                  <p className="text-sm">
                    📌 Status: 
                    <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded text-xs">
                      {pkg.status}
                    </span>
                  </p>


                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );

};

export default Packages;
