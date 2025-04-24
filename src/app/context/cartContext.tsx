// context/cartContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'CLEAR_CART' }
  | { type: 'SET_CART'; payload: CartItem[] }
  | { type: 'UPDATE_CART'; payload: CartItem }
  | { type: 'RESET_CART' };

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialState: CartState = {
  cart: []
};

const CartContext = createContext<CartContextType | undefined>(undefined);

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(cartItem => cartItem._id === action.payload._id);
      
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(cartItem =>
            cartItem._id === action.payload._id
              ? { ...cartItem, quantity: cartItem.quantity + action.payload.quantity }
              : cartItem
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, action.payload]
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item._id !== action.payload)
      };

    case 'UPDATE_CART':
      return {
        ...state,
        cart: state.cart.map(item =>
          item._id === action.payload._id ? action.payload : item
        )
      };

    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };

    case 'CLEAR_CART':
    case 'RESET_CART':
      return initialState;

    default:
      return state;
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        dispatch({ type: 'SET_CART', payload: JSON.parse(savedCart) });
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(state.cart));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}