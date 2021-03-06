import fetch from 'isomorphic-fetch';
import Cookie from 'js-cookie';

import { C_USER, C_TOKEN } from '../user.rdx';

const getHeaders = () => {
    const user = Cookie.getJSON(C_USER);
    const token = Cookie.getJSON(C_TOKEN);
    const header = {
        "x-key": user,
        "x-access-token": token
    };

    return header;
}

export const request = async function (uri, method, body) {
    const header = getHeaders();
    
    const res = await fetch(uri, {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...header
        },
        body
    });
    const json = await res.json();

    if (!res.ok) {
        throw json;
    }
    return json;
};

export const $get = async (uri) => request(uri, 'GET', null);
export const $post = async (uri, body) => request(uri, 'POST', body);
export const $put = async (uri, body) => request(uri, 'PUT', body);
export const $delete = async (uri, body) => request(uri, 'DELETE', body);
