import React, { Component } from 'react';
import axios from 'axios';


class PokemonAppClass extends Component {
    constructor(props){
        super(props);
        this.state = {
            pokemon: [],
            currentPokemon: 0,
            currentPokemonDetails: {}
        };
        // this.handleChange = this.handleChange.bind(this);
        // this.getPokemonDetails = this.getPokemonDetails.bind(this);
    }

    async componentDidMount(){

        let initialPokemonData;
        const initialPokemonDetailsResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${this.state.currentPokemon + 1}`);
        let initialPokemonDetails = initialPokemonDetailsResponse.data;

        console.log(`@componentDidMount Start: initialPokemonData`);
        console.log(`${initialPokemonData}`);

        console.log(`@componentDidMount Start: initialPokemonDetails`);
        console.log(`${initialPokemonDetails}`);

        try {
            initialPokemonData = window.localStorage.getItem('pokemonData');
        } catch (error) {
            const initialPokemonDataResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
            window.localStorage.setItem('pokemonData', JSON.stringify(initialPokemonDataResponse.data.results));
            initialPokemonData = initialPokemonDataResponse.data.results;
        }

        console.log(`@componentDidMount End: initialPokemonData`);
        console.log(`${initialPokemonData}`);

        console.log(`@componentDidMount End: initialPokemonDetails`);
        console.log(`${initialPokemonDetails}`);

        this.setState({pokemon: initialPokemonData, currentPokemon: 0, currentPokemonDetails: initialPokemonDetails});

    }

    handleChangeEvent = (evt) => {
        let pokemonIdx = evt.target.value;
        this.setState({currentPokemon: pokemonIdx});
    }

    async getPokemonDetails(idx){
        const specificPokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idx + 1}`);
        this.setState({currentPokemonDetails: specificPokemonResponse.data});
    }

  render() {

    const {currentPokemon} = this.state;
    console.log(`currentPokemon => ${currentPokemon}`);
    return (
      <div>Current Pokemon {currentPokemon}</div>
    )
  }
}

export default PokemonAppClass