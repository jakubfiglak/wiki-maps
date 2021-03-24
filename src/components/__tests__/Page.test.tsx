import { render, screen } from '@testing-library/react';
import { Page } from '../Page';

const originalNavigator = global.navigator;

const mockNavigator: Navigator = {
  ...originalNavigator,
  geolocation: {
    getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
      Promise.resolve(
        success({
          coords: {
            latitude: 51.1,
            longitude: 45.3,
          },
        })
      )
    ),
    clearWatch: jest.fn(),
    watchPosition: jest.fn(),
  },
};

test('renders app logo', () => {
  global.navigator = mockNavigator;
  render(<Page />);
  const logo = screen.getByText(/wikipedia map/i);
  expect(logo).toBeInTheDocument();
});

test('renders the map', () => {
  global.navigator = mockNavigator;
  render(<Page />);
  screen.debug();
});
