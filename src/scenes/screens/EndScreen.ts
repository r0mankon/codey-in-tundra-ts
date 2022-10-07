import Screen from './Screen';

export default class EndScreen extends Screen {
   constructor() {
      super('game-over');
   }

   create() {
      this.playAnimSled(10);

      this.createText(
         this.scale.width / 2 - 227,
         this.scale.height / 1.5,
         "You did it, You saved codey's life!",
         22
      );

      this.createText(
         this.scale.width / 2 - 190,
         this.scale.height / 1.4,
         'Now try it again, with one life.',
         20,
         'blue'
      );

      this.createButton(
         'Sure',
         this.scale.width / 2 - 53,
         this.scale.height / 1.2,
         'blue'
      );
   }

   update() {
      this.player.rotation -= 0.05;
   }
}
