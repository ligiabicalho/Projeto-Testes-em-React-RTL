import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../pages';
import pokemons from '../data';

describe('3 - Teste o componente <FavoritePokemons />', () => {
  it('Verifique se é exibida na tela a mensagem `No favorite pokemon found`, caso a pessoa não tenha pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons pokemons={ [] } />);

    const noFavoritePokemons = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemons).toBeInTheDocument();
  });

  it('Verifique se são exibidos todos os cards de pokémons favoritados', () => {
    renderWithRouter(<FavoritePokemons pokemons={ pokemons } />);

    const favoritePokemons = screen.getAllByAltText(/is marked as favorite/i);
    expect(favoritePokemons).toHaveLength(pokemons.length);
  });
});
