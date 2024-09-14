import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PriceHistory = ({ products = [] }) => {
  const navigate = useNavigate();

  const handleProductClick = (asin) => {
    
    navigate(`/product/${asin}`);
  };

  console.log('Products in PriceHistory:', products);

   // Limit to top 10 products
   // const topProducts = products.slice(0, 10);

  const handleViewAllDeals = () => {
    navigate('/products');
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Price History</h2>
        <button
          onClick={handleViewAllDeals}
          className="bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition duration-300"
        >
          View All Deals
        </button>
      </div>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => handleProductClick(product._id)}
            >
              <img
                src={product.imageUrl}
                alt={product.productTitle}
                className="w-full h-36 object-contain rounded-md mb-2"
              />
              <div className="text-center">
                <h3 className="font-bold text-lg">{product.productTitle}</h3>
                <p className="text-green-500 font-bold text-xl mt-1">₹{product.currentPrice}</p>
                <p className="text-gray-500 text-sm mt-1">Amazon</p>
                <p className="text-yellow-500 text-sm mt-1">
                  {renderStars(product.rating)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

// Utility function to render stars based on rating
const renderStars = (rating) => {
  const stars = Math.round(parseFloat(rating));
  return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
};

export default PriceHistory;
