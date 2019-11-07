import app from "../config/app.config";

const check = (bookValue, volumeValue, chapterValue) => {
  const url = app.API_URL + `/duplicate/check`;
  console.log(bookValue, volumeValue, chapterValue);
  const request = new Request(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.token
    },
    body: JSON.stringify({
      book: bookValue,
      volume: volumeValue,
      chapter: chapterValue
    })
  });
  return fetch(request).then(response => {
    return response.json();
  });
};

const list = section_id => {
  const url = app.API_URL + `/duplicate/list?id=` + section_id;
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

const duplicateAPI = {
  check,
  list
};

export default duplicateAPI;
