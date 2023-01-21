import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.js";
import {
  userValidation,
  userVerification,
} from "../middlewares/auth.middleware.js";
import validateSchema from "../middlewares/global.middleware.js";
import { signInSchema, signUpSchema } from "../schemas/AuthSchema.js";

const authRouter = Router();

authRouter.post(
  "/sign-in",
  validateSchema(signInSchema),
  userValidation,
  signIn
);
authRouter.post(
  "/sign-up",
  validateSchema(signUpSchema),
  userVerification,
  signUp
);

export default authRouter;
