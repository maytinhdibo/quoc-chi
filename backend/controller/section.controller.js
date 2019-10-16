const db = require("../models");
const response = require("../utils/response");

const newSection = async (req, res) => {
  try {
    console.log(4543);

    let chapterId = req.query.id;
    let { name, description } = req.body;
    let newsection = await db.section.create({
      name,
      description,
      chapterId
    });
   
    res.json(response.success(newsection));
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
  newSection,
  editSection
};
