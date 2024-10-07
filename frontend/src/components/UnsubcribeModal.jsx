/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../API';

const UnsubscribeModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Function to extract ASIN from the URL query parameters
  const getAsinFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get('asin');
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const asin = getAsinFromUrl();

    if (!email || !asin) {
      setError('Email or ASIN missing');
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}/api/unsubscribe`, {
        email,
        asin,
      });

      if (response.data.success) {
        setMessage('Your tracking has been stopped.');
        setError('');  // Clear any previous error messages
      } else {
        setError(response.data.message || 'Unsubscribe failed.');
      }
    } catch (error) {
      setError('Something went wrong, please try again later.');
    }
  };

  // If the modal is not open, return null to prevent rendering
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Unsubscribe</h2>
        {message ? (
          <p className="text-green-500">{message}</p>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                required
              />
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg"
              >
                Unsubscribe
              </button>
            </form>
            <button
              className="mt-4 text-gray-600 underline"
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UnsubscribeModal;