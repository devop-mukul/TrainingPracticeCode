import { createContext, useContext, useReducer } from 'react';

// 1. Context Create Kiya
const CartContext = createContext();

// 2. Initial State Define Ki
const initialState = {
    items: [], // [{ id: 1, name: 'Chai', price: 20, qty: 1 }]
};

// 3. Reducer (Hamara Smart Cashier)
function cartReducer(state, action) {
    switch (action.type) {
        case 'ADD_TO_CART': {
            const existingItem = state.items.find(item => item.id === action.payload.id);
            if (existingItem) {
                return {
                    ...state,
                    items: state.items.map(item =>
                        item.id === action.payload.id ? { ...item, qty: item.qty + 1 } : item
                    ),
                };
            }
            return {
                ...state,
                items: [...state.items, { ...action.payload, qty: 1 }],
            };
        }
        case 'REMOVE_FROM_CART':
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload),
            };
        case 'CLEAR_CART':
            return { items: [] };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

// 4. Provider Component jo state aur dispatch ko context mein pass karega
export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, initialState);

    return (
        <CartContext.Provider value={{ state, dispatch }}>
            {children}
        </CartContext.Provider>
    );
}

// 5. Custom Hook for easy usage (Superpower Hack!)
export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}
