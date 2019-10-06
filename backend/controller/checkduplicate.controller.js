const db = require("../models");
const response = require("../utils/response");

const checkDuplicate = async (req, res) => {
  try {
    const { book, volume, chapter } = req.body;
    let filter = "";
    if (chapter) {
      filter = "c.id = " + chapter;
    } else if (volume) {
      filter = "v.id = " + volume;
    } else if (book) {
      filter = "b.id = " + book;
    }

    const filterIn =
      `
      SELECT min(s.id) FROM sections s
      LEFT JOIN chapters c ON s.chapter_id=c.id
      LEFT JOIN volumes v ON c.volume_id=v.id
      LEFT JOIN books b ON v.book_id=b.id
      WHERE ` +
      filter +
      ` GROUP BY s.name
    `;

    if (filter.length > 1) {
      filter = [];
    }

    const countQuery = `SELECT s.name as section_name, COUNT(s.name) as count
    FROM sections s
    GROUP BY s.name
    HAVING count > 1`;
    let sections = await db.sequelize.query(
      `SELECT s.id as section_id, s.name as section_name, 
      c.id as chapter_id, c.name as chapter_name, 
      v.id as volume_id, v.name as volume_name, 
      b.id as book_id, b.name as book_name, 
      T1.count as count
      FROM sections s
      LEFT JOIN chapters c ON s.chapter_id=c.id
      LEFT JOIN volumes v ON c.volume_id=v.id
      LEFT JOIN books b ON v.book_id=b.id
      INNER JOIN (` +
        countQuery +
        `) as T1
      ON s.name =  T1.section_name 
      WHERE s.id IN (` +
        filterIn +
        `)`,
      {
        type: db.sequelize.QueryTypes.SELECT
      }
    );
    res.json(response.success(sections));
  } catch (e) {
    res.json(response.fail(e.message));
  }
};

module.exports = {
  checkDuplicate
};
