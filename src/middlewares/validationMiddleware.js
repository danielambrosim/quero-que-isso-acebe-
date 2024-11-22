// middlewares/validationMiddleware.js
const { body, validationResult } = require('express-validator');

const validateWallet = [
    body('name').isString().notEmpty().withMessage('Name is required'),
    body('balance').isNumeric().withMessage('Balance must be a number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = validateWallet;