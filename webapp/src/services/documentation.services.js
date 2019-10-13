import app from '../config/app.config';


const getSection = (id) => {
    const url = app.API_URL + `/doc/`+id+`/section`;
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
};


const docAPI = {
    getSection
}

export default docAPI;