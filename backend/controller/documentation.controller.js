const db = require("../models");
const response = require("../utils/response");
const _ = require("lodash");


const getSection = async (req, res) => {
  try {
    const docId = req.params.id;
    var sections = await db.sequelize.query(
      `
          SELECT s.id as section_id, s.name as section_name,
          u.id as user_id, u.name as user_name,
          r.id as reviewer_id, r.name as reviewer_name, 
          s.section_state_id as state_id, ss.name as state_name, s.updated_at,
          T1.count as document_count
          FROM sections s
          INNER JOIN sections_docs_logs sd ON sd.section_id = s.id
          LEFT JOIN sections_users su ON su.section_id = s.id
          LEFT JOIN users u ON su.user_id = u.id
          LEFT JOIN users r ON s.reviewer_id = r.id
          LEFT JOIN section_states ss ON s.section_state_id = ss.id
          LEFT JOIN (SELECT count(*) as count, section_id FROM sections_docs_logs GROUP BY section_id) T1 ON T1.section_id = s.id
          WHERE sd.documentation_id = ` + docId,
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

module.exports = {
  getSection
};
