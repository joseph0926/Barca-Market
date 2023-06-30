import styled from "styled-components";

export const FormWrapper = styled.form`
  label {
    font-size: 1.15rem;
  }
  input {
    margin: 0.5rem 0;
    width: 100%;
    height: 2rem;
    border: none;
    outline: none;
    background: transparent;
    border-bottom: 2px solid red;
    &::placeholder {
      color: rgba(0, 0, 0, 0.5);
    }
    font-size: 1.05rem;
  }
  .invalid {
    border-color: red;
  }
  p {
    color: red;
  }
`;
