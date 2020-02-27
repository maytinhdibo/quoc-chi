const db = require("../models");
const response = require("../utils/response");
const deleteSection = async (req, res) => {
  try {
    let sectionId = req.query.id;
    db.sections_user.destroy({
      where: {
        section_id: sectionId
      }
    })
    db.section_draft.destroy({
      where: {
        section_id: sectionId
      }
    })

    // db.sections_docs_log.destroy({
    //   where: {
    //       section_id: sectionId
    //   }
    // })
    db.sections_log.destroy({
      where: {
        section_id: sectionId
      }
    })
    res.json(response.success());
  }
  catch (e) {
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

const deleteVolume = async (req, res) => {
  try {
    let volumeId = req.query.id;

    db.users_volume.destroy({
      where: {
        volume_id: volumeId
      }
    })
    await db.sequelize.query(
      `DELETE FROM sections_logs WHERE EXISTS ( select * from sections WHERE EXISTS ( select * from chapters WHERE sections.chapter_id= chapters.id and chapters.volume_id = ` + volumeId + `) and sections_logs.section_id = sections.id)`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
    await db.sequelize.query(
      `DELETE FROM sections_users WHERE EXISTS ( select * from sections WHERE EXISTS ( select * from chapters WHERE sections.chapter_id= chapters.id and chapters.volume_id = ` + volumeId + `) and sections_users.section_id = sections.id)`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
    await db.sequelize.query(
      `DELETE FROM section_drafts WHERE EXISTS ( select * from sections WHERE EXISTS ( select * from chapters WHERE sections.chapter_id= chapters.id and chapters.volume_id = ` + volumeId + `) and section_drafts.section_id = sections.id)`,
      { type: db.sequelize.QueryTypes.DELETE }
    );
    await db.sequelize.query(
      `DELETE FROM sections where EXISTS ( select * from chapters where sections.chapter_id = chapters.id and chapters.volume_id =  ` + volumeId + `)`,
      { type: db.sequelize.QueryTypes.DELETE }
    );

    db.chapter.destroy({
      where: {
        volume_id: volumeId
      }
    })
    db.volume.destroy({
      where: {
        id: volumeId
      }
    })

    res.json(response.success());
  }
  catch (e) {
    res.json(response.fail(e.message));
  }
}
module.exports = {
  deleteSection,
  deleteChapter,
  deleteVolume
}