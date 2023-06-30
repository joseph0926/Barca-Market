import styled from "styled-components";

export const HeroWrapper = styled.div`
  position: relative;
  height: 70vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  .left {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    gap: 10px;
    .content {
      width: 50%;
      padding-left: 1rem;
      h2 {
        margin-bottom: 1rem;
        font-size: 1.6rem;
      }
      p {
        margin-bottom: 1.5rem;
        font-size: 1.05rem;
      }
      .btn {
        display: flex;
        margin-top: 1rem;
        button {
          &:nth-child(2) {
            margin-left: 1rem;
          }
        }
      }
    }
  }
  .right {
    position: absolute;
    left: 60%;
    padding: 0 20px;
  }
`;
