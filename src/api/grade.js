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
            classId: id,
        });
    },

    updateGradeColumn: (body) => {
        const url = `/grade/update`;
        return axiosClient.put(url, body);
    },

    updateGradeStructure: (classId, body) => {
        const url = `/grade/arrange/${classId}`;
        return axiosClient.post(url, body);
    },

    deleteGradeColumn: (id) => {
        const url = `/grade/remove/${id}`;
        return axiosClient.delete(url);
    },

    getGradeReview: (classId) => {
        const url = `/grade-review/${classId}`;
        return axiosClient.get(url);
    },

    getDetailReview: (classId, reviewId) => {
        const url = `/grade-review/${classId}/${reviewId}`;
        return axiosClient.get(url);
    },

    commentReview: (reviewId, message) => {
        const url = `/grade-review/comment`;
        return axiosClient.post(url, {
            reviewId, message
        });
    },

    createReview: (body) => {
        const url = `/grade-review/create`;
        return axiosClient.post(url, body);
    },

    closeReview: (reviewId) => {
        const url = `/grade-review/close/${reviewId}`;
        return axiosClient.post(url);
    },

    finalizeGrade: (gradeId) => {
        const url = `/grade/finalized`;
        return axiosClient.post(url, {
            gradeId
        });
    },
}
