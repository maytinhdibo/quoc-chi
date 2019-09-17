const db = require('../models');
const response = require('../utils/response');

const newBook = async (req, res) => {
    try {
        let { name, adminValue, description } = req.body;
        let newbook = await db.book.create({
            name: name,
            description
        });
        adminValue.forEach(async (element) => {
            await db.books_user.create({
                bookId: newbook.id,
                userId: element,
                bookRoleId: 1
            });
        });
        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const editBook = async (req, res) => {
    try {
        let bookid = req.query.id;
        let { name, adminValue, description } = req.body;

        await db.books_user.destroy({
            where: {
                bookId: bookid,
                bookRoleId: 1
            }
        })

        let book = await db.book.findOne({
            where: {
                id: bookid
            }
        });

        if (book) {
            await book.update({
                name: name,
                description: description
            })
        } else {
            throw new Error("Tập không tồn tại");
        }

        adminValue.forEach(async (element) => {
            await db.books_user.create({
                bookId: bookid,
                userId: element,
                bookRoleId: 1
            });
        });
        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}


module.exports = {
    newBook,
    editBook
}
