type PokemonColorType = {
	[key: string]: string;
};

// Realistically, we should create a theme file to store this and other global variables;
// Including the `black` and `white` colors as well.
export const POKEMON_COLORS: PokemonColorType = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	electric: '#F8D030',
	grass: '#78C850',
	ice: '#98D8D8',
	fighting: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	steel: '#B8B8D0',
	fairy: '#EE99AC',
};

const styles = {
  root: {
    width: '100%',
    textAlign: 'center',
    padding: '32px',
    boxSizing: 'border-box',
  },
	loadingOverlay: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		backgroundColor: 'rgba(0, 0, 0, 0.75)',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		fontSize: '2rem',
		flexWrap: 'wrap',
		zIndex: 1,
	},
  pokemonContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(12.5rem, 1fr))',
    gap: '1rem',
    justifyItems: 'center',
  },
  pokemonItem: {
    backgroundColor: 'white',
    border: '0.3rem solid white',
    borderRadius: '0.5rem',
    padding: '0 1rem',
		cursor: 'pointer',
		transition: 'transform 0.15s ease-in-out',
    '& h2': {
      marginTop: '0',
      color: 'black',
    },
    '& img': {
      width: '100%',
      aspectRatio: '1/1',
    },
    '& > small, & > p': {
      color: 'black',
    },
		'&:hover': {
			transform: 'rotate(5deg) scale(1.1)',
		},
  },
	pokemonTypePill: {
		padding: '0.25rem 0.5rem',
		borderRadius: '15rem',
		color: 'white',
		textTransform: 'uppercase',
		'& + &': {
			marginLeft: '0.25rem',
		},
	},
};

export default styles;