import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const resultsValidation = async (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);

    return res.status(400).json({
      ok: false,
      status: 400,
      msg: errorMessages,
    });
  }

  next();
};

export const SigninValidator = [
  body('email').exists().withMessage('Email is required').trim(),
  body('password').exists().withMessage('Password is required').trim(),
  resultsValidation,
];
