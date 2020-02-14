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
      return next();
    } else {
      return res.json(response.fail("Bạn không có quyền truy cập nội dung này", "NO_ROLE"));
    }
  } catch (err) {
    return res.json(response.fail(err.message));
  }
};

const isVolumeAdmin = async (req, res, next, volumeId) => {
  try {

    const volumeAdmin = await db.users_volume.findOne({
      where: {
        volumeId,
        userId: req.tokenData.id
      }
    });

    if (volumeAdmin) {
     return next();
    }

    const volume = await db.volume.findOne({
      where: { id: volumeId }
    })

    if (!volume) return res.json(response.fail("Mục không tồn tại"));

    const bookRole = await db.books_user.findOne({
      where: { bookId: volume.bookId, userId: req.tokenData.id, bookRoleId: 1 }
    })

    if (bookRole) return next();

    return isAdmin(req, res, next);

  } catch (err) {

    console.log(err);
    return res.json(response.fail("Bạn không có quyền với mục này"));
  }
}

module.exports = {
  isAdmin,
  isVolumeAdmin
};
