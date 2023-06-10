import { setupServer } from "msw/node";
import { handlers } from "./handers.js";

export const server = setupServer(...handlers);
