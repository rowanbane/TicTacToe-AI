import TicTacToe from "./TicTacToe";

export default class GameTile extends PIXI.Container {
    public tokenPlaced: number = 0;

    private _spr_tile: PIXI.Graphics;

    private _txt_token: PIXI.Text;

    private _gameScene: TicTacToe;

    public constructor(x: number, y: number, scene: TicTacToe) {
        super();
        this.x = x;
        this.y = y;
        this._gameScene = scene;
        this.create();
    }

    public create(): void {
        this._spr_tile = new PIXI.Graphics();
        this._spr_tile.beginFill(0xffffff);
        this._spr_tile.drawRect(0, 0, 100, 100);
        this.addChild(this._spr_tile);

        this.enable();
    }

    public enable(): void {
        this.buttonMode = true;

        this.interactive = true;

        this.on("mousedown", this.onPointerDown);
        //.on("touchstart", this.onPointerDown);
    }

    public disable(): void {
        this.interactive = false;
    }

    private onPointerDown(): void {
        this.disable();

        console.log("pressed");

        this._gameScene.onTileSelected(this);
    }

    public handleToken(tokenToBePlaced: number): void {
        this.tokenPlaced = tokenToBePlaced;

        switch (tokenToBePlaced) {
            case 1:
                this._txt_token = new PIXI.Text("X");
                break;

            case 2:
                this._txt_token = new PIXI.Text("O");
                break;
        }

        this._txt_token.x = 50;
        this._txt_token.y = 50;
        this._txt_token.anchor.set(0.5);
        this.addChild(this._txt_token);
    }
}
