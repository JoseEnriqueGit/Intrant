const { Router } = require("express");
const router = Router();

const { getCitation } = require("../controllers/citation.controller");

router.route("/").get(getCitation);
// router.route("/").post(postCitation);

module.exports = router;
