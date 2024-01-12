export const PATH = {
    NOT_FOUND: '/404',
    HOME: '/',
    ADMIN: {
        ROOT: '/admin',
        SIGNIN: '/admin/login',
        SIGNUP: '/admin/register',
        CLASS: '/admin/class',
        USER: '/admin/user',
    },
    AUTH: {
        ROOT: '/auth',
        SIGNIN: '/auth/login',
        ACTIVATION: '/auth/activate',
        SIGNUP: '/auth/register',
        FORGOT_PASSWORD: '/auth/forgot-password',
        GOOGLE: '/auth/google',
    },
    USER: {
        ROOT: '/user',
        PROFILE: '/user/profile',
        CHANGE_PASSWORD: '/user/change-password',
    },
    CLASS: {
        ROOT: '/class',
        DETAIL: '/class/:classId',
        CREATE: '/class/create',
        EDIT: '/class/edit/:classId',
        ME: '/class/me',
        JOINED: '/class/joined',
        JOIN: '/class/join',
        GRADE: '/class/:classId/grade',
    },
};
