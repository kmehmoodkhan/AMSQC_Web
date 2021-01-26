import store from '../redux/store';

export const getToken = () => {
    return store.getState().user['accessToken'];
};
