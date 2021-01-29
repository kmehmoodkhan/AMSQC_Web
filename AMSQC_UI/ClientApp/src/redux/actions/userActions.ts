import { LOG_OUT, SET_USER } from '../constants/userConstants';

export const setUser = (user: any) => (dispatch: any) => dispatch({ type: SET_USER, user });

export const logUserOut = () => (dispatch: any) => dispatch({ type: LOG_OUT });
