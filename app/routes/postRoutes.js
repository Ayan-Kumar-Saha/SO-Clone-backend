const router = require("express").Router();

const postController = require("../controllers/postController");

const { validateToken, validateUser } = require("../middlewares/authMiddleware");

router.get("/", postController.getPostsByAllUsers);
router.get("/:postId", postController.getPostByPostId);
router.post("/", [validateToken, validateUser], postController.savePost);

module.exports = router;
