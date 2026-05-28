import { createContext, useContext, useMemo, useState } from 'react'
 
import {ProductContext} from './ProductContext'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItem, setCartItem] = useState([])

    const { products } = useContext(ProductContext)

    function handleIncrease(productId) {
        const selectedProduct = products.find((product) => {
            return product.id === productId
        })

        if (!selectedProduct) {
            return
        }

        const existingItem = cartItem.find((item) => {
            return item.id === productId
        })

        if (existingItem) {
            const updatedItem = cartItem.map((item) => {
                if (item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item;
            })
            setCartItem(updatedItem)
        } else {
            setCartItem((prev) => [...prev, { ...selectedProduct, quantity: 1 }])
        }
    }

    function handleDecrease(productId) {
        setCartItem((prev) => {
            return prev
                .map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1
                        }
                    }

                    return item
                })
                .filter((item) => item.quantity > 0)
        })
    }

    function removeFromCart(productId) {
        setCartItem((prev) => prev.filter((item) => item.id !== productId))
    }

    function clearCart() {
        setCartItem([])
    }

    const totalItems = useMemo(() => {
        return cartItem.reduce((total, item) => total + item.quantity, 0)
    }, [cartItem])

    const subtotalInr = useMemo(() => {
        return cartItem.reduce((total, item) => total + item.price * 90 * item.quantity, 0)
    }, [cartItem])

    const value = {
        cartItem,
        handleIncrease,
        handleDecrease,
        removeFromCart,
        clearCart,
        totalItems,
        subtotalInr,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}