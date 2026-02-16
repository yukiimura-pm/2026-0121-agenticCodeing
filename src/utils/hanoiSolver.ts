import type { MoveStep } from "../types";

/**
 * ハノイの塔の解法アルゴリズム
 * @param n 円盤の枚数
 * @param from 元の杭
 * @param to 目標の杭
 * @param aux 補助杭
 * @param steps 手順リスト（再帰時に使用）
 * @returns 移動手順の配列
 */
export function solveTowerOfHanoi(
  n: number = 3,
  from: string = "A",
  to: string = "C",
  aux: string = "B",
  steps: MoveStep[] = []
): MoveStep[] {
  if (n === 1) {
    steps.push({ from, to });
    return steps;
  }

  // n-1個の円盤を補助杭に移動
  solveTowerOfHanoi(n - 1, from, aux, to, steps);

  // 最大の円盤を目標杭に移動
  steps.push({ from, to });

  // n-1個の円盤を補助杭から目標杭に移動
  solveTowerOfHanoi(n - 1, aux, to, from, steps);

  return steps;
}

/**
 * 円盤が有効に移動できるか検証
 * @param fromDisk 移動する円盤
 * @param toDisk 移動先の最上部円盤
 * @returns 有効な移動ならtrue
 */
export function isValidMove(
  fromDisk: number,
  toDisk: number | null
): boolean {
  // 移動先が空の場合は常に有効
  if (toDisk === null) {
    return true;
  }
  // 移動する円盤が移動先の最上部より小さい場合のみ有効
  return fromDisk < toDisk;
}

/**
 * ゲームが完了したか判定
 * @param disksInRod3 杭Cの円盤リスト
 * @param totalDisks 総円盤数
 * @returns 完了ならtrue
 */
export function isGameWon(
  disksInRod3Length: number,
  totalDisks: number
): boolean {
  return disksInRod3Length === totalDisks;
}
