import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { BASE_URL } from '../API';

const Products = () => {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${BASE_URL}/api/products`)
            .then(response =>response.json())
            .then(data => setProducts(data.data))
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map(product => (
                            <div
                                key={product._id}
                                className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
                                onClick={() => handleProductClick(product._id)}
                            >
                                <img
                                    src={product.imageUrl}
                                    alt={product.productTitle}
                                    className="w-full h-36 object-contain rounded-md mb-2"
                                />
                                <div className="text-center">
                                    <h3 className="font-bold text-lg">{product.productTitle}</h3><br />
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
            <Footer />
        </>
    );
};


export default Products;
