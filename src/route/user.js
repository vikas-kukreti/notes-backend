const router = require("express").Router()
const controller = require("../controller/user")

router.get('/', controller.getUser)
router.patch('/', controller.updateUser)
router.post('/profile', controller.updateProfile) // DONT DO THIS

module.exports = router