import React, { useState } from 'react';
import defaultImage from '/public/default-image.jpg';
import './Panier.css'

export default function Panier({ produits, onQuantiteChange, onRemove }){
    return (
        <div className='panier'>
            <h2>Mon panier</h2>
            <div className="panier-liste">
                {produits.map((produit) => (
                    <div key={produit.nom} className="panier-item">
                        <img 
                            src={produit.image || defaultImage} 
                            alt={produit.nom} 
                            className="panier-item-image"
                            onError={(e) => {e.target.onerror = null; e.target.src = defaultImage}}
                        />
                        <div className="panier-item-details">
                            <h3>{produit.nom}</h3>
                            <p>Prix: {produit.prix.toFixed(2)} €</p>
                            <div className="panier-item-actions">
                                <button onClick={() => onQuantiteChange(produit.nom, -1)}>-</button>
                                <span>{produit.quantite}</span>
                                <button onClick={() => onQuantiteChange(produit.nom, 1)}>+</button>
                                <button onClick={() => onRemove(produit.nom)}>Supprimer</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="panier-total">
                Total: {produits.reduce((total, produit) => total + produit.prix * produit.quantite, 0).toFixed(2)} €
            </div>
        </div>
    );
}



