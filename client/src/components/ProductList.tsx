import { useEffect, useState } from "react";
import { getUserProduct } from "../api/api";
import { useAuth } from "../context/AuthContext";

interface Product {
  id: number;
  name: string;
  brand: string;
  type: string;
  warrantyPeriod: number;
  startDate: string;
  modelNumber?: string;
  price?: number;
  description?: string;
  userId: number;
}

const ProductList = () => {
  const { user } = useAuth() as any;
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      if (user?.id) {
        setLoading(true);
        try {
          const res = await getUserProduct(user.id);
          setProducts(res.data);
        } catch (err) {
          console.error("Failed to fetch products", err);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProducts();
  }, [user]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB"); // Format as DD/MM/YYYY
  };

  return (
    <div className="overflow-x-auto w-100%">
      <table className="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-hero text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Brand</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Warranty (months)</th>
            <th className="px-4 py-3 text-left">Start Date</th>
            <th className="px-4 py-3 text-left">SKU / Model</th>
            <th className="px-4 py-3 text-left">Price (INR)</th>
            <th className="px-4 py-3 text-left">Description</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {loading ? (
            <tr>
              <td colSpan={8} className="text-center px-4 py-6 text-gray-500">
                Loading products...
              </td>
            </tr>
          ) : products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-100 transition transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              >
                <td className="px-4 py-3 text-left">{product.name}</td>
                <td className="px-4 py-3 text-left">{product.brand}</td>
                <td className="px-4 py-3 text-left">{product.type}</td>
                <td className="px-4 py-3 text-center">{product.warrantyPeriod}</td>
                <td className="px-4 py-3 text-left">{formatDate(product.startDate)}</td>
                <td className="px-4 py-3 text-left">{product.modelNumber || "-"}</td>
                <td className="px-4 py-3 text-left">{product.price ? `₹${product.price}` : "-"}</td>
                <td className="px-4 py-3 text-left">{product.description || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center px-4 py-6 text-gray-500 italic"
              >
                No products found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
