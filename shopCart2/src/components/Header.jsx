import React, { useContext } from 'react';
import CartContext from '../context/CartContext'

function Header() {
    const { state } = useContext(CartContext)

    const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0)
    return (
        <div style={{ backgroundColor: 'gray' }}>
            <header style={{
                display: 'flex',
                color: 'black',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <h3>Cafe</h3>
                <div>Item Total:{totalItems}</div>
            </header>
        </div>
    );
}

export default Header;