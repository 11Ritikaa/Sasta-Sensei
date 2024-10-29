import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../API';

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        const cat = encodeURIComponent(category);
        const response = await axios.get(`${BASE_URL}/api/products/cat?category=${cat}`);
        if (response.data.status === 'success') {
          setProducts(response.data.data);
        } else {
          setError('No products found for this category.');
        }
      } catch {
        setError('An error occurred while fetching products.');
    }
    };

    fetchProductsByCategory();
  }, [category]);

  const handleViewProduct = (productId) => {
    navigate(`/product/${productId}`); // Redirect to the single product page
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">{category.toUpperCase()}</h1>

        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product._id} className="border rounded-lg shadow-md p-4">
                <img src={product.imageUrl} alt={product.productTitle} className="w-full h-48 object-contain mb-4" />
                <h2 className="font-bold text-lg">{product.productTitle}</h2><br/>
                <div className="text-xl mb-4">
                  <s className="text-gray-500">₹{product.MRP}</s>
                  <span className="text-green-500 ml-2">({product.discountPercent}% off)</span>
                  <p className="text-green-600 font-bold text-2xl">₹{product.currentPrice}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">Amazon</p>
                <button
                  onClick={() => handleViewProduct(product._id)}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  View Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CategoryPage;