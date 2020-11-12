import Game from "./Game";

export class Level1 extends Game {
  constructor() {
    super("Level1");
    this.heights = [4, 7, 5, null, 5, 4, null, 4, 4];
    this.weather = "afternoon";
  }
}

export class Level2 extends Game {
  constructor() {
    super("Level2");
    this.heights = [5, 4, null, 4, 6, 4, 6, 5, 5];
    this.weather = "twilight";
  }
}

export class Level3 extends Game {
  constructor() {
    super("Level3");
    this.heights = [6, null, 6, 4, 6, 4, 5, null, 8.5];
    this.weather = "night";
  }
}

export class Level4 extends Game {
  constructor() {
    super("Level4");
    this.heights = [4, null, 3, 6, null, 6, null, 5, 4];
    this.weather = "morning";
  }
}
