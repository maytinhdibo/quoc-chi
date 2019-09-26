import app from '../config/app.config';

const search = (type, query, location) => {
    const url = app.API_URL + `/search`;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify({
            type, query, location
        })
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const searchAPI = {
    search
}

export default searchAPI;