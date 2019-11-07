const express = require('express');
const router = express.Router();
const db = require('./../../models');
const jwt = require('jsonwebtoken');
const key = require('../../config/secretkey');
const auth = require('../../middleware/verify_access_token');
const controller = require('../../controller/user.controller')

// router.post("/login", auth.verifyAccessToken, controller.login);

router.post("/user/login", controller.login);
router.get("/user", auth.verifyAccessToken, controller.getRefresh);
router.post("/user/getList", auth.verifyAccessToken, controller.get);
router.get("/user/getInfo", auth.verifyAccessToken, controller.getInfo);
router.post("/user/register", controller.register);

// router.get("/user", (req, res, next) => {
//     if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//         jwt.verify(req.headers.authorization.split(' ')[1], 'quoCchi2019', function(err, decode) {
//           if(err){
//             res.json(err);
//           } else{
//              db.user.findOne({ where: {id: decode.id} }).then(user=>{
//                  res.json({
//                      username: user.username
//                  });
//              })
//           }
//         //   next();
//         });
//       } else {
//         // next();
//       }
// })

// router.post("/user", (req, res) => {
//     res.json({ message: 'POST Method!' });
// })

// router.post("/createUser", (req, res) => {
//     try {
//         let { username, password } = req.body;
//         if (username.length > 0 && password.length > 0) {
            // encrypted_password = bcrypt.hashSync(password, 10);
            // db.user.create({ username, encrypted_password }).then(() => {
            //     res.json(
            //         {
            //             success: true
            //         }
            //     );
            // });
//         }
//     } catch (err) {
//         res.json({
//             success: false,
//             message: err.message
//         })
//     }

// });

// router.post("/login", async (req, res) => {
//     try {
//         let { username, password } = req.body;
//         if (username.length > 0 && password.length > 0) {
//             let user = await db.user.authenticate(username, password)
//             return res.json(user);
//         }
//     } catch (err) {
//         res.json({
//             success: false,
//             message: err.message
//         })
//     }

// });


module.exports = router;