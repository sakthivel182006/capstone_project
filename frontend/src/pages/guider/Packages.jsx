import React, { useEffect, useState } from "react";
import api from "../../config/Api";

const Packages = () => {

  const guiderId = localStorage.getItem("userid");

  const [packages, setPackages] = useState([]);
  const [images, setImages] = useState([]);
  const [preview, setPreview] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    packageTitle: "",
    description: "",
    location: "",
    price: "",
    maxPeople: "",
    durationDays: "",
    startLocation: "",
    endLocation: "",
    difficultyLevel: "",
    foodIncluded: false,
    transportIncluded: false
  });

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {

    try {

      const res = await api.get(`/api/packages/guider/${guiderId}`);
      setPackages(res.data);

    } catch (err) {
      console.error(err);
    }

  };

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value
    });

  };

  const handleImages = (e) => {

    const files = Array.from(e.target.files);

    if (files.length < 2) {
      alert("Minimum 2 images required");
      return;
    }

    if (files.length > 7) {
      alert("Maximum 7 images allowed");
      return;
    }

    setImages(files);

    const previews = files.map(file => URL.createObjectURL(file));
    setPreview(previews);

  };

  const resetForm = () => {

    setEditingId(null);
    setImages([]);
    setPreview([]);

    setForm({
      packageTitle: "",
      description: "",
      location: "",
      price: "",
      maxPeople: "",
      durationDays: "",
      startLocation: "",
      endLocation: "",
      difficultyLevel: "",
      foodIncluded: false,
      transportIncluded: false
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!editingId && images.length < 2) {
      alert("Upload minimum 2 images");
      return;
    }

    setLoading(true);

    const formData = new FormData();

    formData.append("guiderId", guiderId);
    formData.append("packageTitle", form.packageTitle);
    formData.append("description", form.description);
    formData.append("location", form.location);
    formData.append("price", form.price);
    formData.append("maxPeople", form.maxPeople);
    formData.append("durationDays", form.durationDays);
    formData.append("startLocation", form.startLocation);
    formData.append("endLocation", form.endLocation);
    formData.append("difficultyLevel", form.difficultyLevel);

    formData.append("foodIncluded", form.foodIncluded);
    formData.append("transportIncluded", form.transportIncluded);

    images.forEach(img => {
      formData.append("images", img);
    });

    try {

      if (editingId) {

        await api.put(`/api/packages/${editingId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

      } else {

        await api.post(`/api/packages/create`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });

      }

      resetForm();
      fetchPackages();

    } catch (err) {

      console.error(err);

    }

    setLoading(false);

  };

  const handleEdit = (pkg) => {

    setEditingId(pkg.packageId);

    setForm({
      packageTitle: pkg.packageTitle,
      description: pkg.description,
      location: pkg.location,
      price: pkg.price,
      maxPeople: pkg.maxPeople,
      durationDays: pkg.durationDays,
      startLocation: pkg.startLocation,
      endLocation: pkg.endLocation,
      difficultyLevel: pkg.difficultyLevel,
      foodIncluded: pkg.foodIncluded,
      transportIncluded: pkg.transportIncluded
    });

    setPreview(pkg.packageImages);

  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this package?")) return;

    try {

      await api.delete(`/api/packages/${id}`);
      fetchPackages();

    } catch (err) {
      console.error(err);
    }

  };

  return (

    <div className="p-8">

      <h1 className="text-3xl font-bold mb-6">
        Manage Packages
      </h1>

      {/* FORM */}

      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mb-10">

        <input name="packageTitle" placeholder="Package Title" value={form.packageTitle} onChange={handleChange} required />

        <input name="location" placeholder="Location" value={form.location} onChange={handleChange} />

        <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} />

        <input name="maxPeople" type="number" placeholder="Max People" value={form.maxPeople} onChange={handleChange} />

        <input name="durationDays" type="number" placeholder="Duration Days" value={form.durationDays} onChange={handleChange} />

        <input name="difficultyLevel" placeholder="Difficulty Level" value={form.difficultyLevel} onChange={handleChange} />

        <input name="startLocation" placeholder="Start Location" value={form.startLocation} onChange={handleChange} />

        <input name="endLocation" placeholder="End Location" value={form.endLocation} onChange={handleChange} />

        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="col-span-2"
        />

        {/* IMAGE UPLOAD */}

        <div className="col-span-2">
          <input type="file" multiple accept="image/*" onChange={handleImages}/>
        </div>

        {/* IMAGE PREVIEW */}

        <div className="col-span-2 flex gap-3 flex-wrap">

          {preview.map((img, index) => (

            <img
              key={index}
              src={img}
              alt="preview"
              className="w-24 h-24 object-cover rounded"
            />

          ))}

        </div>

        <button className="bg-blue-600 text-white p-2 rounded col-span-2">

          {loading ? "Saving..." : editingId ? "Update Package" : "Create Package"}

        </button>

      </form>

      {/* PACKAGE LIST */}

      <div className="grid grid-cols-3 gap-6">

        {packages.map(pkg => (

          <div key={pkg.packageId} className="border rounded-lg overflow-hidden shadow">

            {pkg.packageImages?.length > 0 && (

              <img
                src={pkg.packageImages[0]}
                alt="package"
                className="h-48 w-full object-cover"
              />

            )}

            <div className="p-4">

              <h2 className="font-bold">{pkg.packageTitle}</h2>

              <p className="text-sm text-gray-500">
                {pkg.description}
              </p>

              <p className="mt-2">📍 {pkg.location}</p>
              <p>💰 ₹{pkg.price}</p>
              <p>🕒 {pkg.durationDays} days</p>

              <div className="flex gap-3 mt-3">

                <button
                  onClick={() => handleEdit(pkg)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(pkg.packageId)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>

  );
};

export default Packages;
