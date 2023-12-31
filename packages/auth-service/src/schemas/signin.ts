import joi, { ObjectSchema } from 'joi';

const signinSchema: ObjectSchema = joi.object().keys({
  username: joi.alternatives().conditional(joi.string().email(), {
    then: joi.string().email().required().messages({
      'string.base': 'Email mush be of type string',
      'string.email': '유효하지 않은 Email 형식입니다.',
      'string.empty': 'Email은 필수 입력 필드입니다.',
    }),
    otherwise: joi.string().min(4).max(16).required().messages({
      'string.base': 'Username mush be of type string',
      'string.min': 'Username은 최소 4글자입니다.',
      'string.max': 'Username은 최대 16글자입니다.',
      'string.empty': 'Username은 필수 입력 필드입니다.',
    }),
  }),
  password: joi.string().required().min(4).max(12).messages({
    'string.base': 'Password mush be of type string',
    'string.min': 'Password은 최소 4글자입니다.',
    'string.max': 'Password은 최대 12글자입니다.',
    'string.empty': 'Password은 필수 입력 필드입니다.',
  }),
});

export { signinSchema };
