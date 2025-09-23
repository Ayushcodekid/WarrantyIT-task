import { useAuth } from "../context/AuthContext";
import ProductList from "../components/ProductList";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const { user, logoutUser } = useAuth() as any;

  return (
    <div className="min-h-screen bg-hero flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between bg-gray-900 bg-opacity-80 p-6 shadow-md">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Welcome,{" "}
          <span className="text-purple-400">{user?.username || "User"}</span>!
        </h1>
        <button
          onClick={logoutUser}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition"
        >
          Logout
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex justify-center items-start pt-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-4xl space-y-6">
          {/* Product List */}
          <ProductList />

          {/* Add Product Button (below the table) */}
          <div className="flex justify-center">
            <Link
              to="/products/new"
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold transition shadow-md"
            >
              ➕ Add New Product
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
