import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

const pokemon = pokemons[0];

describe('6 - Teste o componente <Pokemon />', () => {
  it('Verifique se é renderizado um card com as informações de determinado pokémon: nome, tipo, peso médio e imagem.', () => {
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        showDetailsLink
        isFavorite
      />,
    );
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent('Pikachu');

    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Electric');

    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');

    const pokemonImg = screen.getByAltText('Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Verifique se o card do pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste pokémon', () => {
    const { history } = renderWithRouter(
      <App // App -> Pokedex -> PokemonCard contém link details.
        pokemons={ pokemon }
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
    renderWithRouter(
      <Pokemon
        pokemon={ pokemon }
        isFavorite
      />,
    );
    // A imagem deve ter o  alt igual a < pokemon > is marked as favorite, onde < pokemon > é o nome do pokémon exibido.
    // O ícone deve ser uma imagem com o atributo src contendo o caminho / star - icon.svg;
    const pokeImgFave = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokeImgFave).toBeInTheDocument();
    expect(pokeImgFave).toBeEmptyDOMElement('img');
    expect(pokeImgFave).toHaveAttribute('src', '/star-icon.svg');
  });
});
