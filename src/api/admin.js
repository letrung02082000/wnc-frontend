import axiosClient from './axiosClient';

export const adminApi = {
    getListAccount: () => {
        const url = '/user/admin/accounts';
        return axiosClient.get(url);
    },

    lockAccount: (body) => {
        const url = `/user/admin/lock`;
        return axiosClient.post(url, body);
    },

    getListClass: () => {
        const url = 'user/admin/classes';
        return axiosClient.get(url);
    },

    activeClass: (id) => {
        const url = `/user/admin/active-class`;
        return axiosClient.post(url, {
            classId: id
        });
    },

    mapMssv: (body) => {
        const url = `/user/admin/map-mssv`;
        return axiosClient.post(url, body);
    },

   
    mapMssvByCsv: (body) => {
        const url = `/user/admin/import-mssv`;
        return axiosClient.post(url, body);
    },
}
