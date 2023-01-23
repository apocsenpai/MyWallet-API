import { Router } from "express";
import {
  getCashFlow,
  registerClashFlow,
} from "../controllers/cashFlow.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/global.middleware.js";
import { cashFlowRegistrationSchema } from "../schemas/CashFlowSchema.js";

const cashFlowRouter = Router();

cashFlowRouter.use(authValidation);
cashFlowRouter.post(
  "/cashflow",
  validateSchema(cashFlowRegistrationSchema),
  registerClashFlow
);
cashFlowRouter.get("/cashflow", getCashFlow);
export default cashFlowRouter;
