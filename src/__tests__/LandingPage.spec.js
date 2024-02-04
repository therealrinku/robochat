import { render, screen } from "@testing-library/react";
import Login from "../pages/login";

test("Renders the login button", () => {
  render(<Login />);

  expect(screen.getByText("Login with Google")).toBeInTheDocument();
});