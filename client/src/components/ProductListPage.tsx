import ProductList from "./ProductList";

// ProductListPage.tsx
const ProductListPage = () => {
  return (
    <div className="w-full bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">My Products</h2>
      <ProductList />
    </div>
  );
};


export default ProductListPage;
