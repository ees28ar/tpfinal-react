import { Link } from 'react-router-dom';
import './Styles.css';

const imageURL = 'https://i.postimg.cc/Y0KJVj8T/logo.png';

function Nav() {
  return (
    <div className="nav-container nav">
      <img className="avatar2" src={imageURL} alt="Logo" />
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products/">Products</Link>
        </li>
        <li>
          <Link to="/categories/">Categories</Link>
        </li>
        <li>
          <Link to="/login/">Login</Link>
        </li>
      </ul>
    </div>
  );
}

export default Nav;
