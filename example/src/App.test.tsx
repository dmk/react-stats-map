import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app without crashing', () => {
  render(<App />);
  const element = screen.getByText(/For the best experience/i);
  expect(element).toBeTruthy();
});
