const db = require("../models");
const response = require("../utils/response");
const sercetkey = require("../config/secretkey");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mergeByKey = require("array-merge-by-key");
const htmlToText = require("html-to-text");
var _ = require("lodash");
var stringify = require("json-stringify-safe");

let qSection = {
  select: "s.id as 'section_id', s.name as 'section_name'",
  join: " ",
  alias: "s"
};
let qChapter = {
  select: "c.id as 'chapter_id', c.name as 'chapter_name'",
  join: "LEFT JOIN chapters c ON s.chapter_id = c.id",
  alias: "c"
};
let qVolume = {
  select: "v.id as 'volume_id', v.name as 'volume_name'",
  join: "LEFT JOIN volumes v ON c.volume_id = v.id",
  alias: "v"
};
let qBook = {
  select: "b.id as 'book_id', b.name as 'book_name'",
  join: "LEFT JOIN books b ON v.book_id = b.id",
  alias: "b"
};

function conditionGen(type, where, query) {
  let sName = `.name LIKE "%` + query + `%"`;
  let sContent = `.description LIKE "%` + query + `%"`;

  let condition = "";

  let element;
  switch (where) {
    case "section":
      element = qSection;
      break;
    case "chapter":
      element = qChapter;
      break;
    case "volume":
      element = qVolume;
      break;
    case "book":
      element = qBook;
      break;
  }

  if (type == 1) {
    condition = element.alias + sName;
  } else if (type == 2) {
    condition = element.alias + sContent;
  } else {
    condition = element.alias + sName + " OR " + element.alias + sContent;
  }
  return condition;
}
const search = async (req, res) => {
  try {
    const { type, query, location } = req.body;

    let result = [];
    let querySQL = "";
    if (location == "section") {
      querySQL =
        `
      SELECT ` +
        [qSection.select, qChapter.select, qVolume.select, qBook.select].join(
          " , "
        ) +
        ` 
      FROM sections s
      ` +
        qChapter.join +
        ` ` +
        qVolume.join +
        ` ` +
        qBook.join +
        ` ` +
        `WHERE ` +
        conditionGen(type, location, query);
    } else if (location == "chapter") {
      querySQL =
        `
      SELECT ` +
        [qChapter.select, qVolume.select, qBook.select].join(" , ") +
        ` 
      FROM chapters c
      ` +
        qVolume.join +
        ` ` +
        qBook.join +
        ` ` +
        `WHERE ` +
        conditionGen(type, location, query);
    } else if (location == "volume") {
      querySQL =
        `
      SELECT ` +
        [qVolume.select, qBook.select].join(" , ") +
        ` 
      FROM volumes v
      ` +
        qBook.join +
        ` ` +
        `WHERE ` +
        conditionGen(type, location, query);
    } else if (location == "book") {
      querySQL =
        `
        SELECT ` +
        qBook.select +
        ` 
        FROM books b
        WHERE ` +
        conditionGen(type, location, query);
    } else {
      throw new Error("Lỗi dữ liệu nhập vào");
    }

    result = await db.sequelize
      .query(querySQL, { type: db.sequelize.QueryTypes.SELECT })
      .catch(e => {
        throw new Error(e.message);
      });

    res.send(
      response.success({
        location,
        data: result
      })
    );
  } catch (e) {
    res.json(response.fail(e.message));
  }
};
module.exports = {
  search
};
