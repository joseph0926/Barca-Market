import styled from "styled-components";

export const ForumLayoutWrapper = styled.div`
  max-width: 100vw;
  min-height: 100vh;
  display: flex;
  .left {
    flex: 1;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    background: red;
  }
  .main {
    flex: 2;
    width: 100%;
    margin: 0;
  }
  .right {
    flex: 1;
    width: 100%;
    position: sticky;
    top: 0;
    right: 0;
  }
`;
