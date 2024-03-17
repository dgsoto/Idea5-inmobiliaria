import { body } from 'express-validator';

export const CreateMessageValidator = [
  body('email')
    .exists()
    .withMessage("The 'Email' field is required")
    .isEmail()
    .withMessage("The 'Email' field must be a valid email")
    .trim()
    .escape(),

  body('phone')
    .exists()
    .withMessage("The 'Phone' field is required")
    .isString()
    .withMessage("The 'Phone' field must be a valid number")
    .trim()
    .escape(),
  body('subject')
    .exists()
    .withMessage("The 'Subject' field is required")
    .isString()
    .withMessage("The 'Subject' field must be a valid string")
    .trim()
    .isLength({ max: 250 })
    .withMessage('The content exceeds 1000 characters')
    .escape(),
  body('message')
    .exists()
    .withMessage("The 'Message' field is required")
    .isString()
    .withMessage("The 'Message' field must be a valid string")
    .trim()
    .isLength({ max: 1000 })
    .withMessage('The content exceeds 1000 characters')
    .escape(),
];
