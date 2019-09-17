import app from '../config/app.config';

const createBook = (databook) => {
    const url = app.API_URL + `/book/new`;
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

const editBook = (databook, id) => {
    const url = app.API_URL + `/book/edit?id=`+id;
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


const bookAPI = {
    createBook,
    editBook
}

export default bookAPI;