import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import PriceHistoryChart from './PriceHistoryChart';

const ProductPage = () => {
  const { asin } = useParams();
  const [product, setProduct] = useState(null);
  const [priceInfo, setPriceInfo] = useState({
    highestPrice: 0,
    lowestPrice: 0,
    averagePrice: 0,
  });
  const [showAlertBox, setShowAlertBox] = useState(false); // State for toggling the alert box
  const [email, setEmail] = useState(''); // State to store user email

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/product`, {
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

  const handlePriceUpdate = (prices) => {
    setPriceInfo(prices);
  };

  const handleSetPriceAlert = () => {
    setShowAlertBox(!showAlertBox); // Toggle the alert box visibility
  };

  const handleNotifyMe = () => {
    // Logic to handle the notification can be added here
    console.log('User will be notified at: ', email);
  };

  return (
    <>
      <Navbar />
      <div className="bg-white p-6">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Left Side: Product Image */}
          <div className="md:w-1/2">
            <img
              src={product.imageUrl}
              alt={product.productTitle}
              className="w-full h-72 object-contain rounded-md mb-4"
            />
          </div>

          {/* Right Side: Product Details */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{product.productTitle}</h1>
            <p className="text-green-500 font-bold text-xl">₹{product.currentPrice}</p>
            <p className="text-gray-500 text-sm mt-1">Amazon</p>

            {/* Conditional rendering of the Price Alert Box */}
            {showAlertBox && (
              <div className="mt-4 p-4 bg-blue-100 rounded-md shadow-lg">
                <h2 className="text-lg font-bold mb-2">Price Alert</h2>
                <p className="mb-4">
                  You will be notified when the price of this product drops. Please enter your email below:
                </p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="border border-gray-300 rounded py-2 px-4 w-full mb-4"
                />
                <button
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                  onClick={handleNotifyMe}
                >
                  Notify Me
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-6">
              <a href={product.pageUrl} target='_blank'>
                <button className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 mr-2">
                  Buy on Amazon
                </button>
              </a>
              <button
                className="bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 mr-2"
                onClick={handleSetPriceAlert}
              >
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
          <PriceHistoryChart data={product.priceHistory} onPriceUpdate={handlePriceUpdate} />
        </div>

        <p className='font-serif'>
          You can check the price history of <b>{product.productTitle}</b> above. 
          This product price is <b>₹{product.currentPrice}</b> but the lowest price is <b>₹{priceInfo.lowestPrice}</b>.
          The average and highest price are <b>{priceInfo.averagePrice}</b> and <b>₹{priceInfo.highestPrice}</b> respectively.
        </p>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
