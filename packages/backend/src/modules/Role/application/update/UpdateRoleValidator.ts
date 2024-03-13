import { body, param } from 'express-validator';

export const UpdateRoleValidator = [
  param('id').exists().withMessage("The 'id' field is required").isUUID().withMessage("The 'Id' field must be a valid Uuid").trim().escape(),

  body('roleName')
    .exists()
    .withMessage("The 'roleName' field is required")
    .isString()
    .withMessage("The 'roleName' field must be a valid string")
    .trim()
    .escape(),

  body('roleState')
    .exists()
    .withMessage("The 'roleState' field is required")
    .isString()
    .withMessage("The 'roleState' field must be a valid string")
    .trim()
    .escape(),
];
