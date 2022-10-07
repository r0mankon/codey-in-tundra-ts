import { Animations } from '~/enums/Animations';
import { Textures } from '~/enums/Texture';

export default class Preloader extends Phaser.Scene {
   preload() {
      this.load.image(Textures.Platform, 'assets/images/platform.png');
      this.load.image(Textures.Snowflake, 'assets/images/snowflake.png');
      this.load.image(Textures.Mountain, 'assets/images/mountain.png');
      this.load.image(Textures.Trees, 'assets/images/trees.png');
      this.load.image(Textures.Snowdunes, 'assets/images/snowdunes.png');

      this.load.spritesheet(Textures.Player, 'assets/images/codey.png', {
         frameWidth: 72,
         frameHeight: 90,
      });

      this.load.spritesheet(Textures.Goal, 'assets/images/campfire.png', {
         frameWidth: 32,
         frameHeight: 32,
      });

      // this.load.audio('intro-theme', 'assets/sfx/Dungeon Theme.mp3');
      this.load.audio('dungeon-theme', 'assets/sfx/Dungeon Theme.mp3');
      this.load.audio('iceland-theme', 'assets/sfx/Iceland Theme.mp3');
      this.load.audio('boss-theme', 'assets/sfx/Boss Theme.mp3');
   }

   create() {
      // this.sound.add('intro-theme');
      this.sound.add('dungeon-theme');
      this.sound.add('iceland-theme');
      this.sound.add('boss-theme');

      this.createAnimations();

      this.scene.start('start-screen');
   }

   createAnimations() {
      this.anims.create({
         ...this.getAnimProps(Animations.Idle),
         frames: this.anims.generateFrameNumbers(Textures.Player, {
            start: 4,
            end: 5,
         }),
      });

      this.anims.create({
         ...this.getAnimProps(Animations.Run),
         frames: this.anims.generateFrameNumbers(Textures.Player, {
            start: 0,
            end: 3,
         }),
      });

      this.anims.create({
         ...this.getAnimProps(Animations.Jump),
         frames: this.anims.generateFrameNumbers(Textures.Player, {
            start: 2,
            end: 3,
         }),
      });

      this.anims.create({
         ...this.getAnimProps(Animations.Fire, 5, -1),
         frames: this.anims.generateFrameNumbers(Textures.Goal, {}),
      });
   }

   getAnimProps(key: string, frameRate = 10, repeat = -1) {
      return {
         key,
         frameRate,
         repeat,
      };
   }
}
