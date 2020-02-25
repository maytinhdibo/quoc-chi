const db = require('../models');
const response = require('../utils/response');

const newChapter = async (req, res) => {
    try {
        let volumeid = req.query.id;
        let { name, description } = req.body;
        await db.chapter.create({
            name:name,
            description:description,
            volumeId: volumeid
        });

        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

const editChapter = async (req, res) => {
    try {
        let chapterId = req.query.id;
        let { name, description } = req.body;
       
        let chapter = await db.chapter.findOne({
            where: {
                id: chapterId
            }
        });

        if (chapter) {
            await chapter.update({
                name: name,
                description: description
            });
        } else {
            throw new Error("Chương không tồn tại");
        }

        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}
const deleteChapter = async (req, res) => {
    try {
      let chapterId = req.query.id;
      await db.sequelize.query(
        ` DELETE FROM sections_logs where EXISTS ( select * from sections where sections_logs.section_id = sections.id and sections.chapter_id =  ` + chapterId + `)`,
        { type: db.sequelize.QueryTypes.DELETE }
      );
      await db.sequelize.query(
        ` DELETE FROM sections_users where EXISTS ( select * from sections where sections_users.section_id = sections.id and sections.chapter_id =  ` + chapterId + `)`,
        { type: db.sequelize.QueryTypes.DELETE }
      );
          await db.sequelize.query(
        ` DELETE FROM section_drafts where EXISTS ( select * from sections where section_drafts.section_id = sections.id and sections.chapter_id =  ` + chapterId + `)`,
        { type: db.sequelize.QueryTypes.DELETE }
      );
      db.section.destroy({
        where: {
          chapter_id: chapterId
        }
      })
      db.chapter.destroy({
        where: {
          id: chapterId
        }
      })
      res.json(response.success());
    }
    catch (e) {
      res.json(response.fail(e.message))
    }
  
  }

module.exports = {
    newChapter,
    editChapter,
    deleteChapter
}
