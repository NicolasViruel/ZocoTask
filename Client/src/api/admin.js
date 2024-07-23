import axios from "./axios";

export const getUsersRequest = () => axios.get('/admin');

export const addUsersRequest = (user) => {
    const token = localStorage.getItem('authToken');
    return axios.post('/admin', user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
};

export const updateUsersRequest = (id, user) => axios.put(`/admin/${id}`, user);

export const deleteUsersRequest = (id) => axios.delete(`/admin/${id}`);