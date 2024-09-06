import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import PriceHistoryChart from './PriceHistoryChart';

const ProductPage = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products/${asin}`, {
          params: { id: asin }
        });
        setProduct(response.data.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [asin]);

  if (!product) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="bg-white p-6">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Side: Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.image_url}
              alt={product.productTitle}
              className="w-full h-72 object-contain rounded-md mb-4"
            />
          </div>

          {/* Right Side: Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.productTitle}</h1>
            <p className="text-green-500 font-bold text-xl">₹{product.currentPrice}</p>
            <p className="text-gray-500 text-sm mt-1">Amazon</p>
            <p className="text-yellow-500 text-sm mt-1">
              {renderStars(product.rating)}
            </p>

            <div className="mt-6">
              <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mr-2">
                Buy on Amazon
              </button>
              <button className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 mr-2">
                Set price alert
              </button>
              <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                &lt;/&gt;
              </button>
            </div>
          </div>
        </div>

        {/* Price History Chart */}
        <div className="mt-10 mb-16">
          <PriceHistoryChart data={product.priceHistory} />
        </div>
      </div>
      <Footer />
    </>
  );
};

// Utility function to render stars based on rating
const renderStars = (rating) => {
  const stars = Math.round(parseFloat(rating));
  return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
};

export default ProductPage;
