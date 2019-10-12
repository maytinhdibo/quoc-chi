const db = require("../models");
const response = require("../utils/response");

const newBook = async (req, res) => {
  try {
    let { name, adminValue, description } = req.body;
    let newbook = await db.book.create({
      name: name,
      description
    });
    adminValue.forEach(async element => {
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
};

const editSection = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content } = req.body;

    let section = await db.section.findOne({
      where: {
        id: sectionid
      }
    });

    if (section) {
      await section.update({
        name,
        description,
        content
      });
    } else {
      throw new Error("Mục không tồn tại");
    }

    res.json(response.success());
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

module.exports = {
  newBook,
  editSection
};
