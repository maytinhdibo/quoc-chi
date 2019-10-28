const db = require("../models");
const response = require("../utils/response");
var _ = require("lodash");
var stringify = require("json-stringify-safe");

const overview = async (req, res) => {
  try {
    const list = await db.sequelize.query(
      `SELECT 'users' as name, count(*) as total FROM users
    UNION
    SELECT 'docs' as name, count(*) as total FROM documentations
    UNION
    SELECT 'sections' as name, count(*) as total FROM sections
    UNION
    SELECT 'sections_done' as name, count(*) as total FROM sections WHERE section_state_id = 1`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    const convertList = _.reduce(
      list,
      function(hash, value) {
        var key = value["name"];
        hash[key] = value["total"];
        return hash;
      },
      {}
    );
    res.json(response.success(convertList));
  } catch (err) {
    res.json(response.fail(err.message));
  }
};

const getBooks = async (req, res) => {
  try {
    list = await db.sequelize.query(
      `SELECT countNumber.*, users.name as user_name, users.id as user_id, doc.docs as doc FROM
      (SELECT countResult.id, countResult.name, countResult.volume, countResult.chapter, countResult.section, count(books_users.user_id) as user FROM
      (SELECT c.id, c.name, c.volume, c.chapter, COUNT(sections.id) as section FROM (
      SELECT v.id, v.name, v.volume, COUNT(chapters.id) as chapter 
      FROM (
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

      LEFT JOIN (SELECT books.id as id, COUNT(sections_docs_logs.documentation_id) as docs
      FROM sections 
      JOIN sections_docs_logs ON sections_docs_logs.section_id = sections.id
      LEFT JOIN chapters ON chapters.id=sections.chapter_id
      LEFT JOIN volumes ON volumes.id=chapters.id
      LEFT JOIN books ON books.id=volumes.id
      WHERE books.id IS NOT NULL
      GROUP BY books.id) doc ON doc.id = countNumber.id

      ORDER BY countNumber.id`,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    var result = [];

    list.forEach(e => {
      if (result[e.id]) {
        result[e.id].bookAdmins.push({
          id: e.user_id,
          name: e.user_name
        });
      } else {
        result[e.id] = {
          id: e.id,
          name: e.name,
          user: e.user,
          volume: e.volume,
          chapter: e.chapter,
          section: e.section,
          doc: e.doc,
          bookAdmins: [
            {
              id: e.user_id,
              name: e.user_name
            }
          ]
        };
      }
    });
    result = result.filter(function(el) {
      return el != null;
    });
    res.json(response.success(result));
  } catch (err) {
    return res.json(response.fail(err.message));
  }
};

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
    });
    res.json(response.success({ book, bookAdmin }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

getVolumes = async (req, res) => {
  try {
    let bookid = req.query.id;
    let countChapter = await db.sequelize.query(
      `
        SELECT v.id as id, v.name,
	    sum(if(s.section_state_id = 6, 1, 0)) as sum_empty,
	    sum(if(s.section_state_id = 1, 1, 0)) as sum_done,
        sum(if(s.section_state_id > 1 AND s.section_state_id<6, 1, 0)) as sum_editing
        FROM books b
        LEFT JOIN volumes v ON v.book_id=b.id
        LEFT JOIN chapters c ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        WHERE b.id=` +
        bookid +
        `
        GROUP BY v.id`,
      { type: db.sequelize.QueryTypes.SELECT }
    );

    let countEditor = await db.sequelize.query(
      `    
        SELECT v.id as id, COUNT(su.user_id) as count_editor
        FROM books b
        LEFT JOIN volumes v ON v.book_id=b.id
        LEFT JOIN chapters c ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        LEFT JOIN sections_users su ON s.id=su.section_id
        WHERE b.id=` +
        bookid +
        `
        GROUP BY v.id`,
      { type: db.sequelize.QueryTypes.SELECT }
    );

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
    });
    var merge = _.merge(
      countChapter,
      countEditor,
      JSON.parse(stringify(volumeAdmin))
    );
    res.json(response.success(merge));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

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
    });
    res.json(response.success({ volume, volumeAdmin }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};
getChapters = async (req, res) => {
  try {
    let bookid = req.query.id;
    let result = await db.sequelize.query(
      `
        SELECT countResult.*, count(sections_users.user_id) as count_editor FROM
        (SELECT c.id, c.name, c.volume_id as volume_id,
        sum(if(s.section_state_id = 6, 1, 0)) as sum_empty,
        sum(if(s.section_state_id = 1, 1, 0)) as sum_done,
        sum(if(s.section_state_id > 1 AND s.section_state_id<6, 1, 0)) as sum_editing
        FROM chapters c
        LEFT JOIN volumes v ON c.volume_id=v.id
        LEFT JOIN sections s ON s.chapter_id=c.id
        WHERE v.id=` +
        bookid +
        `
        GROUP BY c.id) countResult
        LEFT JOIN volumes ON countResult.volume_id=volumes.id
        LEFT JOIN sections ON sections.chapter_id=countResult.id
        LEFT JOIN sections_users  ON sections_users.section_id=sections.id
        WHERE volumes.id=` +
        bookid +
        `
        GROUP BY countResult.id;
        `,
      { type: db.sequelize.QueryTypes.SELECT }
    );
    res.json(response.success(result));
  } catch (e) {
    res.json(respone.fail(e.message));
  }
};

const getChapter = async (req, res) => {
  try {
    let chapterId = req.query.id;
    var chapter = await db.chapter.findOne({
      where: {
        id: chapterId
      },
      attributes: ["name", "description", "introduction"]
    });
    res.json(response.success({ chapter }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getSections = async (req, res) => {
  try {
    let chapterId = req.query.id;
    var sections = await db.sequelize.query(
      `
    SELECT s.id as section_id, s.name as section_name,
    u.id as user_id, u.name as user_name,
    r.id as reviewer_id, r.name as reviewer_name, 
    s.section_state_id as state_id, ss.name as state_name, s.updated_at,
    T1.count as document_count
    FROM sections s
    LEFT JOIN sections_users su ON su.section_id = s.id
    LEFT JOIN users u ON su.user_id = u.id
    LEFT JOIN users r ON s.reviewer_id = r.id
    LEFT JOIN section_states ss ON s.section_state_id = ss.id
    LEFT JOIN (SELECT count(*) as count, section_id FROM sections_docs_logs GROUP BY section_id) T1 ON T1.section_id = s.id
    WHERE s.chapter_id = ` + chapterId,
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );

    var result = _.chain(sections)
      .groupBy("section_id")
      .map(function(v, i) {
        return {
          id: i,
          name: _.get(_.find(v, "section_name"), "section_name"),
          updated_at: _.get(_.find(v, "updated_at"), "updated_at"),
          document_count: _.get(_.find(v, "document_count"), "document_count")
            ? _.get(_.find(v, "document_count"), "document_count")
            : 0,
          reviewer: {
            id: _.get(_.find(v, "reviewer_id"), "reviewer_id"),
            name: _.get(_.find(v, "reviewer_name"), "reviewer_name")
          },
          state: {
            id: _.get(_.find(v, "state_id"), "state_id"),
            name: _.get(_.find(v, "state_name"), "state_name")
          },
          users: _.map(v, "user_id").map((data, key) => {
            return {
              id: data,
              name: _.map(v, "user_name")[key]
            };
          })
        };
      })
      .value();

    res.json(response.success({ sections: result }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getSection = async (req, res) => {
  try {
    let sectionId = req.query.id;
    var section = await db.section.findOne({
      where: {
        id: sectionId
      },
      include: [
        {
          model: db.user,
          as: "reviewer",
          attributes: ["id", "name"]
        }
      ],
      attributes: ["name", "description", "content"]
    });
    res.json(response.success({ section }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getDocs = async (req, res) => {
  try {
    var documentations = await db.sequelize.query(
      `
      SELECT d.id as doc_id, d.name as doc_name, d.updated_at as updated_at,
      d.doc_state_id as state_id, ds.name as state_name,
      u.id as user_id, u.name as user_name,
      a.id as approver_id, a.name as approver_name,
      T1.count as total_section
      FROM documentations d
      LEFT JOIN users u ON u.id=d.user_id
      LEFT JOIN users a ON a.id=d.approver_id
      LEFT JOIN doc_states ds ON d.doc_state_id = ds.id
      LEFT JOIN (
        SELECT count(*) as count, documentation_id as id
        FROM sections_docs_logs
        GROUP BY documentation_id) T1 
      ON T1.id=d.id
   `,
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    documentations = documentations.map(object => {
      return {
        id: object.doc_id,
        name: object.doc_name,
        user: {
          id: object.user_id,
          name: object.user_name
        },
        approver: {
          id: object.approver_id,
          name: object.approver_name
        },
        state: {
          id: object.state_id,
          name: object.state_name
        },
        total_section: object.total_section,
        updated_at: object.updated_at
      };
    });
    res.json(response.success({ documentations }));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

const getDoc = async (req, res) => {
  try {
    const { id } = req.query;
    var documentation = await db.sequelize.query(
      `
      SELECT d.id as doc_id, d.name as doc_name, d.updated_at as updated_at,
      d.content as content, d.url as url,
      d.doc_state_id as state_id, ds.name as state_name,
      u.id as user_id, u.name as user_name,
      a.id as approver_id, a.name as approver_name,
      T1.count as total_section
      FROM documentations d
      LEFT JOIN users u ON u.id=d.user_id
      LEFT JOIN users a ON a.id=d.approver_id
      LEFT JOIN doc_states ds ON d.doc_state_id = ds.id
      LEFT JOIN (
        SELECT count(*) as count, documentation_id as id
        FROM sections_docs_logs
        GROUP BY documentation_id) T1 
      ON T1.id=d.id
      WHERE d.id=` +
        id +
        ` LIMIT 1`,
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    if (documentation.length == 0) {
      throw new Error("Không tìm thấy tư liệu");
    }
    let object = documentation[0];
    documentation = {
      id: object.doc_id,
      name: object.doc_name,
      content: object.content,
      url: object.url,
      user: {
        id: object.user_id,
        name: object.user_name
      },
      approver: {
        id: object.approver_id,
        name: object.approver_name
      },
      state: {
        id: object.state_id,
        name: object.state_name
      },
      total_section: object.total_section,
      updated_at: object.updated_at
    };
    res.json(response.success(documentation));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

module.exports = {
  overview,
  getBooks,
  getBook,
  getVolumes,
  getVolume,
  getChapters,
  getChapter,
  getSections,
  getSection,
  getDocs,
  getDoc
};
