import { Router } from "express";
import {
  deleteCashFlow,
  getCashFlow,
  getCashFlowById,
  registerClashFlow,
  updateCashFlowRegistry,
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
cashFlowRouter.delete("/cashflow/:registryId", deleteCashFlow);
cashFlowRouter.get("/cashflow", getCashFlow);
cashFlowRouter.get("/cashflow/:registryId", getCashFlowById);
cashFlowRouter.put("/cashflow/:registryId", validateSchema(cashFlowRegistrationSchema), updateCashFlowRegistry);
export default cashFlowRouter;
