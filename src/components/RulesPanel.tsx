interface RulesPanelProps {
  onReset: () => void;
  onShowSolution: () => void;
  moveCount: number;
}

export function RulesPanel({
  onReset,
  onShowSolution,
  moveCount,
}: RulesPanelProps) {
  return (
    <div className="rules-panel">
      <div className="rules-content">
        <h2>ハノイの塔のルール</h2>
        <ul>
          <li>🔴 大きい円盤の上に、小さい円盤だけが置ける</li>
          <li>🔵 毎回、1枚ずつ円盤を移動する</li>
          <li>
            🟡 3本の杭を使って、左の杭にある円盤をすべて右の杭に移動する
          </li>
        </ul>
      </div>

      <div className="stats">
        <div className="move-count">
          <span>移動回数：</span>
          <span className="count-number">{moveCount}</span>
        </div>
      </div>

      <div className="button-group">
        <button
          type="button"
          className="btn btn-primary"
          onClick={onShowSolution}
        >
          ✨ 解答を教えて！
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onReset}
        >
          🔄 もう一度挑戦する
        </button>
      </div>
    </div>
  );
}
