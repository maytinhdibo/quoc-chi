import app from '../config/app.config';

const getBooks = (query) => {
    const url = app.API_URL + `/analytics/books`;
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

const getBook = (id) => {
    const url = app.API_URL + `/analytics/book?id=`+id;
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

const getVolumes = (volumeid) => {
    const url = app.API_URL + `/analytics/volumes?id=`+volumeid;
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

const getVolume = (id) => {
    const url = app.API_URL + `/analytics/volume?id=`+id;
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


const getChapters = (chapterid) => {
    const url = app.API_URL + `/analytics/chapters?id=`+chapterid;
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

const getChapter = (chapterid) => {
    const url = app.API_URL + `/analytics/chapter?id=`+chapterid;
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

const analyticsAPI = {
    getBooks,
    getBook,
    getVolumes,
    getVolume,
    getChapters,
    getChapter
}

export default analyticsAPI;