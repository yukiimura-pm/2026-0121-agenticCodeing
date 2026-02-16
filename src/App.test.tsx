import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("App", () => {
  it("ハノイの塔ゲームをレンダリング", () => {
    render(<App />);
    expect(screen.getByText("ハノイの塔")).toBeDefined();
  });
});
