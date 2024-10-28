/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { GlobeAltIcon, RssIcon } from '@heroicons/react/24/outline';
import { BASE_URL } from '../API';

const Navbar = () => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/categories`);
        if (response.data.status === 'success') {
          setCategories(response.data.data);
        } else {
          setError(response.data.message);
        }
      } catch (error) {
        setError('An error occurred while fetching categories.');
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!productUrl) {
      setError('Product URL is required');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/api/product_url`, { product_url: productUrl });
      
      if (response.status === 200 || response.status === 201) {
        const productID = response.data.data;
        setError('');
        navigate(`/product/${productID}`);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const toTitleCase = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <header className="bg-black text-white">
      <div className="container mx-auto flex justify-between items-center py-2 px-4">
        <div className="flex items-center">
          <div className="text-sm flex space-x-4">
            <a href="#" className="hover:underline">Features</a>
            <a href="#" className="hover:underline">Latest Deals</a>
            <a href="#" className="hover:underline">Supported Stores</a>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="hover:underline">Download</a>
          <a href="#" className="hover:underline">Contact Us</a>
          <div className="flex items-center space-x-2">
            <span>IN</span>
            <GlobeAltIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
      <div className="bg-purple-800 py-7">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center ml-4">
            <img src="../src/assets/logo.png" alt="Logo" className="w-10 h-10 mr-1" />
            <Link to="/" className="text-xl font-bold">SastaSensei</Link>
          </div>
          <form onSubmit={handleSearch} className="flex items-center space-x-2 mr-5">
            <span className="text-white ml-2">Quick Search</span>
            <input
              type="text"
              value={productUrl}
              onChange={(e) => setProductUrl(e.target.value)}
              className="px-4 py-2 text-black rounded-md w-96"
              placeholder="Enter name or paste the product link"
            />
            <button type="submit" className="bg-orange-500 text-white px-5 py-2 rounded-md" disabled={loading}>
              {loading ? 'Loading...' : 'Search'}
            </button>
          </form>
        </div>
      </div>

      <nav className="bg-white py-2 shadow">
        <div className="container mx-auto overflow-x-auto">
          <div className="flex items-center space-x-4 py-2">
            <span className="font-semibold text-lg ml-2 mr-4 whitespace-nowrap text-black">Explore:</span>
            {categories.length > 0 ? (
              categories.map((category) => (
                <Link
                  key={category}
                  to={`/category/${category}`}
                  className="inline-block px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md font-medium text-sm capitalize whitespace-nowrap"
                >
                  {toTitleCase(category)}
                </Link>
              ))
            ) : (
              <p>Loading categories...</p>
            )}
          </div>
        </div>
      </nav>

      {error && (
        <div className="container mx-auto p-4">
          <p className="text-red-500">{error}</p>
        </div>
      )}
    </header>
  );
};

export default Navbar;
