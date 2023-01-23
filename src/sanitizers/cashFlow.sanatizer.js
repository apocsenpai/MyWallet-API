import { stripHtml } from "string-strip-html";

export const sanitizeCashFlowRegistry = (bodyCashFlow) => {
  return {
    ...bodyCashFlow,
    amount: stripHtml(bodyCashFlow.amount).result.trim(),
    description: stripHtml(bodyCashFlow.description).result.trim(),
  };
};
