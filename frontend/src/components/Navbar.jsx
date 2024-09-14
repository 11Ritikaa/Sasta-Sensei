import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import axios from 'axios';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]); // State to store categories
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        if (response.data.status === 'success') {
          console.log(response.data.data);
          setCategories(response.data.data); // Set categories in state
        } else {
          setError(response.data.message);
        }
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setError('An error occurred while fetching categories.');
      }
    };

    fetchCategories(); // Fetch categories when the component mounts
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!productUrl) {
      setError('Product URL is required');
      return;
    }

    setLoading(true); // Start loading
    try {
      
      const response = await axios.post('http://localhost:5000/api/product_url', { product_url: productUrl });
      console.log(response)
      if (response.status === 200) {
        const productID = response.data.data;
        setError('');
        navigate(`/product/${productID}`); 
      } else {
        setError(response.data.message);
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false); // Stop loading
    }
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
        <div className="container mx-auto flex items-center justify-evenly space-x-3 text-black">
          <span className="font-semibold space-x-4 ml-2">Explore:</span>
          
          {categories.length > 0 ? (  
            categories.map((category) => (
              <Link 
                key={category} 
                to={`/category/${category}`} // Link to category page
                className="flex space-x-2 px-4 py-2 hover:bg-gray-200 hover:shadow-lg hover:rounded-full transition"
              >
                {category.toUpperCase()}
              </Link>
            ))
          ) : (
            <p>Loading categories...</p>
          )}
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
