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
        return axiosClient.get(url, {
            params: {
                classId: id
            }
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

    inviteByEmail: (body) => {
        const url = '/class/invite/email';
        return axiosClient.post(url, body);
    },

    inviteByLink: (body) => {
        const url = '/class/invite/link';
        return axiosClient.post(url, body);
    }
}
