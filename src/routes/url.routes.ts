import { Router } from "express";
import {
  deleteShortUrl,
  redirectToLongUrl,
  shortenUrl,
} from "../controllers/url.controller";
import { asyncHandler } from "../utils/async-handler.util";

const router = Router();

router.post("/shorten", asyncHandler(shortenUrl));
router.get("/:shortCode", asyncHandler(redirectToLongUrl));
router.delete("/:shortCode", asyncHandler(deleteShortUrl));

export default router;
