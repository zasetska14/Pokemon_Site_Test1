const API_URL = '/Pokemon/GetAll';
const pokemonList = document.getElementById('pokemon-list');
const pokemonSearch = document.getElementById('search');
const typeFilters = document.getElementById('type-filtres');


  const response = await fetch(API_URL);
  const data = await response.json();
  const pokemons = await Promise.all(data.results.map(async (pokemon) => {
    const pokemonDetails = await fetch(pokemon.url);    
    return await pokemonDetails.json(); 
  }));
  //console.log(pokemons);  
  displayPokemon(pokemons);

function displayPokemon(pokemon) {

    pokemonList.innerHTML = '';

    for (let i = 0; i < pokemon.length; i++) {
        const pockemonElement= document.createElement('article');
        
        const imageElement = document.createElement('img');
        imageElement.src = pokemon[i].sprites.front_default;
        
        const nameElement = document.createElement('h3');
        nameElement.innerText = pokemon[i].name;

        const typeElement = document.createElement('p');
        typeElement.innerText = 'Type: ' + pokemon[i].types.map(typeInfo => typeInfo.type.name).join(', ');

        pokemonList.appendChild(pockemonElement);
        pockemonElement.appendChild(imageElement);
        pockemonElement.appendChild(nameElement);
        pockemonElement.appendChild(typeElement);
    }


}

//From A to Z sorting;
const boutonTrierCrois = document.querySelector('#trier-crois');
boutonTrierCrois.addEventListener('click', () => {
    const pokemon = Array.from(pokemons);
    pokemon.sort((a, b) => a.name.localeCompare(b.name));
    pokemonList.innerHTML = '';
    displayPokemon(pokemon);
});

//From Z to A sorting;
const boutonTrierDecrois = document.querySelector('#trier-decrois');
boutonTrierDecrois.addEventListener('click', () => {
    const pokemon = Array.from(pokemons);
    pokemon.sort((a, b) => b.name.localeCompare(a.name));
    pokemonList.innerHTML = '';
    displayPokemon(pokemon);
})

//Searching
window.pokemons = pokemons; // Make pokemons accessible globally
const boutonSearch = document.querySelector('#filtrer');


boutonSearch.addEventListener('click', () => {
    const checkedTypes = Array.from(typeFilters.querySelectorAll('input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.id); // or use checkbox.name

    console.log('Selected types:', checkedTypes);
    const searchTerm = pokemonSearch.value.toLowerCase();
    const filteredPokemons = window.pokemons.filter(pokemon => 
        pokemon.name.toLowerCase().includes(searchTerm) && pokemon.types.some(t => checkedTypes.includes(t.type.name)) 
    );
    displayPokemon(filteredPokemons);
});

//Reset button
const boutonReset = document.querySelector('#reset');
boutonReset.addEventListener('click', () => {
    pokemonSearch.value = '';
    displayPokemon(window.pokemons);
});