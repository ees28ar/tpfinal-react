import React, { createContext, useState, ReactNode } from 'react';
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
  const storedToken = localStorage.getItem(ACCESS_TOKEN);
  const initialState = storedToken ? JSON.parse(storedToken) as UserLoginDataResponse : null;
  const [user, setUser] = useState<UserLoginDataResponse | null>(initialState);

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

  
  const value: AuthContextType = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

