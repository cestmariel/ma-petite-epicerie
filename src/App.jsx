import { useState, useEffect, useCallback } from 'react'
import './App.css'
import { Button } from './components/Button/Button'
import Produit from './components/Produit/Produit'
import SearchBar from './components/SearchBar/SearchBar'
import Panier from './components/Panier/Panier'

function App() {
  let booleen = true

  const [count, setCount] = useState(0)
  const [list, setList] = useState([])
  const [listFiltre, setListFiltre] = useState([])
  const [categories, setCategories] = useState(['tous'])
  const [panier, setPanier] = useState([])

  useEffect(() => {
    fetch('https://api.npoint.io/68bf5db20a3c236f68ed')
      .then(response => response.json())
      .then(data => {
        setList(data);
        setListFiltre(data);
        const uniqueCategories = [...new Set(data.map(item => item.categorie.nom))];
        setCategories(['tous', ...uniqueCategories]);
        setPanier(data);
      })
  }, [])

  // Bouton : ajouter 1 au clic
  const handleClick = () => {
    setCount(count + 1)
  }

  // Bouton : ajouter le produit au panier
  const addProdPanier = (product) => {
    setPanier([...panier, {...product}]);
  }

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

  // Filtrer les produits selon leur catégorie
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
          {booleen && <Button count={count} action={handleClick} />}
          <Button count={count} action={handleClick} />
          <div className="triProd">
            {categories.map((cat, index) => (
              <button key={index} onClick={() => filtrerProduits(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <section className="d-flex" id="produits">
            {listFiltre.map((elem, index) =>
              <Produit key={index} detail={elem} addProdPanier={addProdPanier}/>
            )}
          </section>
        </div>
        <div className="panier">
            <Panier produits={panier} actionPanier={addProdPanier}/>
        </div>
      </section>
    </>
  )
}

export default App
