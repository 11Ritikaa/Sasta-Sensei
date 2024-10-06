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
                <h3 className="font-bold text-lg">{product.productTitle}</h3><br/>
                <div className="text-xl mb-4">
                  <s className="text-gray-500">₹{product.MRP}</s>
                  <span className="text-green-500 ml-2">({product.discountPercent}% off)</span>
                  <p className="text-green-600 font-bold text-2xl">₹{product.currentPrice}</p>
                </div>
                <p className="text-gray-500 text-sm mt-1">Amazon</p>
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


export default PriceHistory;