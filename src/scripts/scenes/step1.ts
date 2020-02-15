export class MainScene extends Phaser.Scene {
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private player: Phaser.Physics.Arcade.Sprite;
  private tiles: Phaser.Tilemaps.Tileset;
  private groundLayer: Phaser.Tilemaps.StaticTilemapLayer;
  private death: Phaser.Tilemaps.StaticTilemapLayer;
  private background: Phaser.Tilemaps.StaticTilemapLayer;
  private map: Phaser.Tilemaps.Tilemap;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {
    this.load.tilemapTiledJSON("map", "../assets/map.json");
    this.load.spritesheet("sheet", "../assets/sheet-extruded.png", {
      frameWidth: 16,
      frameHeight: 16
    });

    this.load.atlas("player", "../assets/player.png", "../assets/player.json");
  }

  create(): void {
    this.mapSetup();
    this.playerSetup();
    this.cameraSetup();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-120);
      this.player.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(120);
      this.player.flipX = false;
    } else {
      this.player.setVelocityX(0);
    }
    if (
      (this.cursors.space.isDown || this.cursors.up.isDown) &&
      // @ts-ignore
      this.player.body.onFloor()
    ) {
      this.player.setVelocityY(-250);
    }
  }

  private playerDied() {
    this.scene.restart();
  }

  private mapSetup() {
    this.map = this.make.tilemap({ key: "map" });
    this.tiles = this.map.addTilesetImage("sheet", "sheet", 16, 16, 1, 2);
    this.groundLayer = this.map.createStaticLayer("ground", this.tiles, 0, 110);
    this.death = this.map.createStaticLayer("death", this.tiles, 0, 110);
    this.background = this.map.createStaticLayer("background", this.tiles, 0, 110);
    this.groundLayer.setCollisionByExclusion([-1]);
    this.death.setCollisionByExclusion([-1]);
  }

  private playerSetup() {
    this.player = this.physics.add.sprite(200, 200, "player");
    this.physics.add.collider(this.groundLayer, this.player);
    this.physics.add.collider(this.death, this.player, () => {
      this.playerDied();
    });
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  private cameraSetup() {
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.setBackgroundColor("#ccccff");
  }

  private animationSetup() {

  }
}
