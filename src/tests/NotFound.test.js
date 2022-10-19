import React from 'react';
import { screen, act } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('4 - Teste o componente <NotFound />', () => {
  it('Verifique se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/page/not-found'); // qlqr endereço inexistente
    });

    const notFoundTitle = screen.getByRole('heading', { name: 'Page requested not found' });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Verifique se a página mostra uma imagem específica', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/page/not-found'); // qlqr endereço inexistente
    });

    const notFoundImg = screen.getByRole('img');
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
