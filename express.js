// 导入express 和 mysql
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);

let express = require("express");
let {
    createProxyMiddleware: proxy
} = require('http-proxy-middleware');
let mysql = require("mysql");

// 
let app = express();

let con = mysql.createConnection({
    host: "localhost",
    user: "flowers",
    password: "123456",
    database: "flowers",
})
con.connect();

app.use(express.static("./"));

// app.use("/api",proxy({
//     target:"http://localhost:8090",
//     changeOrigin:true,
//     pathRewrite:{
//         "^/api":"/",
//     }
// })
// )

// 注册接口
app.use("/get", (req, res) => {
    let {
        username,
        tell,
        password
    } = req.query;
    console.log(username, tell, password);
    con.query(`SELECT * FROM user WHERE name = "${username}"`, (err, data) => {
        console.log(data);
        if (data != "") {
            let msg = {
                code: false,
                msg: "用户已存在"
            };
            res.send(msg)
            return;
        }
        con.query(`INSERT INTO user VALUES (NULL, "${username}", "${tell}", "${password}")`, (err, data) => {
            console.log(data);
            let msg = {
                code: true,
                msg: "注册成功"
            };
            res.send(msg);
            return;
        })
    })

})


// 登录接口
app.get("/getuser", (req, res) => {
    let {
        username,
        password
    } = req.query;
    con.query(`SELECT * FROM user WHERE name="${username}"`, (err, data) => {
        if (data == "") {
            let msg = {
                code: false,
                msg: "用户不存在"
            };
            res.send(msg);
            return;
        }
        con.query(`SELECT * FROM user WHERE name="${username}" AND password = "${password}"`, (err, data) => {
            if (data == "") {
                let msg = {
                    code: false,
                    msg: "用户名或密码错误"
                }
                res.send(msg);
                return;
            }
            let msg = {
                code: true,
                msg: "登录成功"
            };
            res.send(msg);
        })

    })
})


app.listen(8090, () => {
    console.log("post runing 8090");
})