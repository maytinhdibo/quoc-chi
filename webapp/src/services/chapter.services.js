import app from '../config/app.config';

const createChapter = (data,volumeid) => {
    const url = app.API_URL + `/chapter/new?id=`+volumeid;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify(data)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const editChapter = (data, id) => {
    const url = app.API_URL + `/chapter/edit?id=`+id;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify(data)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};


const chapterAPI = {
    createChapter,
    editChapter
}

export default chapterAPI;