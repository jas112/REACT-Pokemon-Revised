import React, {useState, useEffect} from 'react';
import {v4 as uuidV4} from 'uuid';
import axios from 'axios';
import PokemonDetails from '../pokemonDetails/PokemonDetails';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import usePokemonState from '../../hooks/usePokemonState';


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

function PokemonApp(props) {

    const storedPokemonData = JSON.parse(window.localStorage.getItem('pokemonData'));
    const storedPokemonDetails = JSON.parse(window.localStorage.getItem('pokemonDetails'));

    const initialPokemonData = JSON.parse(window.localStorage.getItem('pokemonData'));

    const [pokemonData, setPokemonData] = useState([]);
    const [currentPokemon, setCurrentPokemon] = useState(0);
    const [currentPokemonDetails, setCurrentPokemonDetails] = useState(pokemonData[0]);

    useEffect(() => {
        async function fetchPokemonData(){
            if(!storedPokemonData && !storedPokemonDetails){
                console.log(`storedPokemonData not found....`);
                try {
                    const response1 = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=300&offset=0`);
                    setPokemonData(response1.data.results);
                    window.localStorage.setItem('pokemonData', JSON.stringify(response1.data.results))
                    const response2 = await axios.get(`https://pokeapi.co/api/v2/pokemon/${0 + 1}`);
                    setCurrentPokemonDetails(response2.data);
                    window.localStorage.setItem('pokemonDetails', JSON.stringify(response2.data));
                } catch (err) {
                    console.log(err);
                }
            }else{
                console.log(`storedPokemonData found....`);
                setPokemonData(storedPokemonData);
                let initialPokemonDetailsURL = storedPokemonData[0].url;
                console.log(initialPokemonDetailsURL);
                const responseInitDetails = await axios.get(`https://pokeapi.co/api/v2/pokemon/${0 + 1}`);
                setCurrentPokemonDetails(responseInitDetails.data);
                window.localStorage.setItem('pokemonDetails', JSON.stringify(responseInitDetails.data));
            }

        };
        fetchPokemonData();
    },[]);

    useEffect(() => {
        async function updateCurrentPokemon(){
            try {
                const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${Number(currentPokemon) + 1}`);
                setCurrentPokemonDetails(response.data);
            } catch (err) {
                console.log(err);
            }
        };
        updateCurrentPokemon();
    },[currentPokemon]);

    const handleChangeEvent = (evt) => {
        let pokemonIdx = evt.target.value;
        setCurrentPokemon(pokemonIdx);
    }

    let pokemon = pokemonData.map((pokemon, idx) => (
        // <option key={uuidV4()} value={idx}>{pokemon.name}</option>
        <MenuItem key={uuidV4()} value={idx}>{pokemon.name}</MenuItem>
    ));

  return (
    <div>
        <h1>Welcome to PokemonApp!!!</h1>
        {/* <select value={currentPokemon} onChange={handleChangeEvent}>
            {pokemon}
        </select> */}
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
                                        onChange={handleChangeEvent}
                                    >
                                        {pokemon}
                                    </Select>
                                </FormControl>
                            </Box>
                        </CardContent>
                        <CardActions>
                            {/* <Button size="small">Learn More</Button> */}
                        </CardActions>
                    </Card>
                </Item>

                <Item key={uuidV4()} elevation={5}>
                    {currentPokemonDetails ? <PokemonDetails pokemonIdx={currentPokemon} pokemon={currentPokemonDetails} /> : null}
                </Item>
        
                </Box>

            </Grid>
        </Grid>
    </div>
  )
}

export default PokemonApp;