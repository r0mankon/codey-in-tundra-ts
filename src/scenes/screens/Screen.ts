export default class Screen extends Phaser.Scene {
   player!: Phaser.GameObjects.Sprite;
   button!: Phaser.GameObjects.Text;

   constructor(config: string | Phaser.Types.Scenes.SettingsConfig) {
      super(config);
   }

   preload() {
      this.load.spritesheet('codey_sled', 'assets/images/codey_sled.png', {
         frameWidth: 81,
         frameHeight: 90,
      });

      this.player = this.add.sprite(
         this.scale.width / 2,
         this.scale.height / 2,
         'codey_sled'
      );
   }

   playAnimSled(frameRate = 1) {
      this.anims.remove('sled')

      this.anims.create({
         key: 'sled',
         frames: this.anims.generateFrameNumbers('codey_sled', {}),
         frameRate: frameRate,
         repeat: -1,
      });

      this.player.anims.play('sled', true);
   }

   createText(
      x: number,
      y: number,
      text: string,
      size = 20,
      color = 'green',
      style?: string
   ) {
      this.add
         .text(x, y, text)
         .setFontSize(size)
         .setColor(color)
         .setFontStyle(style || '');
   }

   createButton(text: string, xBy: number, yBy: number, color = 'green') {
      this.button = this.add
         .text(xBy, yBy, text)
         .setBackgroundColor(color)
         .setFontSize(20)
         .setFontStyle('bold')
         .setPadding(20, 10, 20, 10);

      this.button.setInteractive().on('pointerdown', () => {
         this.scene.start('Level1');
      });
   }
}
