const express = require("express");
const router = express.Router();
const { createPost } = require("../controllers/post.controller");

router.route("/:uid")
.post(createPost);

module.exports = router;