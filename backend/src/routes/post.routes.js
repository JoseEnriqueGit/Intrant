import { Router } from "express";
import {
	getCitations,
    getCitation,
	newCitation,
	modicCitation,
	deleteCitation,
} from "../controllers/post.controller.js";
const router = Router();

router.get("/all-citations", getCitations);

router.get("/citation", getCitation);

router.post("/new-citation", newCitation);

router.put("/modic-citation", modicCitation);

router.delete("/delete-citation", deleteCitation);

// router.get("/", (req, res) => {
// 	res.send("Hello from post router");
// });

// router.get("/", (req, res) => {
// 	res.send("Hello from post router");
// });

export default router;
