const express = require("express");
const userControllers = require("../controllers/userControllers");

const router = express.Router();

router.get("/", userControllers.browse);
router.get("/:id", userControllers.read);
router.post("/", userControllers.add);
router.put("/:id", userControllers.edit);
router.delete("/:id", userControllers.destroy);

module.exports = router;
