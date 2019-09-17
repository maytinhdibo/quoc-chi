const db = require('../models');
const response = require('../utils/response');


const newVolume = async (req, res) => {
    try {
        let bookid = req.query.id;
        let { name, adminValue, description } = req.body;
        let newvolume = await db.volume.create({
            name:name,
            description:description,
            bookId: bookid
        });

        adminValue.forEach(async (element) => {
            let bu = await db.books_user.findOne({
                where: {
                    bookId: bookid,
                    userId: element
                }
            });
            if (bu) {
                await db.books_user.create({
                    bookId: bookid,
                    userId: element,
                    bookRoleId: 7
                })
            }
            await db.users_volume.create({
                volumeId: newvolume.id,
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

const editVolume = async (req, res) => {
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
    newVolume,
    editVolume
}
