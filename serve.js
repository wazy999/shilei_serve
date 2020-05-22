const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const app = express()
const axios = require("axios")
const path = require("path")
const port = 1083
const loginRouter = require("./router/loginRouter")
const daynumRouter = require("./router/daynumRouter")
const todayInfoRouter = require("./router/todayInfoRouter")


app.listen(port, () => {
	console.log(`启动服务器，端口号：${port}`)
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use("/public", express.static(path.join(__dirname, "public")))
app.use("/login", loginRouter)
app.use("/user", daynumRouter)
app.use("/user", todayInfoRouter)

app.post("/login", (req, res) => {
	let data = ""
	const { code } = req.body
	new Promise((reslove, rej) => {
		axios.get("https://api.weixin.qq.com/sns/jscode2session", {
			params: {
				appid: "wx1279fc89061caf3c",
				secret: "a5b91d1e9480111751530a20d181ff9e",
				js_code: code,
				grant_type: "authorization_code"
			}
		})
			.then(resquest => {
				console.log(resquest.data)
				data = resquest.data
				reslove()
			})
			.catch(err => {
				console.log(err)
			})
	}).then(() => {
		res.send({
			inf: data,
			err: 0,
			message: "登录成功"
		})
	}
	)

})

