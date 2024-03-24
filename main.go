package main

import ray "github.com/gen2brain/raylib-go/raylib"

const (
	windowWidth  = 680
	windowHeight = 680

	gameMapScale = 4.0
)

func main() {
	// Initialization
	ray.InitWindow(windowWidth, windowHeight, "Classy Clash")
	defer ray.CloseWindow()

	ray.SetTargetFPS(60)

	// gameMap := ray.LoadTexture("nature_tileset/OpenWorldMap24x24.png") //map texture
	// gameMapPos := ray.Vector2{X: 0.0, Y: 0.0}                          //map positon i guess

	// Main game loop
	for !ray.WindowShouldClose() {

		ray.BeginDrawing()
		ray.ClearBackground(ray.RayWhite)

		ray.DrawText("Congrats! You created your first window!", windowWidth/4, windowHeight/2, 20, ray.DarkGray)

		ray.EndDrawing()
	}
}
