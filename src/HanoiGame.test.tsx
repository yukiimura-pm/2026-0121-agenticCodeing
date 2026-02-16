import { describe, it, expect } from "vitest";
import { solveTowerOfHanoi, isValidMove, isGameWon } from "./utils/hanoiSolver";

describe("ハノイの塔", () => {
  describe("解法アルゴリズム", () => {
    it("3枚の円盤の解法は7ステップ", () => {
      const steps = solveTowerOfHanoi(3);
      expect(steps).toHaveLength(7);
    });

    it("最初のステップはA->C", () => {
      const steps = solveTowerOfHanoi(3);
      expect(steps[0]).toEqual({ from: "A", to: "C" });
    });

    it("最後のステップはA->C", () => {
      const steps = solveTowerOfHanoi(3);
      expect(steps[6]).toEqual({ from: "A", to: "C" });
    });

    it("1枚の円盤の解法は1ステップ", () => {
      const steps = solveTowerOfHanoi(1);
      expect(steps).toHaveLength(1);
    });

    it("2枚の円盤の解法は3ステップ", () => {
      const steps = solveTowerOfHanoi(2);
      expect(steps).toHaveLength(3);
    });
  });

  describe("移動の検証", () => {
    it("移動先が空の場合は有効", () => {
      expect(isValidMove(1, null)).toBe(true);
      expect(isValidMove(2, null)).toBe(true);
      expect(isValidMove(3, null)).toBe(true);
    });

    it("小さい円盤を大きい円盤の上に置くことは有効", () => {
      expect(isValidMove(1, 2)).toBe(true);
      expect(isValidMove(1, 3)).toBe(true);
      expect(isValidMove(2, 3)).toBe(true);
    });

    it("大きい円盤を小さい円盤の上に置くことは無効", () => {
      expect(isValidMove(2, 1)).toBe(false);
      expect(isValidMove(3, 1)).toBe(false);
      expect(isValidMove(3, 2)).toBe(false);
    });
  });

  describe("勝利判定", () => {
    it("杭Cに3枚すべての円盤がある場合は勝利", () => {
      expect(isGameWon(3, 3)).toBe(true);
    });

    it("杭Cに1枚の円盤がある場合は勝利でない", () => {
      expect(isGameWon(1, 3)).toBe(false);
    });

    it("杭Cが空の場合は勝利でない", () => {
      expect(isGameWon(0, 3)).toBe(false);
    });
  });
});
