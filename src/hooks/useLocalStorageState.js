import {useState, useEffect} from 'react';
import axios from 'axios';

function useLocalStorageState(key, initialValue) {

    const getPokemonData = async () => {
        const pokemonDataResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
        return pokemonDataResponse.data.results;
    }

    const [state, setState] = useState(() => {
        let startingStateValue;
        try {
            startingStateValue = JSON.parse(window.localStorage.getItem(key) || String(initialValue));
        } catch (err) {
            startingStateValue = getPokemonData();
        }
        return startingStateValue;
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(state));
    },[state]);

}

export default useLocalStorageState;