import app from '../config/app.config';

const createChapter = (data,volumeid) => {
    const url = app.API_URL + `/chapter/new?id=`+volumeid;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

//need edit
const editChapter = (databook, id) => {
    const url = app.API_URL + `/volume/edit?id=`+id;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(databook)
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