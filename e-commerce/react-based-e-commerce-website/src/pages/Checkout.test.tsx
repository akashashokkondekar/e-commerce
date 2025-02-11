// src/components/Checkout.test.tsimport { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavBar from '../components/NavBar';

describe('Checkout Component', () => {
  it('displays the correct total price', () => {
    const mockCartItems = [
      { id: 1, name: 'Product 1', price: 10, quantity: 2 },
      { id: 2, name: 'Product 2', price: 20, quantity: 1 },
    ];

    render(<NavBar basketItems={mockCartItems} />);

    // Check if total is displayed correctly
    const totalElement = screen.getByText('Total: $40.00');
    expect(totalElement).toBeInTheDocument();
  });
});
