import { CartProvider } from './context/cartContext';
import HeaderCart from './components/HeaderCart';
import ProductList from './components/ProductList';

export default function App() {
  return (
    <CartProvider>
      <HeaderCart />
      <ProductList />
    </CartProvider>
  );
}
