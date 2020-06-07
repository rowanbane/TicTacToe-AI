export default class GameTile extends PIXI.Container {
    public tokenPlaced: number = 0;

    private _spr_tile: PIXI.Graphics;

    private _txt_token: PIXI.Text;

    public constructor(x: number, y: number) {
        super();
        this.x = x;
        this.y = y;
        this.create();
    }

    public create(): void {
        this._spr_tile = new PIXI.Graphics();
        // this._spr_tile.beginFill(0xff0000);
        this._spr_tile.beginFill(0xffffff);
        this._spr_tile.drawRect(0, 0, 100, 100);
        this.addChild(this._spr_tile);

        this.enable();
    }

    public enable(): void {
        this._spr_tile.buttonMode = true;

        this._spr_tile.interactive = true;

        // this._spr_tile.cursor = "button";

        this._spr_tile
            .on("mousedown", this.onPointerDown)
            .on("touchstart", this.onPointerDown);
    }

    private onPointerDown(): void {
        this.interactive = false;
        console.log("pressed");
        this._txt_token = new PIXI.Text("X");
        this._txt_token.x = 50;
        this._txt_token.y = 50;
        this._txt_token.anchor.set(0.5);
        this.addChild(this._txt_token);
        this.handleToken();
    }

    private handleToken(): void {}
}
