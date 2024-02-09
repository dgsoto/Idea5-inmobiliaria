import { body } from 'express-validator';

export const CreateUserValidator = [
  body('id').exists().withMessage("The 'id' field is required").isUUID().withMessage("The 'id' field must be a valid 'Uuid'").trim().escape(),

  body('firstname')
    .exists()
    .withMessage("The 'firstname' field is required")

    .isString()
    .withMessage("The 'firstname' field must be a valid string")
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage("The 'firstname' field must be between 2 and 50 characters"),

  body('lastname')
    .exists()
    .withMessage("The 'lastname' field is required")

    .isString()
    .withMessage("The 'lastname' field must be a valid string")
    .trim()
    .escape()
    .isLength({ min: 2, max: 50 })
    .withMessage("The 'lastname' field must be between 2 and 50 characters"),

  body('email')
    .exists()
    .withMessage("The 'email' field is required")

    .isString()
    .withMessage("The 'email' field must be a valid string")
    .trim()
    .escape()
    .isEmail()
    .withMessage("The 'email' field must be valid"),

  body('password')
    .exists()
    .withMessage("The 'password' field is required")

    .isString()
    .withMessage("The 'password' field must be a valid string")
    .trim()
    .escape()
    .isLength({ min: 8, max: 100 })
    .withMessage("The 'password' field must be between 8 and 100 characters"),
];
