import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const LocalGuiders = () => {

  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
    location: "",
    localGuideDetails: ""
  });

  const [photo, setPhoto] = useState(null);
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchGuiders();
  }, []);

  const fetchGuiders = async () => {
    try {
      const res = await api.get("/api/guiders");
      setGuiders(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handlePhoto = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleDocuments = (e) => {
    setDocuments(Array.from(e.target.files));
  };

  const createGuider = async (e) => {

    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();

    data.append("name", form.name);
    data.append("email", form.email);
    data.append("password", form.password);
    data.append("phoneNumber", form.phoneNumber);
    data.append("address", form.address);
    data.append("location", form.location);
    data.append("localGuideDetails", form.localGuideDetails);

    if (photo) {
      data.append("guiderPhoto", photo);
    }

    documents.forEach((doc) => {
      data.append("documents", doc);
    });

    try {

      await api.post("/api/guiders/create", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage("Guider created successfully");

      setForm({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        address: "",
        location: "",
        localGuideDetails: ""
      });

      setPhoto(null);
      setDocuments([]);

      fetchGuiders();

    } catch (err) {

      setMessage("Error creating guider");

    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {

    try {

      await api.put(`/api/guiders/${id}/status`, {
        status: status
      });

      fetchGuiders();

    } catch (error) {

      console.error(error);

    }

  };

  const statusColor = (status) => {

    switch (status) {
      case "VERIFIED":
        return "bg-green-200 text-green-700";
      case "UNAVAILABLE":
        return "bg-orange-200 text-orange-700";
      case "BLOCKED":
        return "bg-red-200 text-red-700";
      default:
        return "bg-yellow-200 text-yellow-700";
    }

  };

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold text-center mb-8">
        Local Guider Management
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-md max-w-2xl mx-auto">

        <h2 className="text-xl font-semibold mb-4">
          Create Guider
        </h2>

        <form onSubmit={createGuider} className="space-y-4">

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="phoneNumber"
            placeholder="Phone Number"
            value={form.phoneNumber}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="localGuideDetails"
            placeholder="Guide Details"
            value={form.localGuideDetails}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <label className="font-semibold">
              Guider Photo
            </label>

            <input
              type="file"
              onChange={handlePhoto}
              required
            />
          </div>

          <div>
            <label className="font-semibold">
              Upload Documents (PDF)
            </label>

            <input
              type="file"
              multiple
              onChange={handleDocuments}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Uploading..." : "Create Guider"}
          </button>

        </form>

        {message && (
          <p className="text-green-600 mt-4">
            {message}
          </p>
        )}

      </div>

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6 text-center">
          All Guiders
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {guiders.map((g) => (

            <div
              key={g.guiderId}
              className="bg-white p-5 rounded-xl shadow-md"
            >

              <img
                src={g.guiderImage}
                alt="guider"
                className="w-full h-40 object-cover rounded mb-3"
              />

              <h3 className="font-semibold text-lg">
                {g.name}
              </h3>

              <p className="text-sm">
                <b>Email:</b> {g.email}
              </p>

              <p className="text-sm">
                <b>Phone:</b> {g.phoneNumber}
              </p>

              <p className="text-sm">
                <b>Location:</b> {g.location}
              </p>

              <p className="text-sm mb-3">
                <b>Status:</b>

                <span className={`ml-2 px-2 py-1 text-xs rounded ${statusColor(g.status)}`}>
                  {g.status}
                </span>

              </p>

              <div className="mb-4">

                <p className="font-semibold text-sm">
                  Documents
                </p>

                <ul className="list-disc ml-5 text-blue-600">

                  {g.documents.map((doc, i) => (
                    <li key={i}>
                      <a
                        href={doc}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        View Document
                      </a>
                    </li>
                  ))}

                </ul>

              </div>

              <div className="grid grid-cols-2 gap-2">

                <button
                  onClick={() => updateStatus(g.guiderId, "VERIFIED")}
                  className="bg-green-500 text-white py-1 rounded hover:bg-green-600"
                >
                  Verified
                </button>

                <button
                  onClick={() => updateStatus(g.guiderId, "UNAVAILABLE")}
                  className="bg-orange-500 text-white py-1 rounded hover:bg-orange-600"
                >
                  Unavailable
                </button>

                <button
                  onClick={() => updateStatus(g.guiderId, "BLOCKED")}
                  className="bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Block
                </button>

                <button
                  onClick={() => updateStatus(g.guiderId, "UNVERIFIED")}
                  className="bg-yellow-500 text-white py-1 rounded hover:bg-yellow-600"
                >
                  Unverify
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );

};

export default LocalGuiders;