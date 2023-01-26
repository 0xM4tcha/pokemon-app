import axios from "axios";
import './style/style.css';
import './components/card-pokemon.js';
import './components/search-input.js';
import 'regenerator-runtime';
 
document.getElementById("body").onload = (() => {
  const url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=36';
  setPokemons(url);
});
 
const setPokemons = async(url) => {
  const { results, next, previous } = await getPokemons(url);
  setPageButton(previous, next);
  const main = document.getElementById('main');
  main.innerHTML = '<div></div>';
  const div = document.createElement('div');
  div.id = 'pokemon-wrapper';
  div.className = 'pokemon-wrapper';
  main.appendChild(div);
  for (let i = 0; i < results.length; i++) {
    const pokemonWrapper = document.getElementById('pokemon-wrapper');
    const pokemon = await getPokemons(results[i].url);
    const pokemonCard = document.createElement('card-pokemon');
    pokemonCard.id = `card-pokemon-${pokemon.id}`;
    pokemonCard.className = "card-pokemon";
    pokemonCard.style = `background-color: ${setBackgroundBasedOnType(pokemon.types[0].type.name)}`;
    pokemonCard.setAttribute('name', pokemon.name);
    pokemonCard.setAttribute('hp', pokemon.stats[0].base_stat);
    pokemonCard.setAttribute('image', pokemon.sprites.front_default);
    pokemonCard.setAttribute('atk', pokemon.stats[1].base_stat);
    pokemonCard.setAttribute('def', pokemon.stats[2].base_stat);
    const abilities = pokemon.abilities.map((ability) => {
      return `${ability.ability.name}`
    })
    pokemonCard.setAttribute('abilities', abilities);
    pokemonWrapper.appendChild(pokemonCard);
  }
}
 
const setPageButton = (previous, next) => {
  const nextButton = document.getElementById('button-next');
  const prevButton = document.getElementById('button-prev');
  if (previous) {
    prevButton.disabled = false;
    prevButton.onclick = (() => {
      setPokemons(previous);
    });
  } else {
    prevButton.disabled = true;
  }
  if (next) {
    nextButton.disabled = false;
    nextButton.onclick = (() => {
      setPokemons(next);
    });
  } else {
    nextButton.disabled = true;
  }
}
 
const getPokemons = async(url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.log('error', error);
  }
}
 
const setBackgroundBasedOnType = (type) => {
  switch (type) {
    case 'normal':
      return '#686868';
    case 'fighting':
      return '#bf4103';
    case 'flying':
      return '#2ee5e5';
    case 'poison':
      return '#c9557c';
    case 'ground':
      return '#d48f2b';
    case 'rock':
      return '#8a7a6a';
    case 'bug':
      return '#287727';
    case 'ghost':
      return '#570000';
    case 'steel':
      return '#74858c';
    case 'fire':
      return '#d80102';
    case 'water':
      return '#004ec6';
    case 'grass':
      return '#9dbd39';
    case 'electric':
      return '#f7ea4c';
    case 'psychic':
      return '#8202d0';
    case 'ice':
      return '#bef8fb';
    case 'dragon':
      return '#cbaa34';
    case 'dark':
      return '#0d2046';
    case 'fairy':
      return '#fca7d2';
    case 'unknown':
      return 'white';
    case 'shadow':
      return 'black';
    default :
      return 'white';
  }
}
 
const searchPokemon = document.getElementById('searchPokemon');
searchPokemon.addEventListener('submit', (event) => {
  const searchValue = document.getElementById('search-name').value;
  const pokemonList = document.querySelectorAll('card-pokemon');
  if (!searchValue) {
    pokemonList.style.display = 'block';
  }
  for (let i = 0; i < pokemonList.length; i++) {
    if (!pokemonList[i].name.toLowerCase().includes(searchValue.toLowerCase())) {
      const cardPokemon = document.getElementById(pokemonList[i].id)
      cardPokemon.style.display = 'none'
    }
  }
  event.preventDefault();
});