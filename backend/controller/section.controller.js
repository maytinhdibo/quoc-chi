const db = require("../models");
const response = require("../utils/response");

const { sectionRole } = require("../middleware/verify_section_role");

const moment = require("moment");

const newSection = async (req, res) => {
  try {
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

const publishSection = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content } = req.body;

    // let draftid = req.query.version;

    // if (!draftid) throw new Error("Phiên bản không tồn tại!");

    let section = await db.section.findOne({
      where: {
        id: sectionid
      }
    });

    let draft = await db.sequelize.query(
      "SELECT * FROM section_drafts WHERE section_id = " + sectionid + " AND published = 0 LIMIT 1",
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    if (draft.length == 0) {
      // throw new Error("Phiên bản nháp không tồn tại để xuất bản!");
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
            1
          ],
          type: db.sequelize.QueryTypes.INSERT
        }
      );
      res.json(response.success());
    }

    await db.sequelize.query(
      `UPDATE section_drafts
      SET user_id = ?, 
      name = ?, 
      description = ?, 
      content = ?,
      published = ?,
      updated_at = CURRENT_TIMESTAMP()
      WHERE section_id = ` +
      sectionid +
      ` AND id = ` +
      draft[0].id,
      {
        replacements: [req.tokenData.id, name, description, content, 1],
        type: db.sequelize.QueryTypes.UPDATE
      }
    );

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

const getListDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;

    let drafts = await db.sequelize.query(
      `SELECT sd.id as id, sd.name as name, sd.published as published,sd.comments as comments, sd.updated_at as updated_at, u.id as user_id, u.name as user_name FROM section_drafts sd
      LEFT JOIN users u ON u.id = sd.user_id
      WHERE section_id=` +
      sectionid +
      `
      ORDER BY sd.updated_at DESC
      `,
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    drafts = drafts.map(object => {
      return {
        id: object.id,
        name: object.name,
        published: object.published,
        updated_at: object.updated_at,
        comments: object.comments,
        // user: {
        //   id: object.user_id,
        //   name: object.user_name
        // }
      };
    });

    res.json(response.success(drafts));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const saveDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content, commit } = req.body;

    commit = "<li>(" + moment().format('DD/MM/YYYY H:MM') + ") " + commit + "</li>";

    let section = await db.section.findOne({
      where: {
        id: sectionid
      }
    });

    if (section) {

      let draft = await db.sequelize.query(
        "SELECT * FROM section_drafts WHERE section_id = " + sectionid + " AND published = -1 LIMIT 1",
        {
          type: db.sequelize.QueryTypes.SELECT
        }
      );

      // if (draft.length == 0) throw new Error("Phiên bản không tồn tại!");

      if (draft.length == 0) {
        saveNewDraft(req, res);
        return 0;
      }

      await db.sequelize.query(
        `UPDATE section_drafts
        SET user_id = ?, 
        name = ?, 
        description = ?, 
        content = ?,
        published = ?,
        comments = ?,
        updated_at = CURRENT_TIMESTAMP()
        WHERE section_id = ` +
        sectionid +
        ` AND id = ` +
        draft[0].id,
        {
          replacements: [req.tokenData.id, name, description, content, -1, draft[0].comments + commit],
          type: db.sequelize.QueryTypes.UPDATE
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

const saveNewDraft = async (req, res) => {
  try {
    let sectionid = req.query.id;
    let { name, description, content, commit } = req.body;

    commit = "<li>(" + moment().format('DD/MM/YYYY H:MM') + ") " + commit + "</li>";

    let section = await db.section.findOne({
      where: {
        id: sectionid
      }
    });

    if (section) {
      let drafts = await db.sequelize.query(
        `INSERT INTO section_drafts(section_id, user_id, name, description, content, published, updated_at, comments) 
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(), ?)`,
        {
          replacements: [
            sectionid,
            req.tokenData.id,
            name,
            description,
            content,
            -1,
            commit
          ],
          type: db.sequelize.QueryTypes.INSERT
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


const getSection = async (req, res) => {
  try {
    let sectionId = req.query.id;
    let version = req.query.draft;

    //type is edit/null
    let type = req.query.type;

    if (type == "edit") {
      let role = await sectionRole(req.tokenData.id, sectionId);
      if (role == 0) throw new Error("Bạn không có quyền đối với mục này");
    }

    if (version != "undefined") {
      var section = await db.section_draft.findOne({
        where: {
          section_id: sectionId,
          id: version
        },

        attributes: ["name", "description", "content", "published", "id"]
      });
      if (!section) throw new Error("Phiên bản không tồn tại");
      res.json(response.success({ section }));
    } else {
      //tìm version cuối cùng của user
      var section = await db.section_draft.findAll({
        where: {
          section_id: sectionId,
          // user_id: req.tokenData.id
        },
        limit: 1,
        order: [["updated_at", "DESC"]],
        attributes: ["name", "description", "content", "published", "id"]
      });
      if (section.length != 0) {
        res.json(response.success({ section: section[0] }));
      } else {
        //tìm version mới nhất được xuất bản
        console.log("search");
        let version = await getLastVersion(sectionId);
        res.json(response.success({ section: version }));
      }
    }
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getEditableVersion = async (req, res) => {
  try {
    let sectionId = req.query.id;
    var version = await db.section_draft.findOne({
      where: {
        section_id: sectionId,
        published: -1
      },
      attributes: ["id"]
    });

    if (version) {
      res.json(response.success({ version: version.id }))
    } else {
      //tạo bản nháp mới từ bản mới nhất
      let section = await getLastVersion(sectionId);
      console.log(section);
      let drafts = await db.sequelize.query(
        `INSERT INTO section_drafts(section_id, name, description, content, published, comments, updated_at) 
        VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP())`,
        {
          replacements: [
            sectionId,
            section.name,
            section.description,
            section.content,
            -1,
            ""
          ],
          type: db.sequelize.QueryTypes.INSERT
        }
      );

      res.json(response.success({ version: drafts[0] }));
    }

  } catch (e) {
    res.json(response.fail(e.message));
  }
}

const getLastVersion = async sectionId => {
  var defaultVal = {
    name: "",
    id: sectionId,
    content: "",
    user_id: -1
  };
  try {

    var section = await db.section_draft.findAll({
      where: {
        section_id: sectionId,
        // user_id: req.tokenData.id,
        published: 1
      },
      limit: 1,
      order: [["updated_at", "DESC"]],
      attributes: ["name", "description", "content", "published", "id"]
    });

    if (section.length > 0) {
      console.log(section[0].name);
      return section[0];
    } else {
      let section = await db.section.findOne({
        where: {
          id: sectionId
        },
        attributes: ["name"]
      });
      defaultVal.name = section.name;
      return defaultVal;
    }
  } catch (e) {
    return defaultVal;
  }
};

const getEditors = async (req, res) => {
  try {
    const sectionId = req.query.id;

    var editors = await db.sections_user.findAll({
      where: {
        section_id: sectionId
      },
      attributes: [],
      include: [
        {
          attributes: ["name", "email", "id"],
          model: db.user
        }
      ]
    });

    editors = editors.map(role => {
      return role.user;
    })

    res.json(response.success(editors));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const editEditors = async (req, res) => {
  try {
    const sectionId = req.query.id;
    const { users } = req.body;

    await db.sequelize.query(
      `DELETE FROM sections_users WHERE section_id = ` + sectionId,
      { type: db.sequelize.QueryTypes.DELETE }
    );

    users.forEach(async (element) => {
      await db.sections_user.create({
        sectionId: sectionId,
        userId: element,
        role: 1
      });
    });

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
  getLastVersion,
  getSection,
  getEditableVersion,
  getEditors,
  editEditors,
};
