import axios from './axios';

export const registerRequest = user => axios.post(`/users/register`, user);

export const loginRequest = user => axios.post(`/users/login`, user);

export const verifyTokenRequest = () =>axios.get('/users/verify');

