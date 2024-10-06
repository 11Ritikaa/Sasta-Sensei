import { useState, useEffect } from 'react';
import UnsubscribeModal from './UnsubcribeModal';

const Unsubscribe = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to handle opening the modal when the page loads
  useEffect(() => {
    // Check if the user clicked from the email link and automatically open the modal
    setIsModalOpen(true);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <UnsubscribeModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default Unsubscribe;