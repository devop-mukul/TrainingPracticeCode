import { useCart } from '../context/cartContext';

export default function HeaderCart() {
    const { state } = useCart();
    const totalItems = state.items.reduce((sum, item) => sum + item.qty, 0);

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between' }}>
            <h2>Tapri Cafe</h2>
            <div>Total Items: <strong>{totalItems}</strong></div>
        </header>
    );
}
