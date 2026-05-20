import React, { createContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = { items: [] };
// [{ id: 1, name: 'Chai', price: 20, qty: 1 }]

function cartReducer(state, action) {
    console.log("state->", state, "\naction->", action);

    if (action.type === 'ADD_CART') {
        const existingItemIndex = state.items.find(item => item.id === action.payload.id)
        console.log(existingItemIndex);
        if (existingItemIndex) {
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                )
            }
        } else {
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: 1 }]
            }
        }

    }
}

export function CartContextProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState)

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext