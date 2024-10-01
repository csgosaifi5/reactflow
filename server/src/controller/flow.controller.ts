import { Request, Response } from "express";
import utils from "../utils/utils";
import flowService from "../services/nodeFlow.service";

export default {
  fetchFlowData: async function (req: Request, res: Response) {
    let result = await flowService.list(req.body);
    utils.sendResponse(result, req, res);
  },
  addNewFlow: async function (req: Request, res: Response) {
    let result = await flowService.addFlow(req.body);
    utils.sendResponse(result, req, res);
  },
};
