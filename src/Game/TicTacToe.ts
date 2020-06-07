import GameTile from "./GameTile";
import { AIManager, EAITypes } from "../AI/AIManager";

export default class TicTacToe extends PIXI.Container {
    public currentTurnToken: number = 1;

    public playerTurn: boolean = true;

    private _arr_gameBoard: GameTile[] = [];

    private gameWon: boolean = false;

    private _winText: PIXI.Text;

    private _AISelection: EAITypes = EAITypes.Random;

    private _turnPromiseResolver: (v: GameTile) => void;

    public constructor() {
        super();

        this.create();

        // Start the game logic:
        this.handleTurn();
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
            element.disable();
        });
    }

    public async handleTurn(): Promise<void> {
        // If the game hasn't been won:
        if (!this.gameWon) {
            // Create and await a new promise which resolves once a tile has been picked, either by AI or player.
            const tilePickedPromise = new Promise<GameTile>((resolve) => {
                this._turnPromiseResolver = resolve;
            });

            // Check if it's player or AI turn:
            let tilePicked: GameTile;

            if (this.playerTurn) {
                // Enable interaction of all tiles on the board:
                this.enableAllSelectable();

                // Wait for player to pick:
                tilePicked = await tilePickedPromise;

                // Disable all tiles:
                this.disableAll();
            } else {
                // Wait for AI to pick:
                // Call function to tell AI to pick:
                tilePicked = this._arr_gameBoard[this.obtainAITurn()];
            }

            // Handle adding token value to tile:
            tilePicked.handleToken(this.currentTurnToken);

            // handle win logic:
            this.checkWinners();

            // Setup for next turn:
            if (this.currentTurnToken === 1) {
                this.currentTurnToken = 2;
            } else if (this.currentTurnToken === 2) {
                this.currentTurnToken = 1;
            }

            this.playerTurn = !this.playerTurn;

            // Start next turn:
            this.handleTurn();
        }
    }

    public onTileSelected(tile: GameTile): void {
        // Resolve the promise passing the tile through the promise resolve:
        this._turnPromiseResolver(tile);
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

        if (count === this._arr_gameBoard.length && !this.gameWon) {
            //Draw Logic
            this.winGame(false);
        }
    }

    public winGame(hasWon: boolean): void {
        this.gameWon = true;

        if (hasWon) {
            this._winText = new PIXI.Text("Game won! Click to play again");
        } else {
            this._winText = new PIXI.Text("Game Drew! Click to play again");
        }

        this._arr_gameBoard.forEach((element) => {
            element.disable();
        });

        this._winText.x = 550;
        this._winText.y = 100;
        this._winText.anchor.set(0.5);
        this.addChild(this._winText);
        this._winText.interactive = true;
        this._winText.on("pointerdown", () => {
            window.location.reload();
        });
    }

    public obtainAITurn(): number {
        this.disableAll();

        let tileSelection: number = 0;

        tileSelection = AIManager.getNextMove(
            this._arr_gameBoard,
            this._AISelection
        );

        this.enableAllSelectable();
        // return this._arr_gameBoard[tileSelection];
        return tileSelection;
    }

    public disableAll(): void {
        this._arr_gameBoard.forEach((element) => {
            element.disable();
        });
    }

    public enableAllSelectable(): void {
        this._arr_gameBoard.forEach((element) => {
            if (element.tokenPlaced === 0) {
                element.enable();
            }
        });
    }
}
