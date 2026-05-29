import { createContext, useContext, useEffect, useMemo, useState } from 'react'
 
import {ProductContext} from './ProductContext'
import { supabase } from '../utils/supabaseClient'
import {
    addToCart,
    clearUserCart,
    fetchCartItems,
    removeCartItem,
    upsertCartItems,
    updateCartItemQuantity,
} from '../services/cartService'

export const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItem, setCartItem] = useState([])

    const { products } = useContext(ProductContext)

    function mapDbRowToCartItem(row) {
        const matchedProduct = products.find((product) => String(product.id) === String(row.product_id))

        return {
            id: row.product_id,
            cartRowId: row.id,
            user_id: row.user_id,
            product_id: row.product_id,
            title: row.title,
            price: Number(row.price),
            quantity: row.quantity,
            image: row.image,
            description: matchedProduct?.description ?? '',
            category: matchedProduct?.category ?? '',
            rating: matchedProduct?.rating ?? { rate: 0, count: 0 },
        }
    }

    function buildLocalCartItem(product, existingQuantity = 0) {
        return {
            ...product,
            cartRowId: null,
            quantity: existingQuantity + 1,
        }
    }

    function increaseLocalCart(productId) {
        const selectedProduct = products.find((product) => product.id === productId)

        if (!selectedProduct) {
            return
        }

        setCartItem((prev) => {
            const existingItem = prev.find((item) => item.id === productId)

            if (existingItem) {
                return prev.map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity + 1,
                        }
                    }

                    return item
                })
            }

            return [...prev, buildLocalCartItem(selectedProduct)]
        })
    }

    function decreaseLocalCart(productId) {
        setCartItem((prev) => {
            return prev
                .map((item) => {
                    if (item.id === productId) {
                        return {
                            ...item,
                            quantity: item.quantity - 1,
                        }
                    }

                    return item
                })
                .filter((item) => item.quantity > 0)
        })
    }

    async function getCurrentUserId() {
        const { data, error } = await supabase.auth.getUser()

        if (error || !data?.user) {
            return null
        }

        return data.user.id
    }

    async function loadCartItems() {
        // if (products.length === 0) {
        //     return;
        // }
        const userId = await getCurrentUserId();
        if (!userId) {
            setCartItem([]);
            return;
        }
        try {
            const rows = await fetchCartItems(userId);
            setCartItem(rows.map(mapDbRowToCartItem));
        } catch (error) {
            console.error('Error fetching cart items:', error.message);
        }
    }



    useEffect(() => {
        const { data: subscription } = supabase.auth.onAuthStateChange(() => {
            if (products.length > 0) {
                loadCartItems();
            }
        });
        return () => {
            subscription.subscription.unsubscribe();
        };
    }, [products.length]);

    useEffect(() => {
        if (products.length > 0) {
            loadCartItems();
        }
    }, [products]);

    async function handleIncrease(productId) {
        const selectedProduct = products.find((product) => {
            return product.id === productId
        })

        if (!selectedProduct) {
            return
        }

        const userId = await getCurrentUserId()

        if (!userId) {
            increaseLocalCart(productId)
            return
        }

        try {
            const updatedRow = await addToCart(userId, selectedProduct)
            const normalizedItem = mapDbRowToCartItem(updatedRow)

            setCartItem((prev) => {
                const exists = prev.find((item) => item.id === normalizedItem.id)

                if (exists) {
                    return prev.map((item) => item.id === normalizedItem.id ? normalizedItem : item)
                }

                return [...prev, normalizedItem]
            })
        } catch (error) {
            console.error('Error adding to cart:', error.message)
            increaseLocalCart(productId)
        }
    }

    async function handleDecrease(productId) {
        const existingItem = cartItem.find((item) => item.id === productId)

        if (!existingItem) {
            return
        }

        if (!existingItem.cartRowId) {
            decreaseLocalCart(productId)
            return
        }

        try {
            if (existingItem.quantity <= 1) {
                await removeCartItem(existingItem.cartRowId)
                setCartItem((prev) => prev.filter((item) => item.id !== productId))
                return
            }

            const updatedRow = await updateCartItemQuantity(existingItem.cartRowId, existingItem.quantity - 1)
            const normalizedItem = mapDbRowToCartItem(updatedRow)

            setCartItem((prev) => prev.map((item) => item.id === productId ? normalizedItem : item))
        } catch (error) {
            console.error('Error decreasing cart quantity:', error.message)
            decreaseLocalCart(productId)
        }
    }

    async function removeFromCart(productId) {
        const existingItem = cartItem.find((item) => item.id === productId)

        if (!existingItem) {
            return
        }

        if (!existingItem.cartRowId) {
            setCartItem((prev) => prev.filter((item) => item.id !== productId))
            return
        }

        try {
            await removeCartItem(existingItem.cartRowId)
            setCartItem((prev) => prev.filter((item) => item.id !== productId))
        } catch (error) {
            console.error('Error removing cart item:', error.message)
            setCartItem((prev) => prev.filter((item) => item.id !== productId))
        }
    }

    async function clearCart() {
        const userId = await getCurrentUserId()

        if (!userId) {
            setCartItem([])
            return
        }

        try {
            await clearUserCart(userId)
            setCartItem([])
        } catch (error) {
            console.error('Error clearing cart:', error.message)
            setCartItem([])
        }
    }

    async function saveCartBeforeCheckout() {
        const userId = await getCurrentUserId()

        if (!userId || cartItem.length === 0) {
            return true
        }

        try {
            const rows = await upsertCartItems(userId, cartItem)
            setCartItem(rows.map(mapDbRowToCartItem))//internally -> rows.map((row) => mapdbrowtocaritem(row))
            return true
        } catch (error) {
            console.error('Error saving cart before checkout:', error.message)
            return false
        }
    }

    const totalItems = useMemo(() => {
        return cartItem.reduce((total, item) => total + item.quantity, 0)
    }, [cartItem])

    const subtotalInr = useMemo(() => {
        return cartItem.reduce((total, item) => total + item.price * 90 * item.quantity, 0)
    }, [cartItem])

    const value = {
        cartItem,
        setCartItem,
        handleIncrease,
        handleDecrease,
        removeFromCart,
        clearCart,
        loadCartItems,
        saveCartBeforeCheckout,
        totalItems,
        subtotalInr,
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}