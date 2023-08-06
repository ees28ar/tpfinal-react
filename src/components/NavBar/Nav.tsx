import { Link } from 'react-router-dom';
import './Styles.css';
import AuthStatus from '../../pages/Auth/AuthStatus';
import { LOGO_API_URL } from '../../constants/constants';
import { useCart } from '../../pages/CartDetails/CartProvider'; 

function Nav() {
  const { cartItems } = useCart(); 

  
    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

     
      const totalPrice = cartItems.reduce((total, item) => total + item.totalPrice, 0);

  return (
    <div className="nav-container nav">
      <img className="avatar2" src={LOGO_API_URL} alt="Logo" />
      <AuthStatus />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li>
          <Link to="/categories">Categories</Link>
        </li>
        <li>
          <Link to="products/create">Create Products</Link>
        </li>
        <li>
          <Link to="categories/create">Create Categories</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        {/* Muestra la cantidad de productos del carrito y el total en pesos*/}
      <li>
        <Link to="/cartdetail">
          Cart <span className="cart-quantity">{totalQuantity}</span>
          <span className="cart-total-price"> ${totalPrice.toFixed(2)}</span>
        </Link>
      </li>
      </ul>
    </div>
  );
}

export default Nav;