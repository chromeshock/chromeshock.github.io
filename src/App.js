import React, {useState, useEffect } from 'react';
import PokemonList from './components/PokemonList';
import axios from 'axios';
import Pagination from './components/Pagination';
import './App.css';
//import PokemonCarousel from './components/PokemonCarousel';

function App() {
  const [pokemon, setPokemon] = useState([])
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon")
  const [nextPageUrl, setNextPageUrl] = useState()
  const [prevPageUrl, setPrevPageUrl] = useState()
  const [loading, setLoading] = useState(true)
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [selectedPokemonInfo, setSelectedPokemonInfo] = useState(null);


  
  useEffect(() => {
    setLoading(true)
    let cancel
    axios.get(currentPageUrl, { cancelToken: new axios.CancelToken(c => cancel = c)}).then(res => {
      setLoading(false)
      setNextPageUrl(res.data.next)
      setPrevPageUrl(res.data.previous)
      setPokemon(res.data.results.map(p => p.name))
      console.log(res.data)
    })

    return () => cancel()
  }, [currentPageUrl])

  useEffect(() => {
    if (selectedPokemon) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`)
        .then(res => setSelectedPokemonInfo(res.data))
        .catch(error => console.error(error));
    }
  }, [selectedPokemon])
  
  

  const selectPokemon = async (pokemon) => {
    setSelectedPokemon(pokemon);
    
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    setSelectedPokemonInfo(res.data);
    console.log(res.data);
  };
  
  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl)
  }
  
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl)
  }
  
  if (loading) {
    return <h1>Loading...</h1>
  }
  
    return (
      
  <div className='App'>
      <div className='App-header'>Pokemon Roster</div>
      <PokemonList pokemon={pokemon} selectPokemon={selectPokemon} />
      
      {selectedPokemon && <div className='spacer'>You selected {selectedPokemon}</div>}
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage: null}
        gotoPrevPage={prevPageUrl ? gotoPrevPage: null} />
     
        {selectedPokemon && (
    <div className="grid-container">
     
      <img src='https://www.seekpng.com/png/detail/13-137344_pokeball-pokeball-png.png'  alt='pokeball' />
      
      {selectedPokemonInfo && (<img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${selectedPokemonInfo.id}.png`} alt='pikachu' />)}

      <h2>{selectedPokemon}</h2>
      {selectedPokemonInfo && (
        <React.Fragment>
          <div className='neat-container'>
            <h3>Stats</h3>
              <ul className='neat-container'>
                <li className='mod-li'>Weight: {selectedPokemonInfo.weight}</li>
                
                <li className='mod-li'>Height: {selectedPokemonInfo.height}</li>
              </ul>
            <h3>Abilities</h3>
            <ul className='neat-container'>
             <li className='mod-li'> {selectedPokemonInfo.abilities.map((ab) => {
                  return <li key={ab.ability.name}>  {ab.ability.name}</li>
                })}
              </li>
             </ul>
             
          </div>
        </React.Fragment>
      )}
    </div>
    )}
  </div>
  );
}
export default App;
