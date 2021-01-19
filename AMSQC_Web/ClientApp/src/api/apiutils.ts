import axios from 'axios';
import { getToken } from './adalConfig';

export const axiosGet = async (url: string) => {
    return axios.get(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const axiosPost = async (url: string, payload: any) => {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const axiosFormPost = async (url: string, payload: any) => {
    return axios.post(url, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const axiosPut = async (url: string, payload: any) => {
    return axios.put(url, payload, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const axiosFormPut = async (url: string, payload: any) => {
    return axios.put(url, payload, {
        headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};

export const axiosDelete = async (url: string) => {
    return axios.delete(url, {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${getToken()}`,
        },
    });
};
