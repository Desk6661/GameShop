import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cart");

        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (game) => {
        setCart((currentCart) => {
            const alreadyInCart = currentCart.some(
                (item) => item._id === game._id
            );

            if (alreadyInCart) {
                return currentCart;
            }

            const updatedCart = [
                ...currentCart,
                {
                    ...game,
                    quantity: 1
                }
            ];

            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );

            return updatedCart;
        });
    };

    const removeFromCart = (gameId) => {
        setCart((currentCart) => {
            const updatedCart = currentCart.filter(
                (item) => item._id !== gameId
            );

            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );

            return updatedCart;
        });
    };

    const updateQuantity = (gameId, quantity) => {
        setCart((currentCart) => {
            const updatedCart = currentCart.map((item) =>
                item._id === gameId
                    ? {
                          ...item,
                          quantity
                      }
                    : item
            );

            localStorage.setItem(
                "cart",
                JSON.stringify(updatedCart)
            );

            return updatedCart;
        });
    };

    const clearCart = () => {
        localStorage.removeItem("cart");

        setCart([]);
    };

    const cartCount = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    return (
        <CartContext.Provider
            value={{
                cart,
                cartCount,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}