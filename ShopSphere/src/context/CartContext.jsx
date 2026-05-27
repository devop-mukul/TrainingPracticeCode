import { createContext, useState, useContext } from 'react'
 
import {ProductContext} from './ProductContext'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItem, setCartItem] = useState([])
    // console.log("cartItem",cartItem);
    
    const { products } = useContext(ProductContext)
    // console.log("products",products);
    
    // function handleDecrease(productId) {

    // }

    function handleIncrease(productId) {
        console.log("productid", productId);
        
        const selectedProduct = products.find((product) => {
            return product.id === productId
        })

        const existingItem = cartItem.find((item) => {
            return item.id === productId
        })

        if(existingItem) {
            const updatedItem = cartItem.map((item) => {
                if(item.id === productId) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item;
            })
            setCartItem(updatedItem)

        } else {
            setCartItem((prev) => [...prev, {...selectedProduct, quantity: 1}])
        }
    }

    const value = {
        cartItem,
        setCartItem,
        handleIncrease,
        // handleDecrease,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}