import { useState, useMemo } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons, TypePokemon } from 'src/hooks/useGetPokemons';
import Input from 'src/components/Input';
import styles, { POKEMON_COLORS } from './PokemonList.styles';

interface PokemonTileProps {
  pokemon: TypePokemon;
  classes: Record<string, string>;
}

interface PokemonTypePillProps {
  children: string;
  [key: string]: any;
}

const PokemonTypePill = ({ children, ...extra }: PokemonTypePillProps) => {
  const firstType = children.toLowerCase();
  const backgroundColor = POKEMON_COLORS[firstType] || 'white';

  return (
    <span
      style={{ backgroundColor }}
      {...extra}
    >
      {children}
    </span>
  );
}

const PokemonTile = ({ pokemon, classes }: PokemonTileProps) => {
  const firstType = pokemon.types[0].toLowerCase();
  const borderColor = POKEMON_COLORS[firstType] || 'white';

  return (
    <div className={classes.pokemonItem} style={{ borderColor }}>
      <small>#{pokemon.number}</small>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} loading="lazy" />
      <p>
        {
          pokemon.types.map((type) => (
            <PokemonTypePill
              key={`pokemon_${pokemon.id}-type_${type}`}
              className={classes.pokemonTypePill}
            >
              {type}
            </PokemonTypePill>
          ))
        }
      </p>
    </div>
  );
};

export const PokemonList = () => {
  const classes = useStyles();
  const { pokemons, loading } = useGetPokemons();
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchValue(value.toLowerCase());
  };

  // Memoization might be overkill here since we're only dealing with ~150 items,
  // but beyond that, it's a good practice to avoid unnecessary re-renders caused by this or other components.
  const filteredPokemons = useMemo(() => 
    pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchValue)
    ), [pokemons, searchValue]);

  return (
    <div className={classes.root}>
      {loading && <div className={classes.loadingOverlay}>Catching them all...</div>}
      <Input
        label="Can't find'em all?"
        placeholder="Search for a Pokémon"
        onChange={handleSearchChange}
      />
      <div className={classes.pokemonContainer}>
        {filteredPokemons.map((pkmn) => (
          <PokemonTile
            key={`pokemon-${pkmn.id}`}
            pokemon={pkmn}
            classes={classes}
          />
        ))}
      </div>
    </div>
  );
};

const useStyles = createUseStyles(
  styles,
  { name: 'PokemonList' }
);
