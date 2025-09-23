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
  userId: number;
}

const ProductList = () => {
  const { user } = useAuth() as any;
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (user?.id) {
      getUserProduct(user.id).then((res) => setProducts(res.data));
    }
  }, [user]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-hero text-white">
          <tr>
            <th className="px-4 py-3 text-left">Name</th>
            <th className="px-4 py-3 text-left">Brand</th>
            <th className="px-4 py-3 text-left">Type</th>
            <th className="px-4 py-3 text-left">Warranty (months)</th>
            <th className="px-4 py-3 text-left">Start Date</th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {products.length > 0 ? (
            products.map((product) => (
              <tr
                key={product.id}
                className="border-t hover:bg-gray-100 transition transform hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(255,255,255,0.6)]"
              >
                <td className="px-4 py-3 text-left">{product.name}</td>
                <td className="px-4 py-3 text-left">{product.brand}</td>
                <td className="px-4 py-3 text-left">{product.type}</td>
                <td className="px-4 py-3 text-left">
                  {product.warrantyPeriod}
                </td>
                <td className="px-4 py-3 text-left">{product.startDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={5}
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
