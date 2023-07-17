import { Link } from 'react-router-dom';
import { ERROR_IMAGE_PETICION } from '../../../constants/constants';
import './Styles.css'

function ErrorPeticion() {
  return (
    <div className="error-avatar-container">
      <img className="avatar3" src={ERROR_IMAGE_PETICION} alt="Logo" />
      <p>
        <Link to="/">Volver al Home</Link>    
      </p>     
    </div>
  );
}

export default ErrorPeticion;
