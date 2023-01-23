import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signUpSchema = Joi.object({
  name: Joi.string().max(20).min(2).required(),
  email: Joi.string().email().max(40).min(8).required(),
  password: Joi.string().max(20).min(8).required(),
  confirmedPassword: Joi.string()
    .valid(Joi.ref("password"))
    .max(20)
    .min(8)
    .required(),
});
