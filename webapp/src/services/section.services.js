import app from "../config/app.config";

const newSection = (data, chapterid) => {
  const url = app.API_URL + `/section/new?id=` + chapterid;
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify(data),
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const publishSection = (data, id, draftid) => {
  const url = app.API_URL + `/section/publish?id=` + id + (draftid ? "&version=" + draftid : "");
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify(data),
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getListDraft = id => {
  const url = app.API_URL + `/section/draft/list?id=` + id;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const getEditableVersion = id => {
  const url = app.API_URL + `/section/editable-version?id=` + id;
  const request = new Request(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const saveNewDraft = (data, id) => {
  // console.log("ahihi");
  // const url = app.API_URL + `/section/draft/new?id=` + id;
  // const request = new Request(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //     token: localStorage.token,
  //   },
  //   body: JSON.stringify(data),
  // });
  // return fetch(request).then(response => {
  //   return response.json();
  // });
};

const saveDraft = (data, id, draft) => {
  const url = app.API_URL + `/section/draft/edit?id=` + id;
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token,
    },
    body: JSON.stringify(data),
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const sectionAPI = {
  newSection,
  publishSection,
  getListDraft,
  saveNewDraft,
  saveDraft,
  getEditableVersion
};

export default sectionAPI;
