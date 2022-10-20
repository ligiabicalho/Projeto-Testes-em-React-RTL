import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('6 - Teste o componente <Pokemon />', () => {
  it('Verifique se é renderizado um card com as informações de determinado pokémon: nome, tipo, peso médio e imagem.', () => {
    const pokemon = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite={ false }
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByRole('img');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
  });

  it('Verifique se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    const isPokemonFavoriteById = {};
    const pokemon = pokemons[0];
    const { history } = renderWithRouter(
      <App // App -> Pokedex
        pokemons={ pokemon }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    // O link deve possuir a URL /pokemons/<id>, onde <id> é o id do pokémon exibido;
    const detailsLink = screen.getByRole('link', { name: 'More details', href: '/pokemons/25' });
    expect(detailsLink).toBeInTheDocument();

    // se ao clicar no link de navegação do pokémon, é feito o redirecionamento da aplicação para a página de detalhes
    userEvent.click(detailsLink);
    const detailsPage = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(detailsPage).toBeInTheDocument();

    // se a URL exibida no navegador muda para /pokemon/<id>
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/25');
  });

  it('Verifique se existe um ícone de estrela nos pokémons favoritados', () => {
    const pokemon = pokemons[0];
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    const pokeImgs = screen.getAllByRole('img');
    expect(pokeImgs).toHaveLength(2);
    // ◦ O ícone deve ser uma imagem com o atributo src contendo o caminho / star - icon.svg;
    expect(pokeImgs[1]).toHaveAttribute('src', '/star-icon.svg');
    // ◦ A imagem deve ter o  alt igual a < pokemon > is marked as favorite, onde < pokemon > é o nome do pokémon exibido.
    expect(pokeImgs[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
