import { useRef } from "react";
import useRollitosSlider from "../Hooks/useRollitosSlider";
import rollito1 from "../image/rollito_1.png";
import rollito2 from "../image/rollito_2.png";
import rollito3 from "../image/rollito_3.png";
import rollito4 from "../image/rollito_4.png";
import rollito5 from "../image/rollito_5.png";
import rollito6 from "../image/rollito_6.png";
import rollito7 from "../image/rollito_7.png";
import rollito8 from "../image/rollito_8.png";
import rollito9 from "../image/rollito_9.png";
import rollito10 from "../image/rollito_10.png";
import "../styles/RollitosSliders.css";

export default function RollitosSlider() {
  const cintaRef = useRef(null);
  useRollitosSlider(cintaRef);

  const rollitos = [ rollito5,rollito2,rollito9, rollito3,rollito10, rollito4,  rollito6, rollito7, rollito8,  rollito1,];

  return (
    <div className="rollitos-slider-container">
      <div className="rollitos-slider" ref={cintaRef}>
        {[...rollitos, ...rollitos].map((img, i) => (
          <img key={i} src={img} alt={`rollito-${i}`} className="rollito-img" />
        ))}
      </div>
    </div>
  );
}