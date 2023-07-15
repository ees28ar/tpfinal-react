import { Link } from 'react-router-dom';
import './Styles.css';
import AuthStatus from '../../pages/Auth/AuthStatus';
import {LOGO_API_URL} from '../../constants/constants'


function Nav() {
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
          <Link to="/cartdetail">Cartdetail</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
