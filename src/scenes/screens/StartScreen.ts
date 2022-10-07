import Screen from './Screen';

export default class StartScreen extends Screen {
   constructor() {
      super('start-screen');
   }

   create() {
      this.playAnimSled();

      this.createText(
         this.scale.width / 2 - 100,
         this.scale.height / 1.5,
         'Codey in Tundra',
         22,
         'green',
         'bold'
      );

      this.createText(
         this.scale.width / 2 - 107,
         this.scale.height / 1.4,
         'Frozen with horror',
         20,
         'red'
      );

      this.createButton(
         'Start',
         this.scale.width / 2 - 53,
         this.scale.height / 1.2
      );
   }
}
