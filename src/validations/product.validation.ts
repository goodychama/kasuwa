import Joi from 'joi';
import { DiscountType } from '@prisma/client';

export const createProductSchema = Joi.object({
  categoryId: Joi.string().required(),
  brandId: Joi.string().required(),
  quantity: Joi.number().integer().required(),
  unit: Joi.number().integer().required(),
  image: Joi.array().items(Joi.string().uri()).optional(),
  discountValue: Joi.number().optional(),
  discountType: Joi.string().valid(DiscountType.PERCENTAGE, DiscountType.FLAT).optional(),
  stock: Joi.number().integer().optional(),
  color: Joi.string().optional(),
  price: Joi.number().required(),
  name: Joi.string().required(),
  location: Joi.string().optional(),
  description: Joi.string().optional(),
  tags: Joi.number().optional(),
});