import GameTile from "./GameTile";

export default class TicTacToe extends PIXI.Container {
    public currentTurnToken: number = 1;

    private _arr_gameBoard: GameTile[] = [];

    private gameWon: boolean = false;

    private _winText: PIXI.Text;

    public constructor() {
        super();
        this.create();
    }

    public create(): void {
        const yOffset: number = 125;

        const xOffset: number = 125;

        let yRow = 0;

        for (let i = 0; i < 9; i++) {
            if (i % 3 === 0) {
                yRow++;
            }

            this._arr_gameBoard.push(
                new GameTile((i % 3) * xOffset + xOffset, yRow * yOffset, this)
            );
        }

        this._arr_gameBoard.forEach((element) => {
            this.addChild(element);
        });
    }

    public handleTurn(gameTile: GameTile): void {
        console.log(this.currentTurnToken);
        gameTile.handleToken(this.currentTurnToken);

        if (this.currentTurnToken === 1) {
            this.currentTurnToken = 2;
            console.log(this.currentTurnToken);
        } else if (this.currentTurnToken === 2) {
            this.currentTurnToken = 1;
        }

        this.checkWinners();

        if (!this.gameWon) {
            //pass turn
        }
    }

    public checkWinners(): void {
        //Check columns
        for (let i = 0; i < 3; i++) {
            if (
                this._arr_gameBoard[i].tokenPlaced !== 0 &&
                this._arr_gameBoard[i].tokenPlaced ===
                    this._arr_gameBoard[i + 3].tokenPlaced &&
                this._arr_gameBoard[i + 6].tokenPlaced ===
                    this._arr_gameBoard[i].tokenPlaced
            ) {
                //win logic
                this.winGame(true);
            }
        }

        //Check Rows
        for (let i = 0; i < 3; i++) {
            let y = i * 3;
            if (
                this._arr_gameBoard[y].tokenPlaced !== 0 &&
                this._arr_gameBoard[y].tokenPlaced ===
                    this._arr_gameBoard[y + 1].tokenPlaced &&
                this._arr_gameBoard[y + 2].tokenPlaced ===
                    this._arr_gameBoard[y].tokenPlaced
            ) {
                //win logic
                this.winGame(true);
            }
        }

        //Check diagonals

        if (
            this._arr_gameBoard[0].tokenPlaced !== 0 &&
            this._arr_gameBoard[4].tokenPlaced ===
                this._arr_gameBoard[0].tokenPlaced &&
            this._arr_gameBoard[0].tokenPlaced ===
                this._arr_gameBoard[8].tokenPlaced
        ) {
            //win logic
            this.winGame(true);
        }

        if (
            this._arr_gameBoard[2].tokenPlaced !== 0 &&
            this._arr_gameBoard[4].tokenPlaced ===
                this._arr_gameBoard[2].tokenPlaced &&
            this._arr_gameBoard[2].tokenPlaced ===
                this._arr_gameBoard[6].tokenPlaced
        ) {
            //win logic
            this.winGame(true);
        }

        let count = 0;
        this._arr_gameBoard.forEach((element) => {
            if (element.tokenPlaced !== 0) {
                count++;
            }
        });

        if (count === this._arr_gameBoard.length) {
            //Draw Logic
            this.winGame(false);
        }
    }

    public winGame(hasWon: boolean): void {
        if (hasWon) {
            this._winText = new PIXI.Text("Game won! Refresh to play again");
        } else {
            this._winText = new PIXI.Text("Game Drew! Refresh to play again");
        }
        this._winText.x = 550;
        this._winText.y = 100;
        this._winText.anchor.set(0.5);
        this.addChild(this._winText);
    }
}
