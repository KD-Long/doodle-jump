Core Features:
1. Player Controls:
    Movement: Left/right with keyboard or touch.
    Physics: @react-three/cannon for jumping, gravity, and collisions.
    Auto-jump: Triggered when landing on a platform.
    Toroidal: Player reappears on opposite side when moving off-screen.

2. Platform Generation:
    Dynamic Platforms: Procedurally generated as the player ascends.
    Platform Types: Static, moving, disappearing, and boost platforms.
    Cleanup: Remove platforms below the camera view.

    - start with 100m segments that contain X number of platforms
    - build the tree with segments as the player climbs, there will be difficulty of segments
    

3. Camera Positioning:
    Follow Player: Smooth camera transition following the player's Y-axis.
    Game Over: If the player falls below the camera view.

4. Design Assets:
    Character: 3D model for player.
    Platforms: Simple geometric shapes (cubes, springs).
    Extras: Monsters (enemies), black holes (hazards).

5. Scoring:
    Based on Height: Score increases as the player ascends.
    Bonuses: Extra points for using special platforms and defeating enemies.

6. Extras:
    Monsters: Moving/stationary enemies that cause game over on collision.
    Black Holes: Randomly spawn, pulling players in for instant game over.
    Varied Platforms: Add challenge with disappearing, moving, and boost types.