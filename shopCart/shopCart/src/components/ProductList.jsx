import { useCart } from '../context/cartContext';

const products = [
    { id: 1, name: 'Special Masala Chai', price: 20 },
    { id: 2, name: 'Bun Maska', price: 30 },
];

export default function ProductList() {
    const { state, dispatch } = useCart();

    return (
        <main>
            <h3>MENU</h3>
            {products.map(product => (
                <div key={product.id}>
                    <span>{product.name} - ₹{product.price}</span>
                    <button
                        onClick={() => dispatch({ type: 'ADD_TO_CART', payload: product })}
                    >
                        Add To Cart +
                    </button>
                </div>
            ))}

            {state.items.length > 0 && (
                <button
                    onClick={() => dispatch({ type: 'CLEAR_CART' })}
                >
                    Clear Cart 🗑️
                </button>
            )}
        </main>
    );
}
