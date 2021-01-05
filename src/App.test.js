import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Site', () => {
  render(<App />);
  const linkElement = screen.getByText(/Password Generator/i);
  expect(linkElement).toBeInTheDocument();
});
