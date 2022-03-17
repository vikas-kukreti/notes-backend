const conn = require("../config/db")

module.exports.getNotes = (req, res) => {
    const {id} = req.query
    conn.query("SELECT * FROM notes WHERE user_id = ?", [id], (err, rows) =>{
        if(err) {
            res.json({
                status: false,
                message: "Unable to get your notes!"
            })
            return
        }
        res.json({
            status: true,
            message: "",
            notes: rows
        })
    })
}

module.exports.createUpdateNote = (req, res) => {
    const {title, content, id, noteId} = req.body
    if(noteId) {
        conn.query(
            "UPDATE notes SET title = ?, content = ? WHERE id = ?",
            [title, content, noteId],
            (err, result) => {
                if(err) {
                    res.json({
                        status: false,
                        message: "Unable to update your note 😢!"
                    })
                    return;
                }
                res.json({
                    status: true,
                    message: "Your note has been updated!",
                })
            }
        )
    } else {
        conn.query(
            "INSERT INTO notes (user_id, title, content) VALUES (?, ?, ?)",
            [id, title, content],
            (err, result) => {
                if(err) {
                    console.log(err)
                    res.json({
                        status: false,
                        message: "Unable to add your note 😢!"
                    })
                    return;
                }
                res.json({
                    status: true,
                    message: "New note added!",
                    id: result.insertId
                })
            }
        )
    }
}

module.exports.deleteNote = (req, res) => {
    const noteId = req.query.id
    conn.query("DELETE FROM notes WHERE id = ?", [noteId], (err, result) => {
        if(err) {
            res.json({
                status: false,
                message: "Unable to delete that shitt!"
            })
            return
        }
        res.json({
            status: true,
            message: "Note deleted!"
        })
    })
}