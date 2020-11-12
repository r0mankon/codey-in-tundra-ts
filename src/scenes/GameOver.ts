export default class GameOver extends Phaser.Scene {
  player!: Phaser.GameObjects.Sprite;
  button!: Phaser.GameObjects.Text;

  constructor() {
    super("game-over");
  }

  preload() {
    this.load.spritesheet("codey_sled", "assets/images/codey_sled.png", {
      frameWidth: 81,
      frameHeight: 90,
    });
  }

  create() {
    this.player = this.add.sprite(this.scale.width / 2, this.scale.height / 2, "codey_sled");

    this.add
      .text(
        this.scale.width / 2 - 230,
        this.scale.height / 1.5,
        "You reached the end of the game"
      )
      .setFontSize(25)
      .setColor("gold");

    this.button = this.add
      .text(this.scale.width / 2 - 60, this.scale.height / 1.3, "Restart")
      .setBackgroundColor("blue")
      .setFontSize(20)
      .setFontStyle("bold")
      .setPadding(10, 10, 10, 10);

    this.button.setInteractive().on("pointerdown", () => {
      this.scene.start("Level1");
    });

    this.anims.create({
      key: "sled",
      frames: this.anims.generateFrameNumbers("codey_sled", {}),
      frameRate: 10,
      repeat: -1,
    });

    this.player.anims.play("sled", true);
  }

  update() {
    this.player.rotation -= 0.05;
  }
}
