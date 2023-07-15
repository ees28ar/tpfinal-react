import { useNavigate } from 'react-router-dom';
import { useAuth } from './useAuth';

function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignout = () => {
    auth.signout(() => navigate('/'));
  };

  if (!auth.user) {
    return <p>You are not logged in.</p>;
  }

  return (
    <p>
      Welcome {auth.user.email}!{' '}
      <button onClick={handleSignout}>Sign out</button>
    </p>
  );
}

export default AuthStatus;
