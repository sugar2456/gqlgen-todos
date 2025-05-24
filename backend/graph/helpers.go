package graph

import (
	"github.com/sugar2456/gqlgen-todos/ent"
	"github.com/sugar2456/gqlgen-todos/graph/model"
)

// entTodoToGraphQL はEntのTodoエンティティをGraphQLのTodoモデルに変換します
func entTodoToGraphQL(t *ent.Todo, u *ent.User) *model.Todo {
	return &model.Todo{
		ID:   t.ID,
		Text: t.Text,
		Done: t.Done,
		User: &model.User{
			ID:   u.ID,
			Name: u.Name,
		},
	}
}

func entUserToGraphQL(u *ent.User) *model.User {
	return &model.User{
		ID:   u.ID,
		Name: u.Name,
	}
}
