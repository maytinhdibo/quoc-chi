const db = require('../models');
const response = require('../utils/response');
const sercetkey = require('../config/secretkey');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mergeByKey = require("array-merge-by-key");
var _ = require('lodash');
var stringify = require('json-stringify-safe');


const getBooks = async (req, res) => {

    try {
        list = await db.sequelize.query(`SELECT countNumber.*, users.name as user_name, users.id as user_id FROM
        (SELECT countResult.id, countResult.name, countResult.volume, countResult.chapter, countResult.section, count(books_users.user_id) as user FROM
        (SELECT c.id, c.name, c.volume, c.chapter, COUNT(sections.id) as section FROM (
        SELECT v.id, v.name, v.volume, COUNT(chapters.id) as chapter FROM (
        SELECT books.id, books.name, COUNT(volumes.id) as volume FROM books
        LEFT JOIN volumes ON volumes.book_id=books.id
        GROUP BY books.id
        ) v
         LEFT JOIN volumes ON volumes.book_id=v.id
         LEFT JOIN chapters ON chapters.volume_id=volumes.id
        GROUP BY v.id
        ) c
        LEFT  JOIN  volumes ON volumes.book_id=c.id
        LEFT JOIN chapters ON chapters.volume_id=volumes.id
        LEFT JOIN sections ON sections.chapter_id=chapters.id
        GROUP BY c.id
        ) countResult
        LEFT JOIN books_users ON countResult.id=books_users.book_id 
        GROUP BY countResult.id) countNumber
        LEFT JOIN books_users ON countNumber.id=books_users.book_id AND books_users.book_role_id=1
        LEFT  JOIN users ON users.id=books_users.user_id
        ORDER BY countNumber.id`, { type: db.sequelize.QueryTypes.SELECT });
        var result = []

        list.forEach(e => {
            if (result[e.id]) {
                result[e.id].bookAdmins.push({
                    id: e.user_id,
                    name: e.user_name
                })
            } else {
                result[e.id] = {
                    id: e.id,
                    name: e.name,
                    user: e.user,
                    volume: e.volume,
                    chapter: e.chapter,
                    section: e.section,
                    bookAdmins: [{
                        id: e.user_id,
                        name: e.user_name
                    }]
                }
            }
        });
        result = result.filter(function (el) {
            return el != null;
        });
        res.json(response.success(result));
    } catch (err) {
        return res.json(response.fail(err.message));
    }
}

const getBook = async (req, res) => {
    try {
        let bookid = req.query.id;
        var book = await db.book.findOne({
            where: {
                id: bookid
            },
            attributes: ["name", "description"]
        });
        var bookAdmin = await db.books_user.findAll({
            where: {
                book_id: bookid,
                book_role_id: 1
            },
            attributes: [],
            include: [
                {
                    attributes: ["name", "id"],
                    model: db.user
                }
            ]
        })
        res.json(response.success({ book, bookAdmin }));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

getVolumes = async (req, res) => {
    try {
        let bookid = req.query.id;
        let countChapter = await db.sequelize.query(`
        SELECT v.id as id, v.name,
	    sum(if(s.section_state_id = 6, 1, 0)) as sum_empty,
	    sum(if(s.section_state_id = 1, 1, 0)) as sum_done,
        sum(if(s.section_state_id > 1 AND s.section_state_id<6, 1, 0)) as sum_editing
        FROM books b
        LEFT JOIN volumes v ON v.book_id=b.id
        LEFT JOIN chapters c ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        WHERE b.id=`+ bookid + `
        GROUP BY v.id`, { type: db.sequelize.QueryTypes.SELECT });

        let countEditor = await db.sequelize.query(`    
        SELECT v.id as id, COUNT(su.user_id) as count_editor
        FROM books b
        LEFT JOIN volumes v ON v.book_id=b.id
        LEFT JOIN chapters c ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        LEFT JOIN sections_users su ON s.id=su.section_id
        WHERE b.id=`+ bookid + `
        GROUP BY v.id`, { type: db.sequelize.QueryTypes.SELECT });

        let volumeAdmin = await db.volume.findAll({
            where: {
                book_id: bookid
            },
            attributes: ["id"],
            include: [
                {
                    attributes: ["id", "name"],
                    model: db.user
                }
            ]
        })
        var merge = _.merge(countChapter, countEditor, JSON.parse(stringify(volumeAdmin)));
        res.json(response.success(merge));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getVolume = async (req, res) => {
    try {
        let volumeid = req.query.id;
        var volume = await db.volume.findOne({
            where: {
                id: volumeid
            },
            attributes: ["name", "description"]
        });
        var volumeAdmin = await db.users_volume.findAll({
            where: {
                volume_id: volumeid
            },
            attributes: [],
            include: [
                {
                    attributes: ["name", "id"],
                    model: db.user
                }
            ]
        })
        res.json(response.success({ volume, volumeAdmin }));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}
getChapters = async (req, res) => {
    try {
        let bookid = req.query.id;
        let result = await db.sequelize.query(`
        SELECT countResult.*, count(sections_users.user_id) as count_editor FROM
        (SELECT c.id, c.name, c.volume_id as volume_id,
        sum(if(s.section_state_id = 6, 1, 0)) as sum_empty,
        sum(if(s.section_state_id = 1, 1, 0)) as sum_done,
        sum(if(s.section_state_id > 1 AND s.section_state_id<6, 1, 0)) as sum_editing
        FROM chapters c
        LEFT JOIN volumes v ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        WHERE v.id=`+ bookid + `
        GROUP BY c.id) countResult
        LEFT JOIN volumes ON countResult.volume_id=volumes.id
        LEFT JOIN sections ON sections.chapter_id=countResult.id
        LEFT JOIN sections_users  ON sections_users.section_id=sections.id
        WHERE volumes.id=`+ bookid + `
        GROUP BY countResult.id;
        `, { type: db.sequelize.QueryTypes.SELECT });
        res.json(response.success(result));
    } catch (e) {
        res.json(respone.fail(e.message))
    }
}

const getChapter = async (req, res) => {
    try {
        let chapterid = req.query.id;
        var chapter = await db.chapter.findOne({
            where: {
                id: chapterid
            },
            attributes: ["name", "description","introduction"]
        });
        res.json(response.success({ chapter }));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

module.exports = {
    getBooks,
    getBook,
    getVolumes,
    getVolume,
    getChapters,
    getChapter
}