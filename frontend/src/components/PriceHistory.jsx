import { useState, useEffect } from 'react';
import axios from 'axios';

const PriceHistory = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/getallproducts');
        const allProducts = response.data;
        setProducts(allProducts);
        setVisibleProducts(allProducts.slice(0, 10)); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleViewAllClick = () => {
    setShowAll(true);
    setVisibleProducts(products); 
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = Array.from({ length: 5 }, (_, index) => {
      if (index < fullStars) return '★'; // Full star
      if (index === fullStars && hasHalfStar) return '☆'; // Half star
      return '☆'; // Empty star
    });
    return stars.join(' ');
  };

  return (
    <div className="bg-white p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-bold">
          Price History <span className="text-gray-500 text-xl font-extralight">#Latest Deals</span>
        </h2>
        <button
          onClick={handleViewAllClick}
          className="bg-purple-600 text-white px-6 py-2 rounded-md font-bold"
        >
          {showAll ? 'Hide Deals' : 'View all deals →'}
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Product Cards */}
        {visibleProducts.map(product => (
          <div key={product._id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
            <img
              src={product.image_url}
              alt={product.productTitle}
              className="w-full h-36 object-cover rounded-md mb-2"
            />
            <div className="text-center">
              <h3 className="font-bold text-lg">{product.productTitle}</h3>
              <p className="text-green-500 font-bold text-xl mt-1">₹{product.currentPrice}</p>
              <p className="text-gray-500 text-sm mt-1">Amazon</p>
              <p className="text-yellow-500 text-sm mt-1">{renderStars(product.rating)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceHistory;
