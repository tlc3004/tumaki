import { useEffect } from "react";

export default function useRollitosSlider(ref, velocidad = 0.4) {
  useEffect(() => {
    if (!ref.current) return;

    const cinta = ref.current;

    cinta.innerHTML += cinta.innerHTML;
    let pos = 0;

 const mover = () => {
      pos -= velocidad;
      if (Math.abs(pos) >= cinta.scrollWidth 
      / 2) {
        pos = 0;
      }
      cinta.style.transform = `translateX(${pos}px)`;
      requestAnimationFrame(mover);
    };

    mover();
  }, [ref, velocidad]);
}
