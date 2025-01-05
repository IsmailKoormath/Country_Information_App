import express from "express";
import {
  allCountriesWithSearch,
  filterWithCountryCode,
  filterWithRegion,
} from "../controllers/countriesController";
const router = express.Router();
router.get("/", allCountriesWithSearch);
router.get("/:code", filterWithCountryCode);
router.get("/region/:region", filterWithRegion);

export default router;
