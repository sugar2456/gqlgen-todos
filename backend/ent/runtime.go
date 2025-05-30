// Code generated by ent, DO NOT EDIT.

package ent

import (
	"github.com/sugar2456/gqlgen-todos/ent/schema"
	"github.com/sugar2456/gqlgen-todos/ent/todo"
	"github.com/sugar2456/gqlgen-todos/ent/user"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	todoFields := schema.Todo{}.Fields()
	_ = todoFields
	// todoDescText is the schema descriptor for text field.
	todoDescText := todoFields[1].Descriptor()
	// todo.TextValidator is a validator for the "text" field. It is called by the builders before save.
	todo.TextValidator = todoDescText.Validators[0].(func(string) error)
	// todoDescDone is the schema descriptor for done field.
	todoDescDone := todoFields[2].Descriptor()
	// todo.DefaultDone holds the default value on creation for the done field.
	todo.DefaultDone = todoDescDone.Default.(bool)
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescName is the schema descriptor for name field.
	userDescName := userFields[1].Descriptor()
	// user.NameValidator is a validator for the "name" field. It is called by the builders before save.
	user.NameValidator = userDescName.Validators[0].(func(string) error)
}
