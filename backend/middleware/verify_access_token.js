const response = require('../utils/response');
const jwt = require('jsonwebtoken');
const secretkey = require('../config/secretkey');

function verifyAccessToken(req, res, next) {
    const token = req.headers["token"];
    if (token) {
        jwt.verify(token, secretkey.SECRET_ACCESS_KEY, function (err, decoded) {
            if (err){
                if(err.name=="TokenExpiredError"){
                    return res.json(response.fail("Phiên hết hạn"))
                }else{
                    return res.json(response.fail("Lỗi đăng nhập"))
                }
            }
            else req.tokenData = decoded;
            next();
        })
    } else return res.json(response.fail("Token Missing"));
}

module.exports = {
    verifyAccessToken
};