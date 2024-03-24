package main

import ray "github.com/gen2brain/raylib-go/raylib"

func main() {
	// Initialization
	ray.InitWindow(800, 450, "raylib [shapes] example - basic shapes drawing")
	defer ray.CloseWindow()

	ray.SetTargetFPS(60)

	// Main game loop
	for !ray.WindowShouldClose() {
		ray.BeginDrawing()

		ray.ClearBackground(ray.RayWhite)
		ray.DrawText("Congrats! You created your first window!", 190, 200, 20, ray.LightGray)

		ray.EndDrawing()
	}
}
