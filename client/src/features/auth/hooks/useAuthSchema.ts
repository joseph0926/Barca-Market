import { useState } from 'react';
import { validationErrorsType } from '@/shared/interfaces/shared.interface';

import { IUseAuthSchema } from '@/features/auth/interfaces/auth.interface';

const useAuthSchema = ({ schema, userInfo }: IUseAuthSchema): [() => Promise<boolean>, validationErrorsType[]] => {
  const [validationErrors, setValidationErrors] = useState<validationErrorsType[]>([]);

  async function schemaValidation(): Promise<boolean> {
    await schema
      .validate(userInfo, { abortEarly: false })
      .then(() => setValidationErrors([]))
      .catch((err: any) => {
        setValidationErrors([...err.errors]);
      });
    const validation: boolean = await schema.isValid(userInfo, { abortEarly: false });
    return validation;
  }
  return [schemaValidation, validationErrors];
};

export { useAuthSchema };
