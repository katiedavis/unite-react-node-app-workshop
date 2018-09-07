import React from 'react';
import {ResourceList} from '@shopify/polaris';
import GameItem from './GameItem';

export default function GameList({games = [], onAddGame}) {
  const gameItems = games.map((game) => (
    <GameItem key={game.name} game={game} onAddGame={onAddGame} />
  ));

  return <ul>{gameItems}</ul>;
}
