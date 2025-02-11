import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from './../app/store';
import MiniBasket from './MiniBasket';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { InitialReduxStateValues, TotalPriceText, YourBasketText } from '../utils/AppConstant';
import { addItem, clearBasket } from '../features/basket/basketSlice';

describe('MiniBasket Component - Unit Test cases', () => {
  it('Check if it iss correctly rendering multiple values or not', () => {

    const initialState = InitialReduxStateValues;
    render(
      <Provider store={{ ...store, getState: () => initialState }}>
        <MemoryRouter>
          <MiniBasket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(YourBasketText)).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
    expect(screen.getByText('$50.00')).toBeInTheDocument();
    expect(screen.getByText(`${TotalPriceText} $150.00`)).toBeInTheDocument();

  });

  it('Check if product quntity gets changed or not', async () => {

    const productItem = { id: '1', title: 'Test Product 1', price: 100, quantity: 1, currencyCode: '$' };

    store.dispatch(addItem(productItem));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MiniBasket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByTestId(/add-item_1/i)).toBeDefined();
    await fireEvent.click(screen.getByRole("button", { name: /add-item_1/i }));
    expect(screen.getByText('2')).toBeInTheDocument();
  });
});

describe('MiniBasket Integration Test', () => {

  it('should add an item to the basket and remove it', async () => {
  
    store.dispatch(clearBasket());
    const product = { id: '1', title: 'Test Product 1', price: 100, quantity: 1, currencyCode: '$' };
    store.dispatch(addItem(product));

    render(
      <Provider store={store}>
        <MemoryRouter>
          <MiniBasket />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Test Product 1/i)).toBeInTheDocument();
    
    expect(screen.getByTestId(/add-item_1/i)).toBeDefined();
    await fireEvent.click(screen.getByRole("button", { name: /minus-item_1/i }));
    
    await waitFor(() => {
      expect(screen.queryByText(/Test Product 1/i)).not.toBeInTheDocument();  // Check that the item is removed
    });
  });
});
