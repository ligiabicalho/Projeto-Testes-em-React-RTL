import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokedex from '../pages/Pokedex';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('5- Teste o componente <Pokedex />', () => {
  it('Verifique se a página contém um heading h2 com o texto Encountered pokémons', () => {
    const isPokemonFavoriteById = {};
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const encounteredTitle = screen.getByRole('heading', { level: 2 });
    expect(encounteredTitle).toHaveTextContent('Encountered pokémons');
  });

  it('Verifique se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    const isPokemonFavoriteById = {};
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    for (let i = 0; i < pokemons.length; i += 1) {
      const poke1 = screen.getByText(pokemons[i].name);
      expect(poke1).toBeInTheDocument();

      const btnProx = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btnProx);

      const index = (i + 1) % pokemons.length;
      const poke2 = screen.getByText(pokemons[index].name);
      expect(poke2).toBeInTheDocument();
    }
  });

  it('Verifique se é mostrado apenas um pokémon por vez', () => {
    const isPokemonFavoriteById = {};
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const poke = screen.getAllByText(pokemons[0].name);
    expect(poke).toHaveLength(1);

    const poke1 = screen.getByText(pokemons[0].name);
    expect(poke1).toBeInTheDocument();

    const poke2 = screen.queryByText(pokemons[1].name);
    expect(poke2).not.toBeInTheDocument();
  });

  it('Verifique se a Pokédex tem os botões de filtro', () => {
    // melhorar?
    const isPokemonFavoriteById = {};
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const btnsType = screen.getAllByTestId('pokemon-type-button');
    expect(btnsType).toHaveLength(7);
    expect(btnsType[1]).toHaveTextContent('Fire');

    userEvent.click(btnsType[1]);
    const pokeTypeTestId = 'pokemon-type';

    const pokeType = screen.getByTestId(pokeTypeTestId);
    expect(pokeType).toHaveTextContent('Fire');

    const btnProx = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(btnProx);

    const pokeType2 = screen.getByTestId(pokeTypeTestId);
    expect(pokeType2).toHaveTextContent('Fire');
    // expect(pokeType2).not.toHaveTextContent('Electric');

    const btnAll2 = screen.getByRole('button', { name: 'All' });
    expect(btnAll2).toBeInTheDocument();
  });

  it('Verifique se a Pokédex contém um botão para resetar o filtro', () => {
    // melhorar!?
    const isPokemonFavoriteById = {};
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toHaveTextContent('Electric');
  });
});
