'use client';

import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from '../types/Product';

// Fixed interface by adding a specific property for wishlist items
export interface WishlistItem extends Product {
    addedAt: Date;  // Track when item was added to wishlist
    isWishlisted: boolean; // Track wishlist status
}

interface WishlistState {
  wishlist: WishlistItem[];
}

type WishlistAction = 
  | { type: 'ADD_TO_WISHLIST'; payload: Product }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'CLEAR_WISHLIST' }
  | { type: 'SET_WISHLIST'; payload: WishlistItem[] };

interface WishlistContextType {
  state: WishlistState;
  dispatch: React.Dispatch<WishlistAction>;
}

const initialState: WishlistState = {
  wishlist: []
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

function wishlistReducer(state: WishlistState, action: WishlistAction): WishlistState {
  let newState: WishlistState;

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

      newState = {
        ...state,
        wishlist: [...state.wishlist, wishlistItem]
      };
      break;
    }

    case 'REMOVE_FROM_WISHLIST': {
      newState = {
        ...state,
        wishlist: state.wishlist.filter(item => item._id !== action.payload)
      };
      break;
    }

    case 'SET_WISHLIST': {
      newState = {
        ...state,
        wishlist: action.payload
      };
      break;
    }

    case 'CLEAR_WISHLIST': {
      newState = initialState;
      break;
    }

    default:
      return state;
  }

  try {
    localStorage.setItem('wishlist', JSON.stringify(newState.wishlist));
  } catch (error) {
    console.error('Failed to save wishlist to localStorage:', error);
  }

  return newState;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(wishlistReducer, initialState);

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        const parsedWishlist = JSON.parse(savedWishlist);
        if (Array.isArray(parsedWishlist)) {
          // Convert dates back to Date objects when loading from localStorage
          const wishlistWithDates = parsedWishlist.map(item => ({
            ...item,
            addedAt: new Date(item.addedAt)
          }));
          dispatch({ type: 'SET_WISHLIST', payload: wishlistWithDates });
        }
      }
    } catch (error) {
      console.error('Failed to load wishlist from localStorage:', error);
    }
  }, []);

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