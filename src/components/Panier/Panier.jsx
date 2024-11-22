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
                            <div className="panier-item-prix">
                                <p>Prix unit.: {produit.prix.toFixed(2)} €</p>
                                <p className='panier-item-prix-total'>Sous total: {(produit.prix * produit.quantite).toFixed(2)} €</p>
                            </div>
                            <div className="panier-item-actions">
                                <button onClick={() => onQuantiteChange(produit.nom, -1)}>-</button>
                                <span>{produit.quantite}</span>
                                <button onClick={() => onQuantiteChange(produit.nom, 1)}>+</button>
                                <button onClick={() => onRemove(produit.nom)} className="delete-button">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
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



