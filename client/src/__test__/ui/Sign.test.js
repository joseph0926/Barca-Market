import { act, screen } from "@testing-library/react";
import { render } from "../../../jest.setup.js";
import "@testing-library/jest-dom";
import Sign from "@/src/pages/sign/index";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    darkPriText: "#1A202C",
    lightPriText: "#718096",
  },
});

test("renders Sign Form", () => {
  jest.useFakeTimers(); // 타이머

  render(
    <ChakraProvider theme={theme}>
      <Sign />
    </ChakraProvider>
  );

  // 애니메이션 테스트
  act(() => {
    jest.advanceTimersByTime(1500); // 1.5초 동안 진행된 애니메이션 대기
  });

  expect(screen.getByRole("form")).toBeInTheDocument();
});
