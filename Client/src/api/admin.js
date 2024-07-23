import axios from "./axios";

export const getUsersRequest = () => axios.get('/admin');

export const addUsersRequest = (user) => axios.post('/admin', user);

export const updateUsersRequest = (id, user) => axios.put(`/admin/${id}`, user);

export const deleteUsersRequest = (id) => axios.delete(`/admin/${id}`);