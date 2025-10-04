const router = require("express").Router();
const { sendCertificates, getUsers, deleteUser, addStudent } = require("../controller/studentController");
const auth = require("../middleware/authMiddleware");


router.route('/add').post(auth, addStudent);
router.route("/getUsers").get(auth, getUsers);
router.route('/send-certificates').post(auth, sendCertificates)
router.route('/deleteUser').delete(auth, deleteUser)


module.exports = router;