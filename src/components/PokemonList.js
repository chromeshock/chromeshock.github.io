import React, { useState } from 'react';

function PokemonList({ pokemon, selectPokemon }) {
  const [isHovered, setIsHovered] = useState(null);

  return (
    <ul className="Pokemon-list">
      {pokemon.map(name => (
        <li
          key={name}
          onClick={() => selectPokemon(name)}
          onMouseOver={() => setIsHovered(name)}
          onMouseOut={() => setIsHovered(null)}
          className={isHovered === name ? 'large-font' : ''}
        >
          {name}
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
