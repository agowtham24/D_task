import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export class UserValidator {
  static async createUser(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(3).max(25).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(15).required(),
      });
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error)
        return res
          .status(400)
          .json(error.details.map((detail) => detail.message));
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object({
        name: Joi.string().min(3).max(25).optional(),
        email: Joi.string().email().optional(),
      });
      const { error } = schema.validate(req.body, { abortEarly: false });
      if (error)
        return res
          .status(400)
          .json(error.details.map((detail) => detail.message));
      next();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}
