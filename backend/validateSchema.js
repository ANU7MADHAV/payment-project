const { z } = require("zod");

const userSchema = z.object({
  firstName: z.string().min(3),
  lastName: z.string(),
  username: z.string().email(),
  password: z.string().min(6),
});

const updateBody = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  password: z.string().optional(),
});
module.exports = {
  userSchema,
  updateBody,
};
