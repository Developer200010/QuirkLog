const router = require("express").Router();
const multer = require("multer");
// Multer memory storage (no disk I/O)
const storage = multer.memoryStorage();
const upload = multer({ storage }); // no file size/type restriction here
const {addPost, getAllPosts, deletePost, updatePost, getPostById} = require("../controllers/postController.js")
// CREATE POST (with optional image)
router.post("/", upload.single("photo"), addPost);

// UPDATE POST
router.put("/:id", updatePost);

// DELETE POST
router.delete("/:id", deletePost);

// GET SINGLE POST (return JSON, not image binary)
router.get("/:id", getPostById);

// LIST POSTS (pagination + filters stay the same)
router.get("/", getAllPosts);


module.exports = router;
