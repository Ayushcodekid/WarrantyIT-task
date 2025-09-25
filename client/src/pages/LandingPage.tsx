import { Link } from "react-router-dom";
import ProductListPage from "../components/ProductListPage";
import Header from "../components/Header";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-hero flex flex-col">
      {/* Header */}
      <Header />

      {/* Main content */}
      <main className="flex-grow flex flex-col pt-10 px-4 sm:px-6 lg:px-8">
        {/* Product List takes full width */}
        <ProductListPage />

        {/* Add Product Button */}
        <div className="flex justify-center mt-6">
          <Link
            to="/productsForm"
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition shadow-md"
          >
            ➕ Add New Product
          </Link>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
