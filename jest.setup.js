import "@testing-library/jest-dom/extend-expect";
import { setConfig } from "next/config";
import { server } from "./src/__test__/__mocks__/server.js";

// Make sure Next.js environment variables are available in tests
setConfig({
  publicRuntimeConfig: {
    // Your public runtime configs
  },
  serverRuntimeConfig: {
    // Your server runtime configs
  },
});

// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => server.close());
