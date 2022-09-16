import React, {useState, useEffect} from 'react';
import axios from 'axios';

function PokemonApp() {
    const [pokemonData, setPokemonData] = useState ([]);

    useEffect(() => {

        async function fetchPokemonData(){
            const response = await axios.get(``);
            console.log(response.data);
            setPokemonData(response.data);
        }

        fetchPokemonData();

    }, [pokemonData]);

  return (
    <div>
        <h1>Welcome to PokemonApp!!!</h1>
    </div>
  )
}

export default PokemonApp;