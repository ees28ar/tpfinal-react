import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { useMutation } from 'react-query';
import axios from 'axios';
import {LOGO_API_URL} from '../../../constants/constants'
import './Login.css';

import { UserLoginData, UserLoginDataResponse } from '../AuthContext';
import { API_BASE_URL } from '../../../constants/constants';

function Login() {
  const navigate = useNavigate();
  const auth = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signinMutation = useMutation((data) => {
    return axios.post(`${API_BASE_URL}/auth/login`, data);
  });

  useEffect(() => {
    if (auth.user) {
      navigate('/', { replace: true });
    }
  }, [auth.user, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newUser: UserLoginData = { email, password };

    signinMutation.mutate(newUser, {
      onSuccess: (response) => {
        const userData: UserLoginDataResponse = {
          email: newUser.email,
          access_token: response.data.access_token,
        };
        auth.signin(userData, () => {
          navigate('/', { replace: true });
        });
      },
    });
  }

  return (
    <div id="login-container">
      <div id="form-container">
        <h1 className="title">WELCOME</h1>

        <form onSubmit={handleSubmit} id="login-form">
          <label>
            Email: <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <br />
          <label>
            Password: <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <br />
          <button type="submit" disabled={signinMutation.isLoading}><strong>
            {signinMutation.isLoading ? 'Loading...' : 'Login'}
            </strong></button>
        </form>

        <p className="pie-form"><strong>Don't have an account? </strong><Link to="/register" >Register</Link></p>
      </div>
      <div id="image-container">
      <img src={LOGO_API_URL} alt="Logo" className="logo" />
      </div>
    </div>
  );
}

export default Login;