import app from './../config/app.config';

const login = ({ email, password }) => {
    const url = app.API_URL + `/user/login`;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const createUser = (datauser) => {
    console.log(datauser);
    const url = app.API_URL + `/user/register`;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datauser)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const editInfo = (datauser) => {
    const url = app.API_URL + `/user/edit`;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify(datauser)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const get = () => {
    const url = app.API_URL + `/user`;
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

const getList = (bookValue, volumeValue, chapterValue) => {
    const url = app.API_URL + `/user/getList`;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify({
            book: bookValue,
            volume: volumeValue,
            chapter: chapterValue
        })
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
}

const getInfo = (id) => {
    const url = app.API_URL + `/user/getInfo?id=` + id;
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

const userAPI = {
    login,
    get,
    getInfo,
    createUser,
    getList,
    editInfo
}

export default userAPI;