import ProductList from "../components/ProductList";

const ProductListPage = () => {
  return (
    <div className="min-h-screen bg-hero flex justify-center items-start p-6">
      <div className="w-full max-w-5xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">My Products</h2>
        <ProductList />
      </div>
    </div>
  );
};

export default ProductListPage;
