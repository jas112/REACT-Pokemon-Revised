import React, { Component } from 'react';
import axios from 'axios';
import {v4 as uuidV4} from 'uuid';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';


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

    const {pokemon, currentPokemon} = this.state;
    console.log(`currentPokemon => ${currentPokemon}`);

    const bull = (
        <Box
            component="span"
            sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
        >
            •
        </Box>
    );
    
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: 480,
        lineHeight: '60px',
    }));

    let availablePokemon = this.state.pokemon.map((pokemon, idx) => (
        // <option key={uuidV4()} value={idx}>{pokemon.name}</option>
        <MenuItem key={uuidV4()} value={idx}>{pokemon.name}</MenuItem>
    ));

    return (
      <div>
        Current Pokemon {currentPokemon}
        <Grid container spacing={2}>
            <Grid item xs={6}>

                <Box
                sx={{
                p: 2,
                bgcolor: 'background.default',
                display: 'grid',
                gridTemplateColumns: { md: '1fr 1fr' },
                gap: 2,
                }}
                >
        
                <Item key={uuidV4()} elevation={5}>
                    <Card elevation={3} sx={{ minWidth: 345, maxWidth: 345, height: '100%' }}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                Welcome to this little Pokedex!!!
                            </Typography>
                            <Typography variant="h5" component="div">
                                Po{bull}Ke{bull}Mon
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                a syllabic abbreviation
                            </Typography>
                            <Typography variant="body2">
                                of the Japanese brand Pocket Monsters.
                                <br />
                                {/* {'"a benevolent smile"'} */}
                            </Typography>
                            <Box sx={{ minWidth: 120, paddingTop: 30 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Pokemon</InputLabel>
                                    <Select
                                        labelId="pokemonSelect"
                                        id="pokemon-select"
                                        value={currentPokemon}
                                        label="Pokemon"
                                        onChange={this.handleChangeEvent}
                                    >
                                        {availablePokemon}
                                    </Select>
                                </FormControl>
                            </Box>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                    </Card>
                </Item>

                {/* <Item key={uuidV4()} elevation={5}>
                    {currentPokemonDetails ? <PokemonDetails pokemonIdx={currentPokemon} pokemon={currentPokemonDetails} /> : null}
                </Item> */}
        
                </Box>

            </Grid>
        </Grid>    
    </div>
    )
  }
}

export default PokemonAppClass