export class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON("map", "../assets/map.json");
    this.load.spritesheet("tiles", "../assets/tiles.png", {
      frameWidth: 70,
      frameHeight: 70
    });

    this.load.image("coin", "../assets/coinGold.png");
    this.load.atlas("player", "../assets/player.png", "../assets/player.json");
  }

  create(): void {
    let map = this.make.tilemap({ key: "map" });

    var groundTiles = map.addTilesetImage("tiles");
    let groundLayer = map.createStaticLayer("World", groundTiles, 0, 0);
    groundLayer.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(200, 200, "player");
    this.physics.add.collider(groundLayer, this.player);
    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);

    this.cameras.main.setBackgroundColor("#ccccff");

    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNames("player", {
        prefix: "p1_walk",
        start: 1,
        end: 11,
        zeroPad: 2
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: [{ key: "player", frame: "p1_stand" }],
      frameRate: 10
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-200);
      this.player.anims.play("walk", true);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(200);
      this.player.anims.play("walk", true);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
      this.player.anims.play("idle", true);
    }
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
    // @ts-ignore
    this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-500);
    }

  }
}
