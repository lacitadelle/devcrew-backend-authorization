import { z } from 'zod';
import { StatusCodes } from 'http-status-codes'

const defaultSchema = z.object({
  a: z.number(),
  b: z.number()
})

export default function validateData(req, res, next) {
  try {
    defaultSchema.parse(req.body);
    next();
  }
  catch (e) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ error: "Unsupported data format" });
  }
}