import { render, screen } from '@testing-library/react';
import App from '../App';

//fixme add full test suite for each component
test('renders title', () => {
  render(<App />);
  const linkElement = screen.getByText(/MovieR/i);
  expect(linkElement).toBeInTheDocument();
});
