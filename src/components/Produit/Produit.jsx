import defaultImage from '/public/default-image.jpg';
import './Produit.css'

export default function Produit(props){

    return (
    <>
        <div className="card">
            <img src={props.detail.image || defaultImage} alt={props.detail.nom || "Produit"} className="imgProd" onError={(e) => {e.target.onerror = null; e.target.src = defaultImage}}/>
            <div className="pad">
                <h2>{props.detail.nom}</h2>
                <div className="priceProd">
                    <p className="price">{props.detail.prix} €</p>
                    <button className='buttonPanier' onClick={() => props.addProdPanier(props.detail)}><img src="/public/basket2.svg" alt="bouton d'ajout au panier" /></button>
                </div>
            </div>
        </div>
    </>)
}