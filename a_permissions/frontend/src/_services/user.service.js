import { handleResponse, requestOptions } from '@/_helpers';

export const userService = {
    getAll,
    getById
};

function getAll() {
    return fetch(`/users`, requestOptions.get())
        .then(handleResponse);
}

function getById(id) {
    return fetch(`/users/${id}`, requestOptions.get())
        .then(handleResponse);
}