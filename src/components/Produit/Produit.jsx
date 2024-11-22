import defaultImage from '/public/default-image.jpg';
import './Produit.css'

export default function Produit({ detail, addProdPanier }){
    const handleAddToCart = () => {
        addProdPanier({
            nom: detail.nom,
            prix: parseFloat(detail.prix),
            image: detail.image,
        });
    };

    return (
        <div className="card">
            <img 
                src={detail.image || defaultImage} 
                alt={detail.nom || "Produit"} 
                className="imgProd" 
                onError={(e) => {e.target.onerror = null; e.target.src = defaultImage}}
            />
            <div className="pad">
                <h2 className='nomProd'>{detail.nom}</h2>
                <div className="priceProd">
                    <p className="price">{detail.prix} €</p>
                    <button className='buttonPanier' onClick={handleAddToCart}>
                        <img src="/public/basket2.svg" alt="bouton d'ajout au panier" />
                    </button>
                </div>
            </div>
        </div>
    );
}