import { useState, useCallback } from "react";
import "../styles/ImageModal.css";

export function useImageModal() {
  const [imageSrc, setImageSrc] = useState(null);

  const setImage = useCallback((src, descripcion = "", position = null) => {
    setImageSrc({ src, descripcion, position });
  }, []);

  const closeImage = useCallback(() => {
    setImageSrc(null);
  }, []);

  const ImageModal = () =>
    imageSrc ? (
      <div className="image-modal-overlay" onClick={closeImage}>
        <div
          className="image-modal-content"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: imageSrc.position ? "absolute" : "relative",
            left: imageSrc.position?.x || "20%",
            top: imageSrc.position?.y || "40%",
            transform: imageSrc.position ? "translate(-40%, -60%)" : "none",
          }}
        >
          <img src={imageSrc.src} alt="Roll" />
          <p className="descripcion">{imageSrc.descripcion}</p>
          <button className="close-img-btn" onClick={closeImage}>
            
          </button>
        </div>
      </div>
    ) : null;

  return { setImage, ImageModal };
}
