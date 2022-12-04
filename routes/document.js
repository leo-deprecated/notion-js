var express = require('express');
const {
    Document
} = require('../models');

var router = express.Router();

router.get('/', async(req, res) => {
    try {
        const documents = await Document.findAll();
        res.render("document", {
            documents: documents
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
});

//데이터 수정
router.put('/', async(req, res) => {
    const title = req.body.title; //post man 으로 요청 하고(웹 대신에)
    const contents = req.body.contents;
    const created_at = req.body.created_at;
    const created_by = req.body.created_by;
    const update_at = req.body.update_at;
    const update_by = req.body.update_by;
    let updateClaue = {};

    if (contents !== undefined) {
        updateClaue.contents = contents;
    }
    if (title !== undefined) {
        updateClaue.title = title;
    }
    if (created_by !== undefined) {
        updateClaue.created_by = created_by;
    }
    if (update_by !== undefined) {
        updateClaue.update_by = update_by;
    }

    console.log("updateClaue", updateClaue);
    console.log("title", title);
    console.log("created_by", created_by);

    try {
        const document = await Document.update(updateClaue, {
            where: {
                id: req.body.id
            }
        });
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        console.error(error);
        next(error);
    }

});



//데이터 삽입을 처리해주는 함수
router.post('/', async(req, res) => {
    //파라미터 읽어오기
    const title = req.body.title; //post man 으로 요청 하고(웹 대신에)
    const contents = req.body.contents;
    const created_at = req.body.created_at;
    const created_by = req.body.created_by;
    const update_at = req.body.update_at;
    const update_by = req.body.update_by;
    try {
        const document = await Document.create({
            title: title, //const title
            contents: contents,
            created_at: created_at,
            created_by: created_by,
            update_at: update_at,
            update_by: update_by
        });
        res.status(200).json({ message: 'OK' });
    } catch (error) {
        console.error(error);
        next(error);
    }

});




module.exports = router;