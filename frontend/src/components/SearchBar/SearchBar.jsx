import React, { useState } from 'react';
import './SearchBar.css'

function SearchBar({ onFilterTextChange }) {
  const [localFilterText, setLocalFilterText] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    setLocalFilterText(newValue);
    onFilterTextChange(newValue);
  };

  return (
    <form>
      <input 
        type="text" 
        className="searchField"
        value={localFilterText} 
        onChange={handleChange} 
        placeholder="Rechercher un produit..."
      />
    </form>
  );
}

export default SearchBar;
