import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { ACCESS_TOKEN } from '../../constants/constants';



export interface UserLoginData {
  email: string;
  password: string;
}

export interface UserLoginDataResponse {
  email: string;
  access_token: string;
}

interface AuthContextType {
  user: UserLoginDataResponse | null;
  signin: (user: UserLoginDataResponse, callback?: VoidFunction) => void;
  signout: (callback?: VoidFunction) => void;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signin: () => {},
  signout: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserLoginDataResponse | null>(null);

  const signin = (newUser: UserLoginDataResponse, callback?: VoidFunction) => {
    setUser(newUser);
    localStorage.setItem(ACCESS_TOKEN, JSON.stringify(newUser));
    if (callback) {
      callback();
    }
  };

  const signout = (callback?: VoidFunction) => {
    setUser(null);
    localStorage.removeItem(ACCESS_TOKEN);
    if (callback) {
      callback();
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem(ACCESS_TOKEN);
    if (storedToken) {
      try {
        const parsedToken = JSON.parse(storedToken) as UserLoginDataResponse;
        setUser(parsedToken);
      } catch (error) {
        console.error('Error parsing token:', error);
        localStorage.removeItem(ACCESS_TOKEN);
      }
    }
  }, []);

  const value: AuthContextType = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

