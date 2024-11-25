import defaultImage from '/public/default-image.jpg';
import './Produit.css'
import { useState } from 'react';

export default function Produit({ detail, addProdPanier, quantite, onQuantiteChange }) {
//   const [quantite, setQuantite] = useState(0);

const handleAddToCart = () => {
    if (quantite === 0) {
      addProdPanier({ nom: detail.nom, prix: parseFloat(detail.prix), image: detail.image });
    } else {
      onQuantiteChange(detail.nom, 1);
    }
  };

  const handleIncrease = () => {
    onQuantiteChange(detail.nom, 1);
  };

  const handleDecrease = () => {
    if (quantite > 0) {
        onQuantiteChange(detail.nom, -1);
      }
    };

  return (
    <div className="card">
      <img src={detail.image || defaultImage} alt={detail.nom || "Produit"} className="imgProd" onError={(e) => { e.target.onerror = null; e.target.src = defaultImage }} />
      <div className="pad">
        <h2 className='nomProd'>{detail.nom}</h2>
        <div className="priceProd">
          <p className="price">{detail.prix} €</p>
          {quantite > 0 ? (
            <div className="quantity-controls">
              <button onClick={handleDecrease}>-</button>
              <span>{quantite}</span>
              <button onClick={handleIncrease}>+</button>
            </div>
          ) : (
            <button className='buttonPanier' onClick={handleAddToCart}>
              <img src="/public/basket2.svg" alt="bouton d'ajout au panier" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}