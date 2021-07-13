import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Site', () => {
  render(<App />);
  const linkElement = screen.getByText("Generate");
  expect(linkElement).toBeInTheDocument();
});
