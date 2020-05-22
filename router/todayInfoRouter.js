const express = require("express");
const router = express.Router();
// const roommodel = require("../db/model/roommodel")
const db = require("../mysql/mysql");
const sqlSeach = "select * from todayInfo where openid=? and session_key = ?";
const sqlInsert = "insert into todayInfo set ?";
const sqlUpdate = "update todayInfo set ? where openid=?  and session_key = ? ";
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
router.post("/todayInfo", (req, res) => {
    if (req.body.code == 0 && req.body.openid) {
        const { rem, mohu, forget, total_word,openid,session_key } = req.body
        const todayInfo = { rem, mohu, forget, total_word,openid,session_key }
        db.exec(sqlInsert, [todayInfo], (err, data, fields) => {
            res.send({
                inf: data,
                err: 0,
                meg: "添加成功",
            });
        });
    } else if (req.body.code == 1) {
        const { rem, mohu, forget, total_word,openid,session_key } = req.body
        const todayInfo = { rem, mohu, forget, total_word }
        let info = {}
        for(let item in todayInfo){
            if(todayInfo[item]){
                info[item] = todayInfo[item]
            }
        }
        db.exec(sqlUpdate, [info, openid, session_key], (err, data, fields) => {
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
        const {  openid, session_key} = req.body
        db.exec(sqlSeach, [openid, session_key], (err, data, fields) => {
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
