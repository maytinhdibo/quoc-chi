const db = require("../models");
const response = require("../utils/response");

const newSection = async (req, res) => {
  try {
    let chapterId = req.query.id;
    let { name, description } = req.body;
    let newsection = await db.section.create({
      name,
      description,
      chapterId,
    });

    res.json(response.success(newsection));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const publishSection = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content } = req.body;

    let section = await db.section.findOne({
      where: {
        id: sectionid,
      },
    });

    if (section) {
      await section.update({
        name,
        description,
        content,
      });
    } else {
      throw new Error("Mục không tồn tại");
    }

    res.json(response.success());
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getListDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;

    let drafts = await db.sequelize.query(
      `SELECT sd.id as id, sd.name as name, sd.published as published, sd.updated_at as updated_at, u.id as user_id, u.name as user_name FROM section_drafts sd
      LEFT JOIN users u ON u.id = sd.user_id
      WHERE section_id=` +
        sectionid +
        `
      ORDER BY sd.updated_at DESC
      `,
      {
        type: db.sequelize.QueryTypes.SELECT,
      }
    );
    drafts = drafts.map(object => {
      return {
        id: object.id,
        name: object.name,
        published: object.published,
        updated_at: object.updated_at,
        user: {
          id: object.user_id,
          name: object.user_name,
        },
      };
    });

    res.json(response.success(drafts));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const saveNewDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content } = req.body;

    let section = await db.section.findOne({
      where: {
        id: sectionid,
      },
    });

    if (section) {
      let drafts = await db.sequelize.query(
        `INSERT INTO section_drafts(section_id, user_id, name, description, content, published, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())`,
        {
          replacements: [
            sectionid,
            req.tokenData.id,
            name,
            description,
            content,
            0,
          ],
          type: db.sequelize.QueryTypes.INSERT,
        }
      );

      res.json(response.success(drafts[0]));
    } else {
      throw new Error("Mục không tồn tại");
    }
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const saveDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let draftid = req.query.draft;
    let { name, description, content } = req.body;

    if (!draftid) throw new Error("Phiên bản không tồn tại!");

    let section = await db.section.findOne({
      where: {
        id: sectionid,
      },
    });

    if (section) {
      let draft = await db.sequelize.query(
        "SELECT * FROM section_drafts WHERE id = " + draftid + " LIMIT 1",
        {
          type: db.sequelize.QueryTypes.SELECT,
        }
      );

      if (draft.length == 0) throw new Error("Phiên bản không tồn tại!");

      await db.sequelize.query(
        `UPDATE section_drafts
        SET user_id = ?, 
        name = ?, 
        description = ?, 
        content = ?,
        updated_at = CURRENT_TIMESTAMP()
        WHERE section_id = ` +
          sectionid +
          ` AND id = ` +
          draftid,
        {
          replacements: [req.tokenData.id, name, description, content, 0],
          type: db.sequelize.QueryTypes.INSERT,
        }
      );
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
  publishSection,
  getListDraft,
  saveNewDraft,
  saveDraft,
};
