package basecharacter

import ray "github.com/gen2brain/raylib-go/raylib"

type BaseCharacter struct {
	alive             bool
	texture           ray.Texture2D
	idle              ray.Texture2D
	run               ray.Texture2D
	worldPos          ray.Vector2
	worldPosLastFrame ray.Vector2
	rightLeft         float32
	runningTime       float32
	frame             int
	maxFrames         int
	updateTime        float32
	speed             float32
	width             float32
	height            float32
	scale             float32
	velocity          ray.Vector2
}

func NewBaseCharacter() *BaseCharacter {
	return &BaseCharacter{
		rightLeft:  1,
		maxFrames:  6,
		updateTime: 1 / 12,
		speed:      4.0,
		scale:      4.0,
		alive:      true,
	}
}

func (c BaseCharacter) GetAlive() bool {
	return c.alive
}

func (c *BaseCharacter) SetAlive(isAlive bool) {
	c.alive = isAlive
}

func (c BaseCharacter) GetWorldPos() ray.Vector2 {
	return c.worldPos
}

func (c *BaseCharacter) UndoMovement() {}

// func (c *BaseCharacter) GetCollisionRec() ray.Rectangle {
// }

type Character interface { // interface for characters
	Tick()
	GetScreenPos() ray.Vector2
}

func (c BaseCharacter) Tick(deltaTime float32) {}

func (c BaseCharacter) GetScreenPos() ray.Vector2 {
	return c.worldPos
}
