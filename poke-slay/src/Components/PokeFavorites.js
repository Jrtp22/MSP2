import axios from 'axios';
import React, { useState, useEffect } from 'react';

function PokeFavorites() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        axios.get('/poke')
            .then((response) => {
                setFavorites(response.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h2>Favorite Pokémon List</h2>
            <ul>
                {favorites.map((favorite) => (
                    <li key={favorite._id}>
                        <p>Name: {favorite.name}</p>
                        <p>Abilities: {favorite.abilities.join(', ')}</p>
                        <p>Forms: {favorite.forms.join(', ')}</p>
                        <p>Moves: {favorite.moves.join(', ')}</p>
                        <p>Species Name: {favorite.species.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PokeFavorites;
