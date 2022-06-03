import Joi from "joi";

export const usernameSchema = Joi.string()
  .pattern(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)
  .lowercase();

export const authSchema = Joi.object({
  username: usernameSchema,
});
