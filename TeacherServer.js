const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParse = require("body-parser");
const mysql = require("mysql");

const SecretKey = "*newHumanResourceServer*";

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "teacherdb",
});

const server = express();

server.use(cors());
server.use(bodyParse.json());

server.post("/teacherserver/login", async (req, resp) => {
  let {UserName} = req.body
  let result;
  let sql = `SELECT Username FROM registerdteachers WHERE Username = '${UserName}'`
  con.query(sql, (err, res) => {
    if (err) throw err;
    else {
        result = JSON.parse(JSON.stringify(res))
        if (result.length === 0) {
          resp.send({ auth: false });
        } else {
          // JWT Token
          jwt.sign(
            { UserName },
            SecretKey,
            { expiresIn: "900s" },
            (err, token) => {
              resp.json({ token, auth:true });
            }
          );
        }
    }
  })
});


server.listen(8080, () => {
  console.log("Server Started .. ");
});