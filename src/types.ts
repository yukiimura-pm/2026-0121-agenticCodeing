/**
 * ハノイの塔のゲーム状態の型定義
 */

export interface Disk {
  id: number;
  size: number; // 1(小) ~ 3(大)
  color: string;
}

export interface Rod {
  id: string; // 'A', 'B', 'C'
  disks: Disk[];
}

export interface GameState {
  rods: Record<string, Rod>; // { 'A': Rod, 'B': Rod, 'C': Rod }
  moves: number;
  isWon: boolean;
  solutionSteps?: Array<{ from: string; to: string }>;
  showingSolution: boolean;
  solutionIndex: number;
}

export interface MoveStep {
  from: string;
  to: string;
}
