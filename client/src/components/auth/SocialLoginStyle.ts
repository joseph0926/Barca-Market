import styled from "styled-components";

export const SocialWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin: 0.5rem 0;
  .google {
    display: flex;
    align-items: center;
    border: 2px solid ${(props) => props.theme.borderColor.lightPriColor};
    &:hover {
      border-color: ${(props) => props.theme.borderColor.lightPriColor};
    }
  }
  .github {
    display: flex;
    align-items: center;
    border: 2px solid ${(props) => props.theme.borderColor.darkPriColor};
    &:hover {
      border-color: ${(props) => props.theme.borderColor.darkPriColor};
    }
  }
  .icon {
    margin-left: 0.5rem;
  }
`;
