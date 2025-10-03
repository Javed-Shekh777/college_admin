const router = require("express").Router();
const { sendCertificates, getUsers, deleteUser } = require("../controller/userController");
 

router.route("/getUsers").get(getUsers);
router.route('/send-certificates').post(sendCertificates)
router.route('/deleteUser').delete(deleteUser)


module.exports = router;