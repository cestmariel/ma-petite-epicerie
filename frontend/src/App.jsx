import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import Produit from './components/Produit/Produit'
import SearchBar from './components/SearchBar/SearchBar'
import Panier from './components/Panier/Panier'

function App() {
  let booleen = true

  const [count, setCount] = useState(0);
  const [list, setList] = useState([]);
  const [listFiltre, setListFiltre] = useState([]);
  const [categories, setCategories] = useState(['tous']);
  const [panier, setPanier] = useState([]);

  useEffect(() => {
    fetch('https://api.npoint.io/68bf5db20a3c236f68ed')
      .then(response => response.json())
      .then(data => {
        setList(data);
        setListFiltre(data);
        const uniqueCategories = [...new Set(data.map(item => item.categorie.nom))];
        setCategories(['tous', ...uniqueCategories]);
      })
  }, [])

  // Bouton : ajouter 1 au clic
  const handleClick = () => {
    setCount(count + 1)
  }

  // Bouton : ajouter le produit au panier
  const addProdPanier = (product) => {
    setPanier(prevPanier => {
      const existingProduct = prevPanier.find(item => item.nom === product.nom);
      if (existingProduct) {
        // Si le produit existe déjà, augmenter sa quantité
        return prevPanier.map(item => item.nom === product.nom ? { ...item, quantite: item.quantite + 1 } : item );
      } else {
        // Sinon, ajouter le nouveau produit avec une quantité de 1
        return [...prevPanier, {...product, quantite: 1 }];
      }
    });
  };

  // Pour gérer les changements de quantité 
  const handleQuantiteChange = (nom, change) => {
    setPanier(prevPanier => {
      return prevPanier.map(item => 
        item.nom === nom 
          ? { ...item, quantite: Math.max(0, item.quantite + change) }
          : item
      ).filter(item => item.quantite > 0);
    });
  };
  
  // Pour gérer la suppression du produit dans le panier
  const handleRemove = (nom) => {
    setPanier(prevPanier => prevPanier.filter(item => item.nom !== nom));
  };

  // Permettre la recherche de produits
  const filtrerProduits = useCallback((cat, searchText = '') => {
    let produitsFiltres = list;
    if (cat !== 'tous') {
      produitsFiltres = produitsFiltres.filter(produit => produit.categorie.nom === cat);
    }
    if (searchText) {
      produitsFiltres = produitsFiltres.filter(produit => 
        produit.nom.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    setListFiltre(produitsFiltres);
  }, [list]);

  // Pour filtrer les produits selon leur catégorie
  const handleFilterTextChange = useCallback((newFilterText) => {
    filtrerProduits('tous', newFilterText);
  }, [filtrerProduits]);

  return (
    <>
      <section className="container">
        <div className="produits">
          <div className="d-flex">
            <img src="/public/shop.svg" alt="logo épicerie" className="logo" />
            <h1 className='logoName'>Ma petite épicerie</h1>
            <SearchBar onFilterTextChange={handleFilterTextChange} />
          </div>
          <div className="triProd">
            {categories.map((cat, index) => (
              <button key={index} onClick={() => filtrerProduits(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <section className="d-flex" id="produits">
              {listFiltre.map((elem) =>
                <Produit key={elem.id} detail={elem} addProdPanier={addProdPanier} quantite={panier.find(p => p.nom === elem.nom)?.quantite || 0} onQuantiteChange={handleQuantiteChange}/>
              )}
          </section>
        </div>
        {panier.length > 0 && (
          <div className="panier-container">
            <Panier 
              produits={panier} 
              onQuantiteChange={handleQuantiteChange}
              onRemove={handleRemove}
            />
          </div>
        )}
      </section>
    </>
  )
}

export default App
