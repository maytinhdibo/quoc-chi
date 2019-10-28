const response = require("../utils/response");
const jwt = require("jsonwebtoken");
const secretkey = require("../config/secretkey");
const db = require("../models");
const Op = db.Sequelize.Op;

const isAdmin = async (req, res, next) => {
  try {
    const userId = req.tokenData.id;
    const user = await db.users_role.findOne({
      where: {
        userId,
        roleId: 1
      }
    });
    if (user) {
      next();
    } else {
      return res.json(response.fail("Bạn không có quyền truy cập nội dung này", "NO_ROLE"));
    }
  } catch (err) {
    return res.json(response.fail(err.message));
  }
};

module.exports = {
  isAdmin
};
