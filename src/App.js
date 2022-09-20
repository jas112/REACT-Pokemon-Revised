import PokemonApp from './components/pokemonApp/PokemonApp';
import Box from '@mui/material/Box';
import './App.css';

function App() {
  return (
    <div className="App">
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            padding: 5,
            margin: '0 auto',
          },
        }}
      >
        <PokemonApp style={{margin: '0 auto'}}/>
      </Box>
    </div>
  );
}

export default App;
