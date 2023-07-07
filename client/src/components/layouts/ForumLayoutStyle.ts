import styled from "styled-components";

export const ForumLayoutWrapper = styled.div`
  max-width: 100vw;
  height: 100vh;
  display: flex;
  .left {
    flex: 1;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
  }
  .main {
    flex: 3;
    width: 100%;
    height: 100%;
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
