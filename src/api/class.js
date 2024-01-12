import axiosClient from './axiosClient';

export const classApi = {
    getClassList: () => {
        const url = '/class';
        return axiosClient.get(url);
    },

    getClassDetail: (id) => {
        const url = `/class/${id}`;
        return axiosClient.get(url);
    },

    createClass: (body) => {
        const url = '/class/create';
        return axiosClient.post(url, body);
    },

    getClassParticipants: (id) => {
        const url = `/class/participants`;
        return axiosClient.post(url, {
            classId: id
        });
    },

    joinClass: (body) => {
        const url = '/class/join';
        return axiosClient.post(url, body);
    },

    leaveClass: (body) => {
        const url = '/class/leave';
        return axiosClient.post(url, body);
    },

    inviteByEmail: (email, classId, role) => {
        const url = '/class/invite/email';
        return axiosClient.post(url, {
            email,
            classId,
            role
        });
    },

    inviteByLink: (classId) => {
        const url = '/class/invite/link';
        return axiosClient.post(url, {
            classId
        });
    },

    checkRoleInClass: (classId) => {
        const url = `/class/role/${classId}`;
        return axiosClient.get(url);
    },

    getNotifications: () => {
        const url = `/noti`;
        return axiosClient.get(url);
    },

    readNotification: (notiId) => {
        const url = `/noti/${notiId}`;
        return axiosClient.post(url);
    },
}
