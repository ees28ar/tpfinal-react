import { Link } from 'react-router-dom';
import "./Styles.css";
import { ERROR_IMAGE_NOTFOUND } from '../../../constants/constants';
import './Styles.css'

function NotFound() {
  return (
    <div className="notfound-avatar-container">
      <img className="avatar2" src={ERROR_IMAGE_NOTFOUND} alt="Logo" />
      <p>
        <Link to="/">Volver al Home</Link>    
      </p>     
    </div>
  );
}

export default NotFound;

