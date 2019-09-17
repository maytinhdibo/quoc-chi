const db = require('../models');
const response = require('../utils/response');


//need edit
const newChapter = async (req, res) => {
    try {
        let volumeid = req.query.id;
        let { name, description } = req.body;
        let newvolume = await db.chapter.create({
            name:name,
            description:description,
            volumeId: volumeid
        });

        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}

//need edit
const editChapter = async (req, res) => {
    try {
        let volumeid = req.query.id;
        let { name, adminValue, description } = req.body;
        await db.users_volume.destroy({
            where: {
                volume_id: volumeid
            }
        })

        let volume = await db.volume.findOne({
            where: {
                id: volumeid
            }
        });

        if (volume) {
            await volume.update({
                name: name,
                description: description
            });
        } else {
            throw new Error("Quyển không tồn tại");
        }

        adminValue.forEach(async (element) => {
            await db.users_volume.create({
                volumeId: volumeid,
                userId: element
            }).catch(e => {
                throw new Error("Lỗi dữ liệu nhập vào")
            });
        });
        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}


module.exports = {
    newChapter,
    editChapter
}
