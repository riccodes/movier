import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders titles', () => {
  render(<App />);
  const linkElement = screen.getByText(/Prey/i);
  expect(linkElement).toBeInTheDocument();
});
