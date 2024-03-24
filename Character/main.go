package character

import ray "github.com/gen2brain/raylib-go/raylib"

import (
	"clash/BaseCharacter"
)

type Character struct {
	basecharacter.BaseCharacter
	windowWidth     int
	windowHeight    int
	weapon          ray.Texture2D
	weaponCollision ray.Rectangle
	health          float32
}

func NewCharacter(winWidth, winHeight int, idle_texture, run_texture ray.Texture2D) *Character {
	return &Character{
		windowWidth:     winWidth,
		windowHeight:    winHeight,
		weapon:          ray.LoadTexture("characters/weapon_sword.png"),
		weaponCollision: ray.NewRectangle(0, 0, 0, 0),
		health:          100.0,
	}
}
