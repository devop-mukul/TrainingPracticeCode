import React, { useContext } from 'react';
import CartContext from '../context/CartContext'

function ProductList() {
    const { dispatch } = useContext(CartContext)

    // console.log("dispatch===>", dispatch);
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
        </>
    )
}

export default ProductList