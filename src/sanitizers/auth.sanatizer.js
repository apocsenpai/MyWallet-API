import { stripHtml } from "string-strip-html";

export const sanitizeSignUp = (bodySignUp) => {
  return {
    ...bodySignUp,
    email: stripHtml(bodySignUp.email).result.trim(),
    name: stripHtml(bodySignUp.name).result.trim(),
  };
};
