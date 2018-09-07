import React from 'react';
import {Button} from '@shopify/polaris';

export default function GameItem({onAddGame, game: {name}}) {
  return (
    <li>
      <p>{name}</p>
      <Button
        onClick={() => {
          onAddGame(name);
        }}
      >
        Create product
      </Button>
    </li>
  );
}
