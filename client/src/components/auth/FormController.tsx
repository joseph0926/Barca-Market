import { ChangeEvent, FocusEvent } from "react";
import { FormWrapper } from "./FormControllerStyle";

type BaseFormControlProps = {
  id: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleBlur: (e: FocusEvent<HTMLInputElement>) => void;
  validateFn?: (value: string) => boolean;
  isValid: boolean;
  touched: boolean;
  username?: string;
};

const BaseFormControl = ({
  id,
  type,
  name,
  placeholder,
  value,
  handleChange,
  handleBlur,
  validateFn,
  isValid,
  touched,
}: BaseFormControlProps): JSX.Element => {
  const inputClasses =
    touched && isValid ? "form-control" : "form-control invalid";
  return (
    <FormWrapper>
      <label>{name}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={inputClasses}
      />
      {touched && !isValid && (
        <p className="error-text" style={{ color: "red" }}>
          {name === "email"
            ? "이메일 형식이 올바르지 않습니다"
            : name === "password"
            ? "비밀번호는 최소 6자리 이상이어야 합니다."
            : "닉네임을 비울수는 없습니다"}
        </p>
      )}
    </FormWrapper>
  );
};

export default BaseFormControl;
