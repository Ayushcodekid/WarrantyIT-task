// src/components/ProductForm.tsx
import React, { useState } from "react";
import { createProduct } from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import {Package } from "lucide-react";

interface ProductFormData {
  productName: string;
  brand: string;
  type: string;
  warrantyPeriod: number;
  modelNumber?: string; // optional
  price?: number; // optional
  description?: string; // optional
  startDate: string;
}

const ProductForm = () => {
  const [form, setForm] = useState<ProductFormData>({
    productName: "",
    brand: "",
    type: "",
    warrantyPeriod: 0,
    modelNumber: "",
    price: undefined,
    description: "",
    startDate: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth() as any; // Get current user from context

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
    if (form.warrantyPeriod <= 0)
      newErrors.warrantyPeriod = "Warranty Period must be greater than 0";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!validate()) return;
    const loadingToast = toast.loading("Adding Product...");
    try {
      // Map form fields to API payload
      const payload = {
        name: form.productName,
        brand: form.brand,
        type: form.type,
        modelNumber: form.modelNumber || null,
        warrantyPeriod: Number(form.warrantyPeriod),
        price: form.price || null,
        description: form.description || null,
        startDate: form.startDate,
        userId: user?.id, // pass current user's ID
      };

      await createProduct(payload);
      toast.success("Product added successfully!");
      // Reset form
      setForm({
        productName: "",
        brand: "",
        type: "",
        modelNumber: "",
        warrantyPeriod: 0,
        price: undefined,
        description: "",
        startDate: "",
      });
      setErrors({});
    } catch (err: any) {
      console.error(err);
      toast.error("Failed to add product. Please try again.");
    } finally {
      setIsLoading(false);
      toast.dismiss(loadingToast);
      navigate("/landing"); // Redirect to landing page after submission
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-hero flex flex-col items-center py-8 px-4">
        <button
          onClick={() => navigate("/landing")} // navigate back
          className="absolute top-18 left-4 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          ← Back
        </button>
        <div className="w-full max-w-3xl bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center mb-6 flex items-center justify-center gap-2">
            <span className="text-purple-600"><Package /></span> Product Management
          </h1>
          <p className="text-center text-gray-500 mb-6">
            Add new products to your catalog with detailed information
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Product Name */}
              <div>
                <label className="block font-medium mb-1 text-left">Product Name *</label>
                <input
                  type="text"
                  name="productName"
                  value={form.productName}
                  onChange={handleChange}
                  placeholder="Enter product name"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.productName && (
                  <p className="text-red-500 text-sm">{errors.productName}</p>
                )}
              </div>

              {/* Brand */}
              <div>
                <label className="block font-medium mb-1 text-left">Brand *</label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  placeholder="Enter brand name"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm">{errors.brand}</p>
                )}
              </div>

              {/* Product Type */}
              <div>
                <label className="block font-medium mb-1 text-left">Product Type *</label>
                <select
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select product type</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Appliances">Appliances</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Other">Other</option>
                </select>
                {errors.type && (
                  <p className="text-red-500 text-sm">{errors.type}</p>
                )}
              </div>

              {/* SKU */}
              <div>
                <label className="block font-medium mb-1 text-left">
                  SKU / Model Number
                </label>
                <input
                  type="text"
                  name="modelNumber"
                  value={form.modelNumber}
                  onChange={handleChange}
                  placeholder="Enter SKU or model number"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Warranty Period */}
              <div>
                <label className="block font-medium mb-1 text-left">
                  Warranty Period (Months) *
                </label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    name="warrantyPeriod"
                    value={form.warrantyPeriod}
                    onChange={handleChange}
                    className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                {errors.warrantyPeriod && (
                  <p className="text-red-500 text-sm">
                    {errors.warrantyPeriod}
                  </p>
                )}
              </div>

              {/* Price */}
              <div>
                <label className="block font-medium mb-1 text-left">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price ?? ""}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-gray-400 text-sm mt-1">
                  Optional - Enter price in INR
                </p>
              </div>

              {/* Start Date */}
              <div className="flex flex-col items-center">
                <label className="block font-medium mb-1 text-left">Start Date *</label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.startDate && (
                  <p className="text-red-500 text-sm">{errors.startDate}</p>
                )}
                <p className="text-gray-400 text-sm mt-1">
                  When will this product become available?
                </p>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-medium mb-1 text-left">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Enter product description (optional)"
                className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows={4}
              />
              <p className="text-gray-400 text-sm mt-1">
                Optional - Provide additional details about the product
              </p>
            </div>

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                type="button"
                onClick={() =>
                  setForm({
                    productName: "",
                    brand: "",
                    type: "",
                    modelNumber: "",
                    price: undefined,
                    description: "",
                    warrantyPeriod: 0,
                    startDate: "",
                  })
                }
                className="w-1/2 mr-2 py-3 bg-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Reset Form
              </button>
              <button
                type="submit"
                className="w-1/2 ml-2 py-3 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>
        <Toaster position="top-center" />
      </div>
    </div>
  );
};

export default ProductForm;
