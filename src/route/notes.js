const router = require("express").Router()
const controller = require("../controller/notes")

router.get("/", controller.getNotes)
router.post("/", controller.createUpdateNote)
router.delete("/", controller.deleteNote)

module.exports = router
