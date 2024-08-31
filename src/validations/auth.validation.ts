import Joi from 'joi';

export const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  role: Joi.string().valid('MERCHANT', 'CUSTOMER', 'ADMIN').optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
;


export const updateCustomerSchema = Joi.object({
  address: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  firstName: Joi.string().min(2).optional(),
  lastName: Joi.string().min(2).optional(),
  bio: Joi.string().optional(),
  dob: Joi.string().isoDate().optional(), 
});


export const createMerchantSchema = Joi.object({
  bio: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  businessAddress: Joi.string().required(),
  businessCred: Joi.string().required(),
  approved: Joi.boolean().optional(),
});

export const updateMerchantSchema = Joi.object({
  bio: Joi.string().optional(),
  image: Joi.string().uri().optional(),
  country: Joi.string().optional(),
  address: Joi.string().optional(),
  businessAddress: Joi.string().optional(),
  businessCred: Joi.string().optional(),
  approved: Joi.boolean().optional(),
});



export const createCustomerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email address.',
    'any.required': 'Email is required.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long.',
    'any.required': 'Password is required.',
  }),
  username: Joi.string().alphanum().min(3).max(30).required().messages({
    'string.alphanum': 'Username must contain only alphanumeric characters.',
    'string.min': 'Username must be at least 3 characters long.',
    'string.max': 'Username cannot be longer than 30 characters.',
    'any.required': 'Username is required.',
  }),
  address: Joi.string().required().messages({
    'any.required': 'Address is required.',
  }),
  firstName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'First name must be at least 2 characters long.',
    'string.max': 'First name cannot be longer than 50 characters.',
    'any.required': 'First name is required.',
  }),
  lastName: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Last name must be at least 2 characters long.',
    'string.max': 'Last name cannot be longer than 50 characters.',
    'any.required': 'Last name is required.',
  }),
  bio: Joi.string().max(500).optional().messages({
    'string.max': 'Bio cannot be longer than 500 characters.',
  }),
  dob: Joi.date().optional().messages({
    'date.base': 'Date of Birth must be a valid date.',
  }),
  image: Joi.string().uri().optional().messages({
    'string.uri': 'Image must be a valid URL.',
  }),
});



export const registerMerchantSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string().required(),
  bio: Joi.string().optional(),
  image: Joi.any().optional(),
  video: Joi.any().optional(),
  country: Joi.string().required(),
  address: Joi.string().required(),
  businessAddress: Joi.string().required(),
  businessCred: Joi.string().required(),
});
