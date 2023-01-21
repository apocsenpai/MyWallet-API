import { Router } from "express";
import { cashEntry, cashOutflow } from "../controllers/cashFlow.controller.js";
import { authValidation } from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/global.middleware.js";
import { cashFlowRegistrationSchema } from "../schemas/CashFlowSchema.js";

const cashFlowRouter = Router();

cashFlowRouter.use(authValidation);
cashFlowRouter.post(
  "/new-entry",
  validateSchema(cashFlowRegistrationSchema),
  cashEntry
);
cashFlowRouter.post(
    "/new-outflow",
    validateSchema(cashFlowRegistrationSchema),
    cashOutflow
  );
export default cashFlowRouter;
