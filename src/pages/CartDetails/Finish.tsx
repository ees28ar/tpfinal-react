import { useCart } from './CartProvider';
import { Link } from 'react-router-dom';

function Finish() {
  const { clearCart } = useCart();

  const handleClearCart = () => {
    clearCart();
  };

  return (
    <div className="checkout-container">
      <h1>Thank you for your purchase!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/">
        <button onClick={handleClearCart}>Continue Shopping</button>
      </Link>
    </div>
  );
}

export default Finish;

