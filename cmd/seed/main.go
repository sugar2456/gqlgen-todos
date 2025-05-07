package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"os"
	"time"

	_ "github.com/go-sql-driver/mysql"
	"github.com/google/uuid"

	"github.com/sugar2456/gqlgen-todos/ent"
)

func main() {
	// データベース接続情報を環境変数から取得
	dbHost := getEnv("DB_HOST", "db")
	dbPort := getEnv("DB_PORT", "3306")
	dbUser := getEnv("DB_USER", "gouser")
	dbPass := getEnv("DB_PASSWORD", "gopassword")
	dbName := getEnv("DB_NAME", "godb")

	// MySQLのDSN（Data Source Name）を作成
	dsn := fmt.Sprintf("%s:%s@tcp(%s:%s)/%s?parseTime=True",
		dbUser, dbPass, dbHost, dbPort, dbName)

	// entクライアントの初期化
	client, err := ent.Open("mysql", dsn)
	if err != nil {
		log.Fatalf("failed opening connection to mysql: %v", err)
	}
	defer client.Close()

	ctx := context.Background()

	// シードデータを生成
	if err := generateSeedData(ctx, client); err != nil {
		log.Fatalf("failed generating seed data: %v", err)
	}

	fmt.Println("Successfully generated seed data for N+1 problem demonstration")
}

// getEnv は環境変数の値を取得し、設定されていない場合はデフォルト値を返す
func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

func generateSeedData(ctx context.Context, client *ent.Client) error {
	// より新しいGo言語バージョンに合わせてrand.Seedを更新
	rand.New(rand.NewSource(time.Now().UnixNano()))

	// 大量のユーザーを作成 (N+1問題を明確に体感するため)
	userCount := 100
	todoPerUserMin := 10
	todoPerUserMax := 30

	// ユーザー名のプレフィックス
	userNamePrefixes := []string{
		"山田", "佐藤", "鈴木", "田中", "高橋",
		"伊藤", "渡辺", "小林", "加藤", "吉田",
	}

	// タスク内容のプレフィックス
	todoTextPrefixes := []string{
		"買い物: ", "勉強: ", "仕事: ", "連絡: ", "予約: ",
		"確認: ", "支払い: ", "計画: ", "整理: ", "準備: ",
	}

	// タスク内容のサフィックス
	todoTextSuffixes := []string{
		"資料作成", "メール返信", "会議設定", "発表準備", "レポート作成",
		"予算確認", "スケジュール調整", "プロジェクト管理", "顧客対応", "データ分析",
		"コード修正", "テスト実行", "設計変更", "ドキュメント作成", "リリース準備",
	}

	fmt.Println("Starting to create users and todos for N+1 demonstration...")
	fmt.Printf("Planning to create %d users with %d-%d todos each\n", userCount, todoPerUserMin, todoPerUserMax)

	// バルク操作用の配列
	users := make([]*ent.User, 0, userCount)

	// ユーザーを一括作成
	fmt.Println("Creating users...")
	for i := 0; i < userCount; i++ {
		userID := uuid.New().String()
		namePrefix := userNamePrefixes[rand.Intn(len(userNamePrefixes))]
		userName := fmt.Sprintf("%s%d", namePrefix, i+1)

		users = append(users, client.User.Create().
			SetID(userID).
			SetName(userName).
			SaveX(ctx))

		// 処理状況を表示
		if (i+1)%10 == 0 {
			fmt.Printf("Created %d users...\n", i+1)
		}
	}

	fmt.Printf("Created %d users\n", len(users))

	// 各ユーザーに複数のTodoを作成
	fmt.Println("Creating todos for each user...")
	todoTotal := 0
	for idx, u := range users {
		// このユーザーが持つTodoの数をランダムに決定
		todoCount := todoPerUserMin + rand.Intn(todoPerUserMax-todoPerUserMin+1)

		for j := 0; j < todoCount; j++ {
			prefixIdx := rand.Intn(len(todoTextPrefixes))
			suffixIdx := rand.Intn(len(todoTextSuffixes))
			todoText := todoTextPrefixes[prefixIdx] + todoTextSuffixes[suffixIdx]

			// ランダムに完了状態を設定
			isDone := rand.Intn(2) == 1

			// Todoを作成
			client.Todo.Create().
				SetID(uuid.New().String()).
				SetText(todoText).
				SetDone(isDone).
				SetUser(u).
				SaveX(ctx)

			todoTotal++
		}

		// 処理状況を表示
		if (idx+1)%10 == 0 {
			fmt.Printf("Created todos for %d users...\n", idx+1)
		}
	}

	// 作成されたTodoの総数を確認
	count, err := client.Todo.Query().Count(ctx)
	if err != nil {
		return fmt.Errorf("failed to count todos: %w", err)
	}

	fmt.Printf("Successfully created %d todos for %d users\n", count, len(users))
	fmt.Println("Average todos per user:", float64(count)/float64(len(users)))
	return nil
}
