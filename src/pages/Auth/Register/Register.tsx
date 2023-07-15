import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext, UserLoginDataResponse } from '../AuthContext';
import { REGISTER_API_URL, AVATAR_API_URL, LOGO_API_URL } from '../../../constants/constants';
import './Register.css'; 


interface RegisterFormData {
  name: string;
  email: string;
  password: string;
}

const Register: React.FC = () => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);

  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(REGISTER_API_URL, {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          avatar: AVATAR_API_URL,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const newUser = await response.json();
        const user: UserLoginDataResponse = {
          email: newUser.email,
          access_token: '',
        };
        auth.signin(user, () => {
          navigate('/');
        });
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <div id="register-container2">
      <div id="form-container2">
      <h1 className="title">REGISTER</h1>
        <form onSubmit={handleSubmit} id="register-form">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} />
          </label>
          <br />
          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
      <div id="image-container2">
        <img src={LOGO_API_URL} alt="Logo" className="logo-image2" />
      </div>
    </div>
  );
};

export default Register;
