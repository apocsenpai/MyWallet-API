import Joi from "joi";

export const cashFlowRegistrationSchema = Joi.object({
  amount: Joi.number().required(),
  description: Joi.string().required(),
  isEntry: Joi.boolean().required(),
});
