import { body } from 'express-validator';

export const loginValidator = [
  body('email').exists().withMessage("The 'Email' field is required").trim().escape(),

  body('password').exists().withMessage("The 'Password' field is required").trim().escape(),
];
