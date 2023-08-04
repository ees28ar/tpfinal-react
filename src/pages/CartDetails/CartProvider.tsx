import React, { createContext, useState, useContext, useEffect } from 'react';
import { Product } from '../Products/Types';

type CartItem = {
  product: Product;
  quantity: number;
  totalPrice: number; 
};

type CartContextValue = {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});


const CART_STORAGE_KEY = 'cart';

const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    const existingProduct = cartItems.find((item) => item.product.id === product.id);
    if (existingProduct) {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
                totalPrice: (item.quantity + 1) * product.price,
              }
            : item
        )
      );
    } else {
      setCartItems((prevItems) => [
        ...prevItems,
        {
          product,
          quantity: 1,
          totalPrice: product.price, 
        },
      ]);
    }
  };
  
  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


const useCart = () => useContext(CartContext);

export { CartProvider, useCart };

