const express = require("express");
const router = express.Router();
// const roommodel = require("../db/model/roommodel")
const db = require("../mysql/mysql");
const sqlSeach = "select * from userInfo where nickName=?";
const sqlInsert = "insert into userInfo set ?";
const todaysqlInsert = "insert into todayInfo set ?";
const daysqlInsert = "insert into dayInfo set ?";
const sqlUpdate = "update userInfo set ? where nickName=?";
/**
 * @api {post} /room/roomlist 房间信息表
 * @apiVersion 0.0.1
 * @apiName 获得房间信息
 * @apiGroup 房间信息
 *
 * @apiParam {String} roomName 房间名字*
 *
 * @apiSuccess {Array} inf 房间列表
 */
router.post("/loginInfo", (req, res) => {
    if (req.body.code == 0) {
        db.exec(sqlSeach, [req.body.nickName], (err, data, fields) => {
            if (err) {
                console.log(err)
            } else {
                console.log(data.length)
                if (data.length == 0) {
                    const { avatarUrl, city, country, gender, language, nickName, province } = req.body
                    const userInfo = { avatarUrl, city, country, gender, language, nickName, province }
                    db.exec(sqlInsert, [userInfo], (err, data, fields) => {
                        if (!err) {
                            res.send({
                                inf: data,
                                err: 0,
                                meg: "添加成功",
                            });
                        } else {
                            console.log(err)
                        }
                    });
                }
            }
        })
    } else if (req.body.code == 1) {
        const { nickName, openid, session_key } = req.body
        db.exec(sqlUpdate, [{ openid, session_key }, nickName], (err, data, fields) => {
            if (err) {
                console.log(err)
            }
            res.send({
                inf: data,
                err: 0,
                meg: "更新成功",
            });
        });
    } else if (req.body.code == 2) {
        const { nickName } = req.body
        db.exec(sqlSeach, [nickName], (err, data, fields) => {
            if (err) {
                console.log(err)
            }
            res.send({
                inf: data,
                err: 0,
                meg: "查找成功",
            });
        });
    }
});

module.exports = router;
