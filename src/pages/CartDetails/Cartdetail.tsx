import { useCart } from './CartProvider';
import { useNavigate } from 'react-router-dom';
import './CartDetails.css'

function Cartdetail() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const handleIncreaseQuantity = (productId: number) => {
      const productToAdd = cartItems.find((item) => item.product.id === productId)?.product;
    if (productToAdd) {
      addToCart(productToAdd);
    }
  };

  const handleDecreaseQuantity = (productId: number) => {
    removeFromCart(productId);
  };

  const handleClearCart = () => {
    clearCart();
  };

  const navigate = useNavigate();

  const handleFinishPurchase = () => {
    clearCart();
    navigate('/finish');
  };

  return (
    <div className="cart-detail-container">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item.product.id} className="cart-item">
              <div className="item-info">
                <h3>{item.product.title}</h3>
                <p>Price: ${item.product.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Subtotal: ${item.totalPrice.toFixed(2)}</p>
              </div>
              <div className="item-actions">
                <button onClick={() => handleIncreaseQuantity(item.product.id)}>+</button>
                <button onClick={() => handleDecreaseQuantity(item.product.id)}>-</button>
              </div>
            </div>
          ))}
          <div className="cart-actions">
            <button onClick={handleClearCart}>Clear Cart</button>
            <button onClick={handleFinishPurchase}>Finish</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cartdetail;