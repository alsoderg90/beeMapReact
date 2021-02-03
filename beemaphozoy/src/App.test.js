import { render, screen } from '@testing-library/react';
import App from './App'

test('Page loaded', () => {
  render(<App />)
  const linkElement = screen.getByText("Map")
  expect(linkElement).toBeInTheDocument()
})

