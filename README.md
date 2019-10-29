## 開発環境設定

`git init`
`npm init -y`

### Typescript

参考：　https://qiita.com/notakaos/items/3bbd2293e2ff286d9f49

typescript パッケージの追加
`npm install -D typescript @types/node`

tsconfig.json 生成
`npx tsc --init`

tsconfig.json 修正

```
{
  "compilerOptions": {
-   "target": "es5",
+   "target": "ES2019",
    "module": "commonjs",
+   "sourceMap": true,
+   "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
- }
+ },
+ "include": [
+   "src/**/*"
+ ],
}
```

index.ts 作成
`mkdir src && touch src/index.ts`

index.ts ファイルにサンプルファンクションを記述

```
function hello(name: string): string {
  return `Hello, ${name}!`;
}

console.log(hello("World"));
```
