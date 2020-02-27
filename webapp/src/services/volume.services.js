import app from '../config/app.config';

const createVolume = (data,bookid) => {
    const url = app.API_URL + `/volume/new?id=`+bookid;
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

const editVolume = (databook, id) => {
    const url = app.API_URL + `/volume/edit?id=`+id;
    const request = new Request(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'token': localStorage.token
        },
        body: JSON.stringify(databook)
    })
    return fetch(request)
        .then(response => {
            return response.json();
        });
};

const deleteVolume = (id) => {
    const url = app.API_URL + `/volume/delete?id=` + id;
    const request = new Request(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        token: localStorage.token,
      },
    });
    return fetch(request).then(response => {
      return response.json();
    });
  };

const volumeAPI = {
    createVolume,
    editVolume,
    deleteVolume,

}

export default volumeAPI;