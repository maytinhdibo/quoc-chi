import app from '../config/app.config';


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
    editSection
}

export default sectionAPI;