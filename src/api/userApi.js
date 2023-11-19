import axiosClient from './axiosClient';

const userApi = {
    login: (body) => {
        const url = '/auth/login';
        return axiosClient.post(url, body);
    },
    register: (body) => {
        const url = '/auth/register';
        return axiosClient.post(url, body);
    },
    getMe: () => {
        const url = '/auth/me';
        return axiosClient.get(url);
    },
    updateMe: (body) => {
        const url = '/auth/me';
        return axiosClient.patch(url, body);
    },
    changePassword: (body) => {
        const url = '/auth/change-password';
        return axiosClient.patch(url, body);
    },
    forgotPassword: (body) => {
        const url = '/auth/forgot-password';
        return axiosClient.post(url, body);
    },
    resetPassword: (body) => {
        const url = '/auth/reset-password';
        return axiosClient.post(url, body);
    },
    logout: () => {
        const url = '/auth/logout';
        return axiosClient.post(url);
    },
}
