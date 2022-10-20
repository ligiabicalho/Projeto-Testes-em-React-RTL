import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

// Componente é renderizado a partir do App, acessando a URL /pokemons/25 -> Pikachu, antes de cada testes.
beforeEach(() => {
  const { history } = renderWithRouter(<App />);
  act(() => {
    history.push('/pokemons/25');
  });
});

describe('7- Teste o componente <PokemonDetails />', () => {
  it('Verifique se as informações detalhadas do pokémon selecionado são mostradas na tela.', () => {
    // A página deve conter um texto < name > Details, onde < name > é o nome do pokémon;
    const textDetails = screen.getByText('Pikachu Details');
    expect(textDetails).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do pokémon selecionado;
    const detailsLink = screen.queryByRole('link', { name: 'More details', href: '/pokemons/25' });
    expect(detailsLink).not.toBeInTheDocument();

    // A seção de detalhes deve conter um heading h2 com o texto Summary;
    const headingSummary = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(headingSummary).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do pokémon específico sendo visualizado.
    const summaryPoke = screen.getByText(/roasts hard berries with electricity/i);
    expect(summaryPoke).toBeInTheDocument();
  });
  it('Verifique se existe na página uma seção com os mapas contendo as localizações do pokémon', () => {
    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of < name > do pokémon exibido;
    const headingLocation = screen.getByRole('heading', { name: 'Game Locations of Pikachu', level: 2 });
    expect(headingLocation).toBeInTheDocument();

    // Todas as localizações do pokémon devem ser mostradas na seção de detalhes;
    // Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização;
    // A imagem da localização deve ter um atributo src com a URL da localização;
    // A imagem da localização deve ter um atributo alt com o texto < name > location;
    pokemons[0].foundAt.forEach((habitat, i) => {
      const textLocation = screen.getByText(habitat.location);
      expect(textLocation).toBeInTheDocument();
      const imgs = screen.getAllByRole('img');
      expect(imgs[i + 1]).toHaveAttribute('src', `${habitat.map}`);
      expect(imgs[i + 1]).toHaveAttribute('alt', 'Pikachu location');
    });
  });
  it('Verifique se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    // A página deve exibir um checkbox que permite favoritar o pokémon;
    // O label do checkbox deve conter o texto Pokémon favoritado?.
    const favePoke = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
    expect(favePoke).toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o pokémon da lista de favoritos;
    userEvent.click(favePoke);
    const pokeImgFave = screen.getByAltText('Pikachu is marked as favorite');
    expect(pokeImgFave).toBeInTheDocument();

    userEvent.click(favePoke);
    const pokeImgNotFave = screen.queryByAltText('Pikachu is marked as favorite');
    expect(pokeImgNotFave).not.toBeInTheDocument();
  });
});
