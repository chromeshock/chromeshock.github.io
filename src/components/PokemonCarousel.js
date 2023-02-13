import React from 'react';
import Slider from 'react-slick';

function PokemonCarousel(props) {
  const { pokemons } = props;
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  return (
    <Slider {...settings}>
      {pokemons.map(pokemon => (
        <div key={pokemon}>
          <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon}.png`} alt={pokemon} />
          <h2>{pokemon}</h2>
        </div>
      ))}
    </Slider>
  );
}

export default PokemonCarousel;
