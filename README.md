# GO練習用リポジトリ

## 実行

```
go run cmd/main.go
```

## ビルドと実行

```
go build -o hello_app cmd/main.go
./hello_app
```

## テストコードの実行

```
go test ./...
```

## スキーマ更新後のコード生成コマンド

```
go generate ./ent
```