import app from "../config/app.config";

const overview = () => {
  const url = app.API_URL + `/analytics/overview`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getBooks = query => {
  const url = app.API_URL + `/analytics/books`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getBook = id => {
  const url = app.API_URL + `/analytics/book?id=` + id;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getVolumes = volumeid => {
  const url = app.API_URL + `/analytics/volumes?id=` + volumeid;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getVolume = id => {
  const url = app.API_URL + `/analytics/volume?id=` + id;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getChapters = chapterid => {
  const url = app.API_URL + `/analytics/chapters?id=` + chapterid;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getChapter = chapterid => {
  const url = app.API_URL + `/analytics/chapter?id=` + chapterid;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getSections = chapterid => {
  const url = app.API_URL + `/analytics/sections?id=` + chapterid;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getSection = (sectionId, version) => {
  const url = app.API_URL + `/analytics/section?id=` + sectionId+"&draft="+version;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getSectionFull = (sectionId, version) => {
  const url = app.API_URL + `/section/get?id=` + sectionId+"&draft="+version;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getEditorSections = () => {
  const url = app.API_URL + `/analytics/editor`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getDocs = () => {
  const url = app.API_URL + `/analytics/docs`;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getDoc = id => {
  const url = app.API_URL + `/analytics/doc?id=` + id;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    }
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const analyticsAPI = {
  overview,
  getBooks,
  getBook,
  getVolumes,
  getVolume,
  getChapters,
  getChapter,
  getSections,
  getSection,
  getSectionFull,
  getEditorSections,
  getDocs,
  getDoc
};

export default analyticsAPI;
