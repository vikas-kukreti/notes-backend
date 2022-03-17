const md5 = require("md5")
const conn = require("../config/db")

module.exports.login = function (req, res) {
    const {email, password} = req.body
    conn.query("SELECT * FROM user WHERE email = ?",[email], (err, rows) => {
        if(err) {
            res.json({
                status: false,
                message: "Something went wrong!"
            })
            return;
        }
        if(rows.length === 0) {
            res.json({
                status: false,
                message: "Email not registered!"
            })
            return;
        }

        const [row] = rows;

        if(row.password !== md5(password)) {
            res.json({
                status: false,
                message: "Incorrect Password!"
            })
            return;
        }
        res.json({
            status: true,
            message: "Login Success",
            user: {
                name: row.name,
                id: row.id,
                email: row.email
            }
        })
    })
}

module.exports.register = function(req, res) {
    const {email, password, c_password, name} = req.body
    conn.query("SELECT * FROM user WHERE email = ?",[email], (err, rows) => {
        if(rows.length > 0) {
            res.json({
                status: false,
                message: "Email already registered!"
            })
            return;
        }
        if(password !== c_password) {
            res.json({
                status: false,
                message: "Passwords do not match!"
            })
            return;
        }
        conn.query(
            "INSERT INTO user (name, email, password) VALUES(?, ?, ?)",
            [name, email, md5(password)],
            (err, result) => {
                console.log(result)
                if(err) {
                    res.json({
                        status: false,
                        message: "Unable to register!"
                    })
                    return;
                }
                res.json({
                    status: true,
                    message: "Successfully registered",
                    user: {
                        id: result.insertId,
                        name,
                        email,
                    }
                })
            })
    })
}