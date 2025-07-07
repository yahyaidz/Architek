import { useState, useCallback } from 'react';

export const useQuoteModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Restore body scroll when modal is closed
    document.body.style.overflow = 'unset';
  }, []);

  return {
    isOpen,
    openModal,
    closeModal
  };
};