import app from '../config/app.config';

const newSection = (data, chapterid) => {
    const url = app.API_URL + `/section/new?id=`+chapterid;
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

const editSection = (data, id) => {
    const url = app.API_URL + `/section/edit?id=`+id;
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


const sectionAPI = {
    newSection,
    editSection
}

export default sectionAPI;