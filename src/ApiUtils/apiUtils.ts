export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.message);
  }
  const data: T = await response.json();
  return data;
}

import axios from 'axios';
import { useEffect, useState } from 'react';

export async function getAccessToken(): Promise<string | null> {
  try {
    const response = await axios.get('https://api.escuelajs.co/api/v1/auth/profile', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    return null;
  }
}

export function useAdminCheck() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const response = await fetch('https://api.escuelajs.co/api/v1/auth/profile', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        const profileData = await response.json();
        setIsAdmin(profileData.role === 'admin');
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    getProfile();
  }, []);

  return isAdmin;
}
