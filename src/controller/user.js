const conn = require("../config/db")

module.exports.getUser = (req, res) => {
    // GET USER DATA FROM DATABASE AND SEND IT TO FRONTEND
}

module.exports.updateUser = (req, res) => {
    // UPDATE USER DATA
}

module.exports.updateProfile = (req, res) => {
    // DONT TOUCH THIS NOW
    const {id, name} = req.body
    const user = {
        name
    }
    let query = "UPDATE user SET name = ?, profile = ? WHERE id = ?"
    let params = [];
    if(req.files) {
        const {image} = req.files
        const fileName = id + "_" + image.md5 + ".jpg" 
        console.log(fileName)
        image.mv("./public/profile/" + fileName)
        params = [name, fileName, id]
        user.profile = fileName
    } else {
        query = "UPDATE user SET name = ? WHERE id = ?"
        params = [name, id]
    }
    
    conn.query(
        query,
        params,
        (err, result) => {
            if(err) {
                res.json({
                    status: false,
                    message: "Something went wrong!",
                })
            }
            res.json({
                status: true,
                message: "Update success!",
                user: user
            })
        }
    )
    
}
