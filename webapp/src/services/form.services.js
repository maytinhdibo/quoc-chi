import app from '../config/app.config';

const get = (query) => {
    const url = app.API_URL + `/form-data?q=` + query;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        }
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const getBooks = () => {
    const url = app.API_URL + `/form-data/books`;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const getUsers = () => {
    const url = app.API_URL + `/form-data/users`;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const getVolumes = (idBook) => {
    const url = app.API_URL + `/form-data/volumes?id=` + idBook;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const getChapters = (idVolume) => {
    const url = app.API_URL + `/form-data/chapters?id=` + idVolume;
    const request = new Request(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const formAPI = {
    get,
    getBooks,
    getVolumes,
    getChapters,
    getUsers
}

export default formAPI;