import { useEffect, useState, useMemo, Fragment } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemon, TypePokemonDetails } from 'src/hooks/useGetPokemon';
import { useGetPokemons, TypePokemon } from 'src/hooks/useGetPokemons';
import Input from 'src/components/Input';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from 'src/components/Modal/Modal';
import useModal from 'src/hooks/useModal';
import styles, { POKEMON_COLORS } from './PokemonList.styles';

interface PokemonTileProps {
  pokemon: TypePokemon;
  classes: Record<string, string>;
  onClick?: (pokemon: TypePokemon) => void;
  noPointerEvents?: boolean;
}

interface PokemonTypePillProps {
  children: string;
  [key: string]: any;
}

interface PokemonDetailsModalProps {
  isOpen: boolean;
  closeModal: () => void;
  pokemonId?: string;
  classes: Record<string, string>;
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

const PokemonTile = ({ pokemon, classes, onClick = () => {}, noPointerEvents = false }: PokemonTileProps) => {
  const firstType = pokemon.types[0].toLowerCase();
  const borderColor = POKEMON_COLORS[firstType] || 'white';

  return (
    <div
      className={classes.pokemonItem}
      style={{ borderColor, pointerEvents: noPointerEvents ? 'none' : 'auto' }}
      onClick={() => onClick(pokemon)}
    >
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

const PokemonDetailsModal = ({ isOpen, closeModal, pokemonId, classes }: PokemonDetailsModalProps) => {
  if (!pokemonId) return null;

  const { pokemon, loading, error } = useGetPokemon(pokemonId);

  if (error) return <div>Error loading Pokémon details</div>;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className={classes.pokemonDetailsContainer}>
        {loading && <div>Searching grassy areas...</div>}
        {
          pokemon && (
            <Fragment>
              <PokemonTile
                pokemon={pokemon}
                classes={classes}
                noPointerEvents
              />
              <div className={classes.pokemonDetails}>
                <p><b>Types:</b> {pokemon.types.join(', ')}</p>
                <p><b>Classification:</b> {pokemon.classification}</p>
                <p><b>Height:</b> {pokemon.height.minimum} - {pokemon.height.maximum}</p>
                <p><b>Weight:</b> {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
                <p><b>Resistant:</b> {pokemon.resistant.join(', ')}</p>
                <p><b>Weaknesses:</b> {pokemon.weaknesses.join(', ')}</p>
                <p><b>Flee Rate:</b> {pokemon.fleeRate}</p>
                <p><b>Max CP:</b> {pokemon.maxCP}</p>
                <p><b>Max HP:</b> {pokemon.maxHP}</p>
              </div>
            </Fragment>
          )
        }
      </div>
    </Modal>
  );
}

export const PokemonList = () => {
  const navigate = useNavigate();
  const classes = useStyles();
  const params = useParams();
  const { pokemons, loading } = useGetPokemons();
  const [searchValue, setSearchValue] = useState('');
  const { isOpen, openModal, closeModal } = useModal();

  const handleClickOutOfPokemon = () => {
    navigate('/pokemon');
  };

  const handleClickPokemon = (pokemon: TypePokemon) => {
    navigate(`/pokemon/${pokemon.id}`);
  };

  const handleSearchPokemon = (value: string) => {
    setSearchValue(value.toLowerCase());
  };

  useEffect(() => {
    if (params.id && !isOpen) {
      openModal();
    } else if (!params.id && isOpen) {
      closeModal();
    }
  }, [params.id, isOpen, openModal, closeModal]);


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
        onChange={handleSearchPokemon}
        inputDebounce={300}
      />
      <div className={classes.pokemonContainer}>
        {filteredPokemons.map((pkmn) => (
          <PokemonTile
            key={`pokemon-${pkmn.id}`}
            pokemon={pkmn}
            classes={classes}
            onClick={handleClickPokemon}
          />
        ))}
      </div>
      <PokemonDetailsModal
        isOpen={isOpen}
        closeModal={handleClickOutOfPokemon}
        pokemonId={params.id}
        classes={classes}
      />
    </div>
  );
};

const useStyles = createUseStyles(
  styles,
  { name: 'PokemonList' }
);
