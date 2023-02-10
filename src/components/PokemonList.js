import React from 'react';



function PokemonList({ pokemon, selectPokemon }) {
  return (
    <ul className="Pokemon-list">
      {pokemon.map(name => (
        <li key={name} onClick={() => selectPokemon(name)}>
          {name}
        </li>
      ))}
    </ul>
  );
}

export default PokemonList;
