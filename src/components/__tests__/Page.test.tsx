import { render, screen } from '@testing-library/react';
import { Page } from '../Page';

beforeEach(() => {
  render(<Page />);
});

test('renders app logo', () => {
  const logo = screen.getByText(/wikipedia map/i);
  expect(logo).toBeInTheDocument();
});

test.todo('renders the map');
