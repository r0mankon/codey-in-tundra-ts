import Phaser from 'phaser';
import { Level1, Level2, Level3, Level4, Level5 } from './scenes/Levels';
import Preloader from './scenes/Preloader';
import StartScreen from './scenes/screens/StartScreen';
import EndScreen from './scenes/screens/EndScreen';

new Phaser.Game({
   type: Phaser.AUTO,
   fps: { target: 60 },
   width: 500,
   height: 600,
   physics: {
      default: 'arcade',
      arcade: {
         gravity: { y: 2500 },
         // debug: true,
      },
   },
   scene: [
      Preloader,
      StartScreen,
      Level1,
      Level2,
      Level3,
      Level4,
      Level5,
      EndScreen,
   ],
});
