import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Site', () => {
  render(<App />);
  const linkElement = screen.getByText("Pass phrase generator");
  expect(linkElement).toBeInTheDocument();
});
