import React from 'react';
import { render, screen } from '@testing-library/react';

import App from './App';

describe('App', () => {
  test('renders App component', () => {
    render(<App />);

    expect(screen.getByText(/Login/)).toBeInTheDocument(); //check to see if login btn is rendered
    screen.debug();
  });
});
