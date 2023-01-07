import { Router } from "express";
import {
	runServer,
	getAllCitations,
	getCitation,
	newCitation,
	modicCitation,
	deleteCitation,
} from "../controllers/citationController.js";

const router = Router();

router.get("/", runServer);

router.get("/all-citations", getAllCitations);

router.get("/citation/:cedula", getCitation);

router.post("/new-citation", newCitation);

router.put("/modic-citation/:cedula", modicCitation);

router.delete("/delete-citation/:cedula", deleteCitation);

export default router;
