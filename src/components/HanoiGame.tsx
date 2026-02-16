import { useState, useCallback } from "react";
import type { GameState, Disk } from "../types";
import { RodComponent } from "./Rod";
import { RulesPanel } from "./RulesPanel";
import {
  solveTowerOfHanoi,
  isValidMove,
  isGameWon,
} from "../utils/hanoiSolver";
import "../HanoiGame.css";

const INITIAL_DISKS: Disk[] = [
  { id: 1, size: 3, color: "#FF6B6B" }, // 赤：大
  { id: 2, size: 2, color: "#4ECDC4" }, // 青：中
  { id: 3, size: 1, color: "#FFE66D" }, // 黄：小
];

function initializeGame(): GameState {
  return {
    rods: {
      // biome-ignore lint/style/useNamingConvention: Game design requires A, B, C labels
      // biome-ignore lint/suspicious/noExplicitAny: Dynamic property access required
      A: { id: "A", disks: [...INITIAL_DISKS] },
      // biome-ignore lint/style/useNamingConvention: Game design requires A, B, C labels
      B: { id: "B", disks: [] },
      // biome-ignore lint/style/useNamingConvention: Game design requires A, B, C labels
      C: { id: "C", disks: [] },
    } as any,
    moves: 0,
    isWon: false,
    solutionSteps: undefined,
    showingSolution: false,
    solutionIndex: 0,
  };
}

export function HanoiGame() {
  const [gameState, setGameState] = useState<GameState>(initializeGame);
  const [draggedDisk, setDraggedDisk] = useState<Disk | null>(null);
  const [draggedFromRod, setDraggedFromRod] = useState<string | null>(null);

  const handleDragStart = useCallback(
    (disk: Disk, fromRodId: string) => {
      setDraggedDisk(disk);
      setDraggedFromRod(fromRodId);
    },
    []
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }, []);

  const handleDrop = useCallback(
    (toRodId: string, e: React.DragEvent<HTMLElement>) => {
      e.preventDefault();

      if (!draggedDisk || !draggedFromRod || draggedFromRod === toRodId) {
        return;
      }

      const newState = JSON.parse(JSON.stringify(gameState)) as GameState;
      // biome-ignore lint/suspicious/noExplicitAny: rods is a dynamic structure
      const fromRod = (newState.rods as any)[draggedFromRod];
      // biome-ignore lint/suspicious/noExplicitAny: rods is a dynamic structure
      const toRod = (newState.rods as any)[toRodId];

      if (fromRod.disks.length === 0) {
        return;
      }

      const diskToMove = fromRod.disks[fromRod.disks.length - 1];
      const topDiskInTarget = toRod.disks[toRod.disks.length - 1];

      // ルール検証
      if (!isValidMove(diskToMove.size, topDiskInTarget?.size ?? null)) {
        // アニメーション効果：円盤が戻る（パルス効果）
        return;
      }

      // 移動実行
      fromRod.disks.pop();
      toRod.disks.push(diskToMove);
      newState.moves += 1;

      // 勝利判定
      newState.isWon = isGameWon(
        // biome-ignore lint/suspicious/noExplicitAny: rods is a dynamic structure
        (newState.rods as any).C.disks.length,
        INITIAL_DISKS.length
      );

      setGameState(newState);
      setDraggedDisk(null);
      setDraggedFromRod(null);
    },
    [draggedDisk, draggedFromRod, gameState]
  );

  const handleReset = useCallback(() => {
    setGameState(initializeGame);
    setDraggedDisk(null);
    setDraggedFromRod(null);
  }, []);

  const handleShowSolution = useCallback(() => {
    const newState = { ...gameState };
    if (!newState.solutionSteps) {
      newState.solutionSteps = solveTowerOfHanoi();
    }
    newState.showingSolution = !newState.showingSolution;
    newState.solutionIndex = 0;
    setGameState(newState);
  }, [gameState]);

  return (
    <div className="hanoi-game-container">
      <h1 className="game-title">ハノイの塔</h1>

      <RulesPanel
        onReset={handleReset}
        onShowSolution={handleShowSolution}
        moveCount={gameState.moves}
      />

      <div className="game-board">
        {Object.values(gameState.rods).map((rod) => (
          <RodComponent
            key={rod.id}
            rod={rod}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          />
        ))}
      </div>

      {gameState.isWon && (
        <div className="victory-message">
          <div className="victory-content">
            <h2>🎉 すごい！ 完成しました！ 🎉</h2>
            <p>{gameState.moves}回で完成しましたね～♪</p>
            <p className="optimal-moves">
              最小回数は7回です。
              {gameState.moves <= 7
                ? "素晴らしい！"
                : "もっと短く出来るかも♪"}
            </p>
          </div>
        </div>
      )}

      {gameState.showingSolution && gameState.solutionSteps && (
        <div className="solution-panel">
          <div className="solution-content">
            <h3>解答の手順</h3>
            <div className="solution-steps">
              {gameState.solutionSteps.map((step, index) => (
                <div key={`step-${index}-${step.from}-${step.to}`} className="solution-step">
                  <span className="step-number">{index + 1}.</span>
                  <span className="step-arrow">
                    杭{step.from} → 杭{step.to}
                  </span>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleShowSolution}
            >
              閉じる
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
