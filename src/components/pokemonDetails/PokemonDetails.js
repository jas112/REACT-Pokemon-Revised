import React from 'react';

function PokemonDetails(props) {
    const {pokemonIdx, pokemon} = props;

    let imageURL = pokemon.sprites.other['official-artwork'].front_default;

  return (
    <div>
        <div>{pokemon.name}</div>
        <div style={{
            width: 300, 
            height: 300, 
            backgroundImage: `url(${imageURL})`, 
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'top center',
            margin: '0 auto',
            }}>
        </div>
        <div>BASE EXP: {pokemon.base_experience}</div>
        <div>HEIGHT: {pokemon.height}</div>
        <div>WEIGHT: {pokemon.weight}</div>
    </div>
  )
}

export default PokemonDetails;