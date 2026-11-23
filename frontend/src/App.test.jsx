import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { App } from "./App";

describe("App", () => {
  it("renders the exercise library at the root route", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: "CeetLode" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Exercise library" })).toBeTruthy();
  });

  it("renders a progress route", () => {
    render(
      <MemoryRouter initialEntries={["/progress"]}>
        <App />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Progress" })).toBeTruthy();
  });
});
