import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Products } from '../../../@types';

interface CartContextType {
  cart: Products[];
  addToCart: (product: Products) => void;
  removeFromCart: (productId: string) => void;
  setCartCountNav: (value: number) => void;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<Products[]>([]);
  const [cartCount, setCartCount] = useState(0);

  const addToCart = (product: Products) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: string) => {
    const updatedCart = cart.filter((product) => product.id !== productId);
    setCart(updatedCart);
  };

  const setCartCountNav = (value: number) => {
    setCartCount(value);
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, setCartCountNav, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
