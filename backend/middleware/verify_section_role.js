const response = require("../utils/response");
const db = require("../models");

const sectionRole = async (userId, sectionId) => {
    // 2 editor of section
    // 1 admin of section
    const role = await db.sections_user.findOne({
        where: {
            section_id: sectionId,
            user_id: userId
        }
    });

    if (role) {
        return role.role_id;
    } else {
        return 0
    }
}

const isEditableSection = async (req, res, next) => {
    try {
        const userId = req.tokenData.id;
        const role = await sectionRole(userId, req.query.id);

        if (role != 0) {
            next();
        } else {
            return res.json(response.fail("Bạn không có quyền truy cập nội dung này", "NO_ROLE"));
        }
    } catch (err) {
        return res.json(response.fail(err.message));
    }
};

module.exports = {
    sectionRole,
    isEditableSection
};
