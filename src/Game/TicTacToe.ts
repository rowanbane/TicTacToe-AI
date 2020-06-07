import GameTile from "./GameTile";

export default class TicTacToe extends PIXI.Container {
    private _arr_gameBoard: GameTile[] = [];

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
                new GameTile((i % 3) * xOffset + xOffset, yRow * yOffset)
            );
        }

        this._arr_gameBoard.forEach((element) => {
            this.addChild(element);
        });
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
        }

        if (
            this._arr_gameBoard[2].tokenPlaced !== 0 &&
            this._arr_gameBoard[4].tokenPlaced ===
                this._arr_gameBoard[0].tokenPlaced &&
            this._arr_gameBoard[2].tokenPlaced ===
                this._arr_gameBoard[6].tokenPlaced
        ) {
            //win logic
        }

        let count = 0;
        this._arr_gameBoard.forEach((element) => {
            if (element.tokenPlaced !== 0) {
                count++;
            }
        });

        if (count === this._arr_gameBoard.length) {
            //Draw Logic
        }
    }
}
