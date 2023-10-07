document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search');
    const pokemonList = document.querySelector('.pokemon-list');

    const pokemonData = [
        { name: 'Pikachu', id: 25 },
        { name: 'Bulbasaur', id: 1 },
        { name: 'Charizard', id: 6 },
        // Add more Pokémon data here
    ];

    searchButton.addEventListener('click', function () {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredPokemon = pokemonData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
        
        displayPokemonList(filteredPokemon);
    });

    function displayPokemonList(pokemonArray) {
        pokemonList.innerHTML = '';
        pokemonArray.forEach(pokemon => {
            const listItem = document.createElement('li');
            listItem.textContent = `${pokemon.name} (#${pokemon.id})`;
            pokemonList.appendChild(listItem);
        });
    }

    displayPokemonList(pokemonData);
});

document.addEventListener('DOMContentLoaded', function () {
    // ...

    const typeFilter = document.getElementById('type-filter');

    typeFilter.addEventListener('change', function () {
        const selectedType = typeFilter.value;
        const filteredPokemon = filterPokemonByType(selectedType);
        
        displayPokemonList(filteredPokemon);
    });

    function filterPokemonByType(type) {
        if (type === 'all') {
            return pokemonData;
        } else {
            return pokemonData.filter(pokemon => {
                return pokemon.types.includes(type);
            });
        }
    }
});

// Add this code after the previous JavaScript code
document.addEventListener('DOMContentLoaded', function () {
    // ...

    const pokemonList = document.querySelector('.pokemon-list');
    const loadMoreButton = document.getElementById('load-more');
    let offset = 0;
    const limit = 30;

    loadMoreButton.addEventListener('click', loadMorePokemon);

    function loadMorePokemon() {
        fetchPokémon(offset, limit)
            .then(pokemonData => {
                if (pokemonData.length === 0) {
                    loadMoreButton.disabled = true;
                    loadMoreButton.textContent = 'No more Pokémon';
                } else {
                    pokemonData.forEach(pokemon => {
                        displayPokemon(pokemon);
                    });
                    offset += limit;
                }
            })
            .catch(error => {
                console.error('Error loading Pokémon:', error);
            });
    }

    function fetchPokémon(offset, limit) {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`;
        return fetch(url)
            .then(response => response.json())
            .then(data => data.results)
            .then(pokemonArray => {
                return Promise.all(pokemonArray.map(pokemon => fetch(pokemon.url).then(response => response.json())));
            });
    }

    function displayPokemon(pokemon) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <span>${pokemon.name}</span>
        `;
        pokemonList.appendChild(listItem);
    }

    loadMorePokemon(); // Load the first batch of Pokémon on page load
});

