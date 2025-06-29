import { useState, useEffect, useRef } from "react";
import "../styles/Modal.css";

function Modal({ title, content, onClose }) {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    const modal = modalRef.current;
    
    const handleScroll = () => {
      setShowScrollTop(modal.scrollTop > 200);
    };

    if (modal) {
      modal.addEventListener('scroll', handleScroll);
      return () => {
        modal.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const scrollToTop = () => {
    if (modalRef.current) {
      modalRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal" ref={modalRef}>
        <button className="close-btn" onClick={onClose} aria-label="Close modal">
          ×
        </button>
        <h3>{title}</h3>
        <div className="modal-content">{content}</div>

        {showScrollTop && (
          <button 
            onClick={scrollToTop} 
            className="scroll-top-button"
            aria-label="Volver arriba"
          >
            ⬆
          </button>
        )}
      </div>
    </div>
  );
}

export default Modal;