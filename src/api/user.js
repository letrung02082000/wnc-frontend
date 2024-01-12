import axiosClient from './axiosClient';

export const userApi = {
    login: (body) => {
        const url = '/auth/login';
        return axiosClient.post(url, body);
    },
    register: (body) => {
        const url = '/auth/register';
        return axiosClient.post(url, body);
    },
    changePassword: (body) => {
        const url = '/auth/change-password';
        return axiosClient.post(url, body);
    },
    forgotPassword: (body) => {
        const url = '/auth/forgot-password';
        return axiosClient.post(url, body);
    },
    googleLogin: () => {
        const url = '/auth/google';
        return axiosClient.get(url);
    },
    getProfile: () => {
        const url = '/user/profile';
        return axiosClient.get(url);
    },
    updateProfile: (body) => {
        const url = '/user/profile';
        return axiosClient.post(url, body);
    },
    updateStudentId: (studentId) => {
        console.log(studentId)
        const url = '/user/map-mssv';
        return axiosClient.post(url, {
            mssv: studentId,
        });
    },
}
