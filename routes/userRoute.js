const router = require("express").Router();
const multer = require("multer")
const { updateUser, deleteUser, getUserBYId } = require("../controllers/userController.js");
// update
const storage = multer.memoryStorage();
const upload = multer({ storage }); 

router.put("/:id", upload.single("profilePic"), updateUser);

// ================== DELETE USER (unchanged) ==================
router.delete("/:id", deleteUser);

// ================== GET USER (unchanged) ==================
router.get("/:id", getUserBYId);

module.exports = router;