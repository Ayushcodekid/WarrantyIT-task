// src/components/ProductForm.tsx
import React, { useState } from "react";
import { createProduct } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface ProductFormData {
  productName: string;
  brand: string;
  type: string;
  warrantyPeriod: number;
  startDate: string;
}

const ProductForm = () => {
  const [form, setForm] = useState<ProductFormData>({
    productName: "",
    brand: "",
    type: "",
    warrantyPeriod: 0,
    startDate: "",
  });
  const navigate = useNavigate();

  const { user } = useAuth() as any; // Get current user from context
  console.log(user);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.productName) newErrors.productName = "Product Name is required";
    if (!form.brand) newErrors.brand = "Brand is required";
    if (!form.type) newErrors.type = "Type is required";
    if (!form.startDate) newErrors.startDate = "Start Date is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Map form fields to API payload
      const payload = {
        name: form.productName,
        brand: form.brand,
        type: form.type,
        warrantyPeriod: Number(form.warrantyPeriod),
        startDate: form.startDate,
        userId: user?.id, // pass current user's ID
      };

      await createProduct(payload);
      alert("Product created successfully!");

      // Reset form
      setForm({
        productName: "",
        brand: "",
        type: "",
        warrantyPeriod: 0,
        startDate: "",
      });
      setErrors({});
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.message || "Failed to create product");
    } finally {
    }
  };

  return (
    <div className="min-h-screen bg-hero flex flex-col">
      <div className="min-h-screen flex items-center justify-center p-4 w-full mt-[-40px]">
        <div className="w-full max-w-lg">
          <button
            onClick={() => navigate("/landing")} // goes back to previous page
            className="mb-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            ← Back
          </button>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-lg bg-gray-900 text-white p-8 rounded-xl shadow-lg"
          >
            <h1 className="text-3xl font-bold text-center mb-6">
              Add Product Details
            </h1>

            {/* Product Name */}
            <label className="block mb-2 font-medium">Product Name</label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
              placeholder="Enter product name"
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.productName && (
              <p className="text-red-500 text-sm mb-2">{errors.productName}</p>
            )}

            {/* Brand */}
            <label className="block mb-2 font-medium">Brand</label>
            <input
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              placeholder="Enter brand name"
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.brand && (
              <p className="text-red-500 text-sm mb-2">{errors.brand}</p>
            )}

            {/* Type */}
            <label className="block mb-2 font-medium">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Type</option>
              <option value="Electronics">Electronics</option>
              <option value="Appliances">Appliances</option>
              <option value="Furniture">Furniture</option>
              <option value="Other">Other</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm mb-2">{errors.type}</p>
            )}

            {/* Warranty Period */}
            <label className="block mb-2 font-medium">
              Warranty Period (Months)
            </label>
            <input
              type="number"
              name="warrantyPeriod"
              value={form.warrantyPeriod}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Start Date */}
            <label className="block mb-2 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
              className="w-full mb-3 p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            {errors.startDate && (
              <p className="text-red-500 text-sm mb-2">{errors.startDate}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg font-bold hover:opacity-90 transition"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
