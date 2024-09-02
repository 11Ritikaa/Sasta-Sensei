import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch products from the database
        fetch('http://localhost:5000/api/getallproducts')
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, []);

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    return (
        <>
            <Navbar />
            <div className="bg-gray-100 p-6">
                <h2 className="text-2xl font-bold mb-4">All Deals</h2>
                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map(product => (
                            <div
                                key={product.id}
                                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                onClick={() => handleProductClick(product._id)} // Handle click event
                            >
                                <img
                                    src={product.image_url}
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
            <Footer />
        </>
    );
};

// Utility function to render stars based on rating
const renderStars = (rating) => {
    const stars = Math.round(parseFloat(rating));
    return '⭐'.repeat(stars) + '☆'.repeat(5 - stars);
};

export default Products;
