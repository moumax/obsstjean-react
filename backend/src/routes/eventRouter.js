const express = require("express");
const eventControllers = require("../controllers/eventControllers");

const router = express.Router();

router.get("/", eventControllers.browse);
router.get("/:id", eventControllers.read);
router.post("/", eventControllers.add);
router.put("/:id", eventControllers.edit);
router.delete("/:id", eventControllers.destroy);

module.exports = router;
