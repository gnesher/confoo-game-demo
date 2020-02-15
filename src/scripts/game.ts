// https://gamedevacademy.org/how-to-make-a-mario-style-platformer-with-phaser-3/
import "phaser";
import { MainScene } from "./scenes/step1";


// main game configuration
const config: Phaser.Types.Core.GameConfig = {
  width: 400,
  height: 300,
  scale: {
    zoom: 2
  },
  type: Phaser.AUTO,
  parent: "game",
  scene: MainScene,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
};

export class Game extends Phaser.Game {
  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);
  }
}

// when the page is loaded, create our game instance
window.addEventListener("load", () => {
  const game = new Game(config);
});
