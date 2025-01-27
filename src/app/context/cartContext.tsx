// context/cartContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';

// Type Definitions (same as before)
export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
}

interface CartAction {
  type: 'ADD_TO_CART' | 'REMOVE_FROM_CART' | 'CLEAR_CART' | 'SET_CART' | 'UPDATE_CART';
  payload?: CartItem | string | CartItem[];
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
}

const initialState: CartState = {
  cart: []
};

// Create Context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Reducer Function (same as before)
function cartReducer(state: CartState, action: CartAction): CartState {
    // ... (same reducer logic as before)
    switch (action.type) {
        case 'ADD_TO_CART':
          if (!action.payload || typeof action.payload === 'string') return state;
          const item = action.payload as CartItem;
          const existingItem = state.cart.find(cartItem => cartItem._id === item._id);
          
          if (existingItem) {
            return {
              ...state,
              cart: state.cart.map(cartItem =>
                cartItem._id === item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              )
            };
          }
          return {
            ...state,
            cart: [...state.cart, { ...item, quantity: 1 }]
          };
    
        case 'REMOVE_FROM_CART':
          if (typeof action.payload !== 'string') return state;
          return {
            ...state,
            cart: state.cart.filter(item => item._id !== action.payload)
          };
    
        case 'UPDATE_CART':
          if (!action.payload || typeof action.payload === 'string') return state;
          const updateItem = action.payload as CartItem;
          return {
            ...state,
            cart: state.cart.map(item =>
              item._id === updateItem._id ? updateItem : item
            )
          };
    
        case 'SET_CART':
          if (!Array.isArray(action.payload)) return state;
          return {
            ...state,
            cart: action.payload
          };
    
        case 'CLEAR_CART':
          return {
            ...state,
            cart: []
          };
    
        default:
          return state;
      }
}

// Provider Component
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

// Custom Hook
export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}