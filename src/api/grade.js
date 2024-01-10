import axiosClient from './axiosClient';

export const gradeApi = {
    getGradeStructure: (id) => {
        const url = `/grade/structure/${id}`;
        return axiosClient.get(url);
    },

    createGradeColumn: (body) => {
        const url = '/grade/create';
        return axiosClient.post(url, body);
    },

    getGradeBoard: (id) => {
        const url = `/grade/${id}`;
        return axiosClient.get(url);
    },

    markGrade: (body) => {
        const url = '/grade/mark';
        return axiosClient.post(url, body);
    },

    addStudent: (id, body) => {
        const url = `/grade/add-student/${id}`
        return axiosClient.post(url, body);
    },

    addGradeColumn: (id, body) => {
        const url = `/grade/create`;
        return axiosClient.post(url, {
            ...body,
            grade_id: id,
        });
    }
}
