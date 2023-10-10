const searchButton = document.getElementById('searchButton');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonInfo = document.getElementById('pokemonInfo');

searchButton.addEventListener('click', () => {
    const pokemonName = pokemonNameInput.value.toLowerCase();
    if (pokemonName) {
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Pokemon not found');
                }
                return response.json();
            })
            .then(data => {
                pokemonInfo.innerHTML = `
                    <h2>${data.name}</h2>
                    <img src="${data.sprites.front_default}" alt="${data.name}">
                    <p>Height: ${data.height} decimetres</p>
                    <p>Weight: ${data.weight} hectograms</p>
                `;
            })
            .catch(error => {
                pokemonInfo.innerHTML = `<p>${error.message}</p>`;
            });
    }
});