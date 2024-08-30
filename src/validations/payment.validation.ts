import Joi from 'joi';

export const createPaymentSchema = Joi.object({
    amount: Joi.number().required(),
    status: Joi.string().valid('PENDING', 'COMPLETED', 'FAILED').required(),
    transactionId: Joi.string().required(),
    paymentMethod: Joi.string().required(),
});