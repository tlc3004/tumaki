import "../styles/Header.css";
import RollitosSlider from "./RollitosSlider";

function Header({ openModal }) {
  return (
    <header>
      <RollitosSlider />
      <div className="header-content">
        <div className="branding">
          <h2>Sushi-Bar Nikkei</h2>
          <h1>TUMAKI</h1>
        </div>
        <nav className="nav-buttons">
          <button onClick={() => openModal("Carta")}>Carta</button>
          <button onClick={() => openModal("Pedidos")}>Pedidos</button>
          <button onClick={() => openModal("Reservas")}>Reservas</button>
          <button onClick={() => openModal("Informacion")}>Información</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;