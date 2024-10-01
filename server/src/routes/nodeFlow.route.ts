import express, { Router } from "express";
import flowController from "../controller/flow.controller";
import path from "path";

// Initialize the router
const router: Router = express.Router();

// Routes
router.route("/").get(flowController.fetchFlowData).post(flowController.addNewFlow);

router.route("/addflow").post();

// Export the router
export default router;
