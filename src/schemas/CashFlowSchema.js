import Joi from "joi";

export const cashFlowRegistrationSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().min(5).max(18).required(),
  isEntry: Joi.boolean().required(),
});
