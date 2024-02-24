import { body } from 'express-validator';

export const LoginValidator = [
  body('email').exists().withMessage("The 'Email' field is required").trim().escape(),

  body('password').exists().withMessage("The 'password' field is required").trim().escape(),
];
