import { Router } from "express";
import {
	getAllCitations,
	getCitation,
	newCitation,
	modicCitation,
	deleteCitation,
} from "../controllers/citationController.js";
const router = Router();

const WEB_SERVICE = 'https://intrant-api.onrender.com'

router.get('https://intrant-api.onrender.com/all-citations', getAllCitations);

router.get(`${WEB_SERVICE} /citation/:cedula`, getCitation);

router.post(`${WEB_SERVICE} /new-citation`, newCitation);

router.put(`${WEB_SERVICE} /modic-citation/:cedula`, modicCitation);

router.delete(`${WEB_SERVICE} /delete-citation/:cedula`, deleteCitation);

export default router;
