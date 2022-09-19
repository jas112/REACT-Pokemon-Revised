import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// const bull = (
//     <Box
//       component="span"
//       sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
//     >
//       •
//     </Box>
// );

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

    // <Card sx={{ minWidth: 275 }}>
    //     <CardContent>
    //         <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
    //             {pokemon.name}
    //         </Typography>
    //         <Typography variant="h5" component="div">
    //             {pokemon.name}
    //         </Typography>
    //         <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //             adjective
    //         </Typography>
    //         <Typography variant="body2">
    //             well meaning and kindly.
    //             <br />
    //             {'"a benevolent smile"'}
    //         </Typography>
    //     </CardContent>
    //     <CardActions>
    //         <Button size="small">Learn More</Button>
    //     </CardActions>
    // </Card>
  )
}

export default PokemonDetails;