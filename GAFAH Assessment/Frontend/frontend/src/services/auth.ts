import API from './api';

export const register = async (userData: any) => {
  return API.post('/auth/register', userData);
};

export const login = async (userData: any) => {
  return API.post('/auth/login', userData);
};
