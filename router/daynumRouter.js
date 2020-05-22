const express = require("express");
const router = express.Router();
// const roommodel = require("../db/model/roommodel")
const db = require("../mysql/mysql");
const sqlSeach = "select * from dayInfo where openid=? and session_key = ?";
const sqlInsert = "insert into dayInfo set ?";
const sqlUpdate = "update dayInfo set ? where openid=?  and session_key = ? ";
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
router.post("/dayInfo", (req, res) => {
    if (req.body.code == 0 && req.body.openid) {
        const { today_new_num, last_word, day_num, openid, my_word,session_key } = req.body
        const dayInfo = { today_new_num, last_word, day_num,my_word, openid, session_key }
        db.exec(sqlInsert, [dayInfo], (err, data, fields) => {
            res.send({
                inf: data,
                err: 0,
                meg: "添加成功",
            });
        });
    } else if (req.body.code == 1) {
        const { today_new_num, last_word, day_num, my_word,openid, session_key } = req.body
        const dayInfo = { today_new_num, last_word, my_word, day_num }
        console.log(dayInfo.my_word)
        let info = {}
        for(let item in dayInfo){
            if(dayInfo[item]){
                info[item] = dayInfo[item]
            }
        }
        console.log(info,"info")
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
