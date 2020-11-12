import Phaser from "phaser";
import { Level1, Level2, Level3, Level4 } from "./scenes/Levels";
import GameOver from "./scenes/GameOver";
import Preloader from "./scenes/Preloader";

new Phaser.Game({
  type: Phaser.AUTO,
  fps: { target: 60 },
  width: 500,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 800 },
      // debug: true,
    },
  },
  scene: [Preloader, Level1, Level2, Level3, Level4, GameOver],
});
