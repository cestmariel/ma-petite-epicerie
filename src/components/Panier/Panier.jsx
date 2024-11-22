import React, { useState } from 'react';
import defaultImage from '/public/default-image.jpg';
import './Panier.css'

export default function Panier({ produits, onQuantiteChange, onRemove }){

    return (
    <>
        <div className='panier'>
            <h2>Mon panier</h2>
            <table>
                <tbody>
                    {produits.map((produit) => (
                        <tr key={produit.id}>
                        <td>
                            <img src={produit.image || defaultImage} alt={produit.nom || "Produit"} className="imgProd" onError={(e) => {e.target.onerror = null; e.target.src = defaultImage}} />
                        </td>
                        <td>
                        <h3>{produit.nom}</h3>
                    </td>
                    <td>
                        <div className='quantite'>
                            <button>-</button>
                            <button>+</button>
                            <button>x<img src="" alt="" /></button>
                        </div>
                    </td>
                    <td>{produit.prix} €</td>
                    </tr>
                    ))}

                    
                </tbody>
            </table>
        </div>
    </>

    )
}


