import joi, { ObjectSchema } from 'joi';

const emailSchema: ObjectSchema = joi.object().keys({
  email: joi.string().email().required().messages({
    'string.base': 'Email mush be of type string',
    'string.email': '유효하지 않은 Email 형식입니다.',
    'string.empty': 'Email은 필수 입력 필드입니다.',
  }),
});

const passwordSchema: ObjectSchema = joi.object().keys({
  password: joi.string().required().min(4).max(12).messages({
    'string.base': 'Password mush be of type string',
    'string.min': 'Password은 최소 4글자입니다.',
    'string.max': 'Password은 최대 12글자입니다.',
    'string.empty': 'Password은 필수 입력 필드입니다.',
  }),
  confirmPassword: joi.string().required().valid(joi.ref('password')).messages({
    'any.only': 'Password가 일치하지 않습니다.',
    'any.required': 'Confirm password는 필수 입력 필드입니다.',
  }),
});

const changePasswordSchema: ObjectSchema = joi.object().keys({
  currentPassword: joi.string().required().min(4).max(12).messages({
    'string.base': 'Password mush be of type string',
    'string.min': 'Password은 최소 4글자입니다.',
    'string.max': 'Password은 최대 12글자입니다.',
    'string.empty': 'Password은 필수 입력 필드입니다.',
  }),
  newPassword: joi.string().required().valid(joi.ref('password')).messages({
    'any.only': 'Passwords should match',
    'any.required': 'New password는 필수 입력 필드입니다.',
  }),
});

export { emailSchema, passwordSchema, changePasswordSchema };
