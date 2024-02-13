import { body } from 'express-validator';

export const CreateUserValidator = [
  body('id').exists().withMessage("The 'id' field is required").isUUID().withMessage("The 'Id' field must be a valid Uuid").trim().escape(),

  body('firstname')
    .exists()
    .withMessage("The 'Firstname' field is required")
    .isString()
    .withMessage("The 'Firstname' field must be a valid string")
    .trim()
    .escape(),

  body('lastname')
    .exists()
    .withMessage("The 'Lastname' field is required")
    .isString()
    .withMessage("The 'Lastname' field must be a valid string")
    .trim()
    .escape(),

  body('email')
    .exists()
    .withMessage("The 'Email' field is required")
    .isString()
    .withMessage("The 'Email' field must be a valid string")
    .trim()
    .escape(),

  body('password')
    .exists()
    .withMessage("The 'password' field is required")
    .isString()
    .withMessage("The 'password' field must be a valid string")
    .trim()
    .escape(),

  body('phone')
    .exists()
    .withMessage("The 'Phone' field is required")
    .isString()
    .withMessage("The 'Phone' field must be a valid number")
    .trim()
    .escape(),
];
