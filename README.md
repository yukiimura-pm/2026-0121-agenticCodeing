# React + Vite + TypeScript Bootstrap

このリポジトリは、React 19、Vite 6、TypeScript の厳密なセットアップを提供するボートストラップリポジトリです。

## 要件

- **Node.js** v24
- **React** 19
- **Vite** 6
- **TypeScript** 厳密モード
- **Biome** (Linter/Formatter)
- **Vitest** (Testing)

## セットアップ

### Node.js バージョンの確認

```bash
nvm use
# または
nvm install
```

### 依存関係のインストール

```bash
npm install
```

## NPM Scripts

- `npm run dev` - 開発サーバーを起動
- `npm run build` - 本番用ビルド
- `npm run typecheck` - TypeScript型チェック
- `npm run lint` - Biomeでリント
- `npm run lint:fix` - Biomeで自動修正
- `npm run test` - Vitestでテスト実行
- `npm run test:coverage` - カバレッジ付きでテスト実行
- `npm run preview` - ビルド結果のプレビュー

## プロジェクト構成

```
.
├── src/              # ソースコード
│   ├── main.tsx     # エントリーポイント
│   ├── App.tsx      # メインコンポーネント
│   ├── App.css      # スタイル
│   ├── index.css    # グローバルスタイル
│   └── App.test.tsx # テスト
├── public/          # 静的ファイル
├── index.html       # HTMLテンプレート
├── vite.config.ts   # Vite設定
├── vitest.config.ts # Vitest設定
├── tsconfig.json    # TypeScript設定
├── tsconfig.node.json # Node.js用TypeScript設定
├── biome.json       # Biome設定
├── package.json     # NPM設定
└── .nvmrc           # Node.jsバージョン指定
```

## 設定の詳細

### TypeScript

厳密モードで設定されており、以下のチェックが有効です：
- `strict: true` - 厳密型チェック
- `noUnusedLocals: true` - 未使用ローカル変数のチェック
- `noUnusedParameters: true` - 未使用パラメータのチェック
- `noFallthroughCasesInSwitch: true` - Switch文のフォールスルーチェック

### Biome

JavaScript/TypeScript、JSON、その他のファイル形式のフォーマッティングとリントを提供します。

### Vitest

Vite-native なテストフレームワークで、高速なテスト実行が可能です。jsdom環境で実行されます。

## 開発フロー

1. ファイルを編集すると、自動的にホットモジュールリプレイスメント (HMR) により変更が反映されます
2. `npm run lint:fix` で自動フォーマット
3. `npm run typecheck` で型チェック
4. `npm run test` でテスト実行

## ビルド

```bash
npm run build
```

出力ファイルは `dist/` ディレクトリに生成されます。
