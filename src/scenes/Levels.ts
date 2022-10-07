import Game from './Game';

export class Level1 extends Game {
   constructor() {
      super('Level1');
      this.heights = [4, 7, 5, null, 5, 4, null, 4, 2];
      this.weather = 'morning';
   }
}

export class Level2 extends Game {
   constructor() {
      super('Level2');
      this.heights = [5, null, 6, null, 6, 4, null, 5, 3];
      this.weather = 'afternoon';
   }
}

export class Level3 extends Game {
   constructor() {
      super('Level3');
      this.heights = [6, null, 6, 4, 6, 4, 5, null, 5];
      this.weather = 'twilight';
   }
}

export class Level4 extends Game {
   constructor() {
      super('Level4');
      this.heights = [8, 6, 2.8, 8, 6, 4, 2.5, null, 8];
      this.weather = 'twilight';
   }
}

export class Level5 extends Game {
   constructor() {
      super('Level5');
      this.heights = [7, null, 7, null, 8, null, 7, null, 8];
      this.weather = 'night';
   }
}
