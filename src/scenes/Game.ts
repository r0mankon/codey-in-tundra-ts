import { Animations } from '~/enums/Animations';
import { Textures } from '~/enums/Texture';
import getWeather, { WeatherName } from '../libs/getWeather';

export default class Game extends Phaser.Scene {
   // Physics affected objects
   private platforms!: Phaser.Physics.Arcade.StaticGroup;
   private player!: Phaser.Physics.Arcade.Sprite;
   private goal!: Phaser.Physics.Arcade.Sprite;

   // Backgrounds
   private sky!: Phaser.GameObjects.Rectangle;
   private mountain!: Phaser.GameObjects.Image;
   private trees!: Phaser.GameObjects.Image;
   private snowdunes!: Phaser.GameObjects.Image;

   private stars!: Phaser.GameObjects.Arc[];
   private snowflakes!: Phaser.GameObjects.Particles.ParticleEmitter;
   private game_width!: number;
   private game_height!: number;

   private velocityX = 310;
   private velocityY = -900;

   private state = {
      active: false,
   };

   private nextLevel = {
      Level1: 'Level2',
      Level2: 'Level3',
      Level3: 'Level4',
      Level4: 'Level5',
      Level5: 'game-over',
   };

   private levelKey: string;

   private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

   weather!: WeatherName;
   heights!: Array<number | null>;

   constructor(key: string) {
      super(key);
      this.levelKey = key;
   }

   init() {
      this.game_width = this.scale.width;
      this.game_height = this.scale.height;
      this.cursors = this.input.keyboard.createCursorKeys();
   }

   create() {
      this.state.active = true;

      this.sky = this.add
         .rectangle(0, 0, this.game_width, this.game_height, 0x00aaff)
         .setOrigin(0);

      // stars are above the sky & below other backgrounds
      this.createStars();
      this.createParallaxBackgrounds();

      // play a random sound on each level
      this.sound.stopAll();
      const bgSound = this.getRandomSound();
      bgSound.play({ loop: true });

      this.player = this.physics.add
         .sprite(125, 0, Textures.Player)
         .setScale(0.5)
         .setCollideWorldBounds(true);

      this.platforms = this.physics.add.staticGroup();

      this.createSnow();
      this.levelSetup();

      this.physics.add.collider(this.player, this.platforms);
      this.physics.add.collider(this.goal, this.platforms);

      this.physics.world.setBounds(
         0,
         0,
         this.snowdunes.width,
         this.snowdunes.height + this.player.height
      );

      this.cameras.main.setBounds(
         0,
         0,
         this.snowdunes.width,
         this.snowdunes.height
      );
      this.cameras.main.startFollow(this.player, true, 0.5, 0.5);

      this.goal.anims.play(Animations.Fire, true);
   }

   update() {
      if (!this.state.active) return;

      this.updateMovementX();
      this.updateMovementY();

      if (this.player.y > this.snowdunes.height) {
         this.cameras.main.shake(350, 0.03, false, (camera, progress) => {
            progress > 0.9 && this.scene.restart();
         });
      }
   }

   updateMovementX() {
      if (this.cursors.right!.isDown) {
         this.player.flipX = false;
         this.player.setVelocityX(this.velocityX);
         this.player.anims.play(Animations.Run, true);
         return;
      }

      if (this.cursors.left!.isDown) {
         this.player.flipX = true;
         this.player.setVelocityX(-this.velocityX);
         this.player.anims.play(Animations.Run, true);
         return;
      }

      this.player.setVelocityX(0);
      this.player.anims.play(Animations.Idle, true);
   }

   updateMovementY() {
      if (this.cursors.space!.isDown && this.player.body.touching.down) {
         this.player.setVelocityY(this.velocityY);
         this.player.anims.play(Animations.Jump);
      }
   }

   createStars() {
      const stars: Phaser.GameObjects.Arc[] = [];

      const getRandomStarValues = () => {
         return {
            x: Math.floor(Math.random() * this.game_width * 1.5),
            y: Math.floor(Math.random() * this.game_height * 0.5),
            radius: Math.floor(Math.random() * 3),
         };
      };

      for (let i = 0; i <= 200; i++) {
         const { x, y, radius } = getRandomStarValues();
         const star = this.add.circle(x, y, radius, 0xffffff);
         star.setScrollFactor(Math.random() * 0.1);
         stars.push(star);
      }

      this.stars = stars;
   }

   createParallaxBackgrounds() {
      this.mountain = this.add.image(0, 0, Textures.Mountain).setOrigin(0);
      this.trees = this.add.image(0, 0, Textures.Trees).setOrigin(0);
      this.snowdunes = this.add.image(0, 0, Textures.Snowdunes).setOrigin(0);

      const game_max_width = this.snowdunes.width;
      const window_width = this.game_width;
      const bg1_width = this.mountain.width;
      const bg2_width = this.trees.width;

      this.sky.setScrollFactor(0);

      this.mountain.setScrollFactor(
         (bg1_width - window_width) / (game_max_width - window_width)
      );

      this.trees.setScrollFactor(
         (bg2_width - window_width) / (game_max_width - window_width)
      );
   }

   createSnow() {
      const particles = this.add.particles(Textures.Snowflake);

      const emitter = particles.createEmitter({
         x: { min: 0, max: this.game_width * 2 },
         y: -5,
         speedX: { min: -5, max: -200 },
         speedY: { min: 200, max: 500 },
         scale: { start: 0.6, end: 0 },
         lifespan: 2000,
         quantity: 10,
         blendMode: 'ADD',
      });

      emitter.setScrollFactor(0);
      this.snowflakes = emitter;
   }

   levelSetup() {
      for (const [xIndex, yIndex] of this.heights.entries()) {
         this.createPlatforms(xIndex, yIndex);
      }

      this.goal = this.physics.add.sprite(
         this.snowdunes.width - 40,
         0,
         Textures.Goal
      );

      const fadeIntoNextLevel = () => {
         this.cameras.main.fade(
            700,
            0,
            0,
            0,
            false,
            (camera, progress: number) => {
               if (progress > 0.9) {
                  this.scene.stop(this.levelKey);
                  this.scene.start(this.nextLevel[this.levelKey]);
               }
            }
         );
      };

      this.physics.add.overlap(this.player, this.goal, fadeIntoNextLevel);

      this.setWeather(this.weather);
   }

   createPlatforms(x: number | null, y: number | null) {
      if (typeof x === 'number' && typeof y === 'number') {
         this.platforms
            .create(220 * x, y * 70, Textures.Platform)
            .setOrigin(0, 0.5)
            .refreshBody();
      }
   }

   setWeather(weather: WeatherName) {
      const { color, bgColor, snow, wind } = getWeather(weather);

      this.sky.fillColor = bgColor;
      this.mountain.setTint(color);
      this.trees.setTint(color);
      this.snowdunes.setTint(color);

      this.snowflakes.setQuantity(snow);
      this.snowflakes.setSpeedX(-wind);

      this.platforms.setTint(color);

      if (weather === 'night' || weather === 'twilight') {
         return this.stars.forEach(star => star.setVisible(true));
      }

      this.stars.forEach(star => star.setVisible(false));
   }

   getRandomSound() {
      // const intro = this.sound.get('intro-theme');
      const dungeon = this.sound.get('dungeon-theme');
      const iceland = this.sound.get('iceland-theme');
      const boss = this.sound.get('boss-theme');

      const sounds = [dungeon, iceland, boss];

      return sounds[Math.floor(Math.random() * sounds.length)];
   }
}
