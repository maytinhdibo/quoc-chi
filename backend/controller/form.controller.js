const db = require('../models');
const response = require('../utils/response');

const get = async (req, res) => {
    const id = req.tokenData.id;
    try {
        let result = {};

        const arr = req.query.q.split(",");
        if (arr.indexOf("organization") != -1) {
            result.organization = await db.organization.findAll({
                attributes: ['id', 'name']
            });
        }
        if (arr.indexOf("academic_title") != -1) {
            result.academic_title = await db.academic_title.findAll({
                attributes: ['id', 'name', 'fullname']
            });
        }
        res.json(
            response.success(result)
        )
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getUsers = async (req, res) => {
    try {
        var data = await db.user.findAll({
            attributes: ['id', 'name','email']
        })
        res.json(response.success(data));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getBooks = async (req, res) => {
    try {
        var data = await db.book.findAll({
            attributes: ['id', 'name']
        })
        res.json(response.success(data));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getVolumes = async (req, res) => {
    try {
        let bookId = req.query.id;

        var data = await db.volume.findAll({
            where: {
                book_id: bookId
            },
            attributes: ['id', 'name']
        })
        res.json(response.success(data));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getChapters = async (req, res) => {
    try {
        let volumeId = req.query.id;

        var data = await db.chapter.findAll({
            where: {
                volume_id: volumeId
            },
            attributes: ['id', 'name']
        })
        res.json(response.success(data));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const getDocType = async (req, res) => {
    try {
        var data = await db.doc_type.findAll({
            attributes: ['id', 'name']
        })
        res.json(response.success(data));
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

module.exports = {
    get,
    getChapters,
    getBooks,
    getVolumes,
    getUsers,
    getDocType
}
