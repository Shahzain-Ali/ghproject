'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';

export interface WishlistItem extends Product {
  addedAt: Date;
  isWishlisted: boolean;
}

interface WishlistState {
  wishlist: WishlistItem[];
}

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] }
  | { type: 'UPDATE_WISHLIST'; payload: WishlistItem }
  | { type: 'RESET_WISHLIST' };

interface WishlistContextType {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

const initialState: WishlistState = {
  wishlist: []
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existingItem = state.wishlist.find(item => item._id === action.payload._id);
      
      if (existingItem) {
        return state;
      }

      // Convert Product to WishlistItem when adding
      const wishlistItem: WishlistItem = {
        ...action.payload,
        addedAt: new Date(),
        isWishlisted: true
      };

      return {
        ...state,
        wishlist: [...state.wishlist, wishlistItem]
      };
    }

    case 'REMOVE_FROM_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload)
      };
    }

    case 'UPDATE_WISHLIST': {
      return {
        ...state,
        wishlist: state.wishlist.map(item =>
          item._id === action.payload._id ? action.payload : item
        )
      };
    }

    case 'SET_WISHLIST': {
      // Ensure all items have proper properties
      const wishlistWithDates = action.payload.map(item => ({
        ...item,
        addedAt: item.addedAt ? new Date(item.addedAt) : new Date(),
        isWishlisted: true
      }));
      
      return {
        ...state,
        wishlist: wishlistWithDates
      };
    }

    case 'CLEAR_WISHLIST':
    case 'RESET_WISHLIST':
      return initialState;

    default:
      return state;
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  // Load wishlist from localStorage on initial mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) {
          dispatch({ type: 'SET_WISHLIST', payload: parsedWishlist });
        }
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem('wishlist', JSON.stringify(state.wishlist));
    } catch (error) {
      console.error('Failed to save wishlist to localStorage:', error);
    }
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider value={{ state, dispatch }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
}