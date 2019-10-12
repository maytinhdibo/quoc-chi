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
        let chapterId = req.query.id;
        let { name, description } = req.body;
       
        let chapter = await db.chapter.findOne({
            where: {
                id: chapterId
            }
        });

        if (chapter) {
            await chapter.update({
                name: name,
                description: description
            });
        } else {
            throw new Error("Chương không tồn tại");
        }

        res.json(response.success());
    } catch (e) {
        res.json(response.fail(e.message));
    }
}


module.exports = {
    newChapter,
    editChapter
}
