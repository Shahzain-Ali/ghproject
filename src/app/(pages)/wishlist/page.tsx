"use client"

// wishlistContext.tsx
import React, { createContext, useContext, useReducer } from 'react';
import { Product } from '@/app/types/Product';

type WishlistState = {
  wishlist: Product[];
};

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' };

const WishlistContext = createContext<{
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
} | undefined>(undefined);

const initialState: WishlistState = {
  wishlist: []
};

const wishlistReducer = (state: WishlistState, action: WishlistAction): WishlistState => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST':
      // Prevent duplicates
      const exists = state.wishlist.some(item => item._id === action.payload._id);
      if (exists) return state;
      
      const newState = {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(newState));
      }
      return newState;

    case 'REMOVE_FROM_WISHLIST':
      const updatedState = {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload)
      };
      // Save to localStorage immediately
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify(updatedState));
      }
      return updatedState;

    case 'CLEAR_WISHLIST':
      if (typeof window !== 'undefined') {
        localStorage.setItem('wishlist', JSON.stringify({ wishlist: [] }));
      }
      return { ...state, wishlist: [] };

    default:
      return state;
  }
};

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage
  const [state, dispatch] = useReducer(wishlistReducer, initialState, () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('wishlist');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return initialState;
        }
      }
    }
    return initialState;
  });

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};