import React from 'react';
import Pokemon from '.App.js';
import PokeList from './PokeList';

const OnePoke = () => {
  return (
    <div>
      <h1>Pokemon Information</h1>
      <Pokemon wartortle="wartortle" /> {}
    </div>
  );
};

export default OnePoke;