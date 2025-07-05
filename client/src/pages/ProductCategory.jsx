import { categories } from "../assets/assets";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductCategory = () => {
  const { category } = useParams();
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === category
  );

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/product/list?category=${category}`
        );
        const data = await response.json();
        if (data.success) {
          setProducts(data.products);
        } else {
          setProducts([]);
        }
      } catch (error) {
        setProducts([]);
      }
    };
    fetchProductsByCategory();
  }, [category]);

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <h1 className="text-3xl md:text-4xl font-medium">
            {searchCategory.text.toUpperCase()}
          </h1>
        </div>
      )}
      {products.length > 0 ? (
        <div>
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 items-center justify-center">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="text-3xl md:text-4xl font-medium">No products found</h1>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

