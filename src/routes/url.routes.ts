import { Router } from "express";
import {
  deleteShortUrl,
  redirectToLongUrl,
  shortenUrl,
} from "../controllers/url.controller";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/:shortCode", redirectToLongUrl);
router.delete("/:shortCode", deleteShortUrl);

export default router;
