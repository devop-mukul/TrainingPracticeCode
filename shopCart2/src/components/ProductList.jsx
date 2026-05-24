import React, { useContext } from 'react';
import CartContext from '../context/CartContext'

function ProductList() {
    const { state, dispatch } = useContext(CartContext)

    // const clearCart = () => {
    //     dispatch({ type: "CLEAR_CART" })//reducer ko signal bhejna
    // }
    return (
        <>
            <h3>Product List</h3>
            <ul>
                <div>Milk Latte   {" "}
                    <button
                        onClick={() => {
                            dispatch({
                                type: 'ADD_CART',
                                payload: { id: 1, name: 'Milk Latte', price: 50 }
                            })
                        }}>Add to Cart +</button>
                </div>
                <div>Milk Cappucino   {" "}
                    <button
                        onClick={() => {
                            dispatch({
                                type: "ADD_CART",
                                payload: { id: 2, name: "Milk Cappucino", price: 100 }
                            })
                        }}>Add to Cart +</button>
                </div>
            </ul>
            {state.items.length > 0 && (
                <button
                    onClick={() => dispatch({ type: "CLEAR_CART" })}>
                    Clear Cart
                </button>
            )}
        </>
    )
}

export default ProductList