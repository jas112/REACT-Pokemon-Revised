import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

function PokemonDetails(props) {
    const {pokemon} = props;

    let imageURL = pokemon.sprites.other['official-artwork'].front_default;

  return (

    <Card elevation={3} sx={{ minWidth: 345, height: '100%'  }}>
        <CardMedia
        component="img"
        height="320"
        image={imageURL}
        alt="pokemon image"
        />
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
                {pokemon.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                BASE EXP: {pokemon.base_experience} <br/>
                HEIGHT: {pokemon.height} <br/>
                WEIGHT: {pokemon.weight}
            </Typography>
        </CardContent>
        <CardActions>
        {/* <Button size="small">Share</Button>
        <Button size="small">Learn More</Button> */}
        </CardActions>
    </Card>
  )
}

export default PokemonDetails;