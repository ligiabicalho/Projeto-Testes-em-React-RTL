import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('5- Teste o componente <Pokedex />', () => {
  const pokeTypeTestId = 'pokemon-type';

  it('Verifique se a página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const encounteredTitle = screen.getByRole('heading', { name: 'Encountered pokémons', level: 2 });
    expect(encounteredTitle).toBeInTheDocument();
  });

  it('Verifique se é exibido o próximo pokémon da lista quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    //  O botão deve conter o texto Próximo pokémon;
    //  Os próximos pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    //  O primeiro pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último pokémon da lista.

    pokemons.forEach((poke, i) => {
      poke = screen.getByText(poke.name);
      expect(poke).toBeInTheDocument();

      const btnProx = screen.getByRole('button', { name: 'Próximo pokémon' });
      userEvent.click(btnProx);

      const index = (i + 1) % pokemons.length;
      const poke2 = screen.getByText(pokemons[index].name);
      expect(poke2).toBeInTheDocument();
    });
  });

  it('Verifique se é mostrado apenas um pokémon por vez', () => {
    renderWithRouter(<App />);

    const pokesDisplayed = screen.getAllByTestId('pokemon-name');
    expect(pokesDisplayed).toHaveLength(1);

    const poke1 = screen.getByText(pokemons[0].name);
    expect(poke1).toBeInTheDocument();

    const poke2 = screen.queryByText(pokemons[1].name);
    expect(poke2).not.toBeInTheDocument();
  });

  it('Verifique se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();

    const btnsType = screen.getAllByTestId('pokemon-type-button');
    expect(btnsType).toHaveLength(7);
    expect(btnsType[0]).toHaveTextContent('Electric');
    expect(btnsType[1]).toHaveTextContent('Fire');
    expect(btnsType[2]).toHaveTextContent('Bug');
    expect(btnsType[3]).toHaveTextContent('Poison');
    expect(btnsType[4]).toHaveTextContent('Psychic');
    expect(btnsType[5]).toHaveTextContent('Normal');
    expect(btnsType[6]).toHaveTextContent('Dragon');

    userEvent.click(btnsType[1]);
    expect(btnAll).toBeInTheDocument();

    const pokeType = screen.getByTestId(pokeTypeTestId);
    expect(pokeType).toHaveTextContent('Fire');

    const btnProx = screen.getByRole('button', { name: 'Próximo pokémon' });
    userEvent.click(btnProx);

    const pokeType2 = screen.getByTestId(pokeTypeTestId);
    expect(pokeType2).toHaveTextContent('Fire');

    expect(btnAll).toBeInTheDocument();
  });

  it('Verifique se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const btnsType = screen.getAllByTestId('pokemon-type-button');
    userEvent.click(btnsType[3]);

    const pokeTypePoison = screen.getByTestId(pokeTypeTestId);
    expect(pokeTypePoison).toHaveTextContent('Poison');

    const btnAll = screen.getByRole('button', { name: 'All' });
    expect(btnAll).toBeInTheDocument();
    userEvent.click(btnAll);

    const pokeTypeNotPoison = screen.queryByTestId(pokeTypeTestId);
    expect(pokeTypeNotPoison).not.toHaveTextContent('Poison');
  });
});
