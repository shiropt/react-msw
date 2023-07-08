export type Todo = {
  id: number;
  title: string;
  isDone: boolean;
};
export const todos: Todo[] = [
  { id: 1, title: "プロジェクト提案の作成", isDone: false },
  { id: 2, title: "フィードバックの確認と修正", isDone: true },
  { id: 3, title: "クライアントミーティングの準備", isDone: false },
  { id: 4, title: "最新の技術トレンドの調査", isDone: true },
  { id: 5, title: "バックエンドのユニットテストの作成", isDone: false },
  { id: 6, title: "レスポンシブ対応のためのCSSスタイルのリファクタリング", isDone: false },
  { id: 7, title: "新機能のワイヤフレーム作成", isDone: true },
  { id: 8, title: "継続的インテグレーションとデプロイの設定", isDone: false },
  { id: 9, title: "プレゼンテーション用スライドの準備", isDone: true },
  { id: 10, title: "ユーザー認証プロセスのバグ修正", isDone: false },
];
