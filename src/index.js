const express = require("express")
const cors = require('./middleware/cors')
const authRouter = require("./route/auth")
const notesRouter = require("./route/notes")
const userRouter = require("./route/user")
const fileUpload = require("express-fileupload")

const app = express()

app.use(cors)
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
app.use(fileUpload())

app.use("/public", express.static("public"))
app.use("/auth", authRouter)
app.use("/notes", notesRouter)
app.use("/user", userRouter)

app.listen(8080, () => {
    console.log("🚀 Server is running on port 8080!")
})