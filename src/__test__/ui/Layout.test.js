import { screen } from "@testing-library/react";
import { render } from "../../../jest.setup.js";
import "@testing-library/jest-dom";
import Layout from "@/src/components/layouts/Layout";

test("renders Navbar and children", () => {
  render(
    <Layout>
      <div>Test children</div>
    </Layout>
  );

  expect(screen.getByRole("navigation")).toBeInTheDocument();

  expect(screen.getByText("Test children")).toBeInTheDocument();
});
