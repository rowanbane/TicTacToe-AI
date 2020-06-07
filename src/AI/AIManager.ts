import GameTile from "../Game/GameTile";

export enum EAITypes {
    MinMax,
    Random,
    Sequential,
}

export class AIManager {
    private static n = 0;

    private static debugLog = false;

    public static getNextMove(
        boardstate: GameTile[],
        aiType: EAITypes,
        myValue: number,
        log: boolean
    ): number {
        this.n = 0;

        switch (aiType) {
            case EAITypes.MinMax:
                return this.calculateMinMax(boardstate, myValue);

            case EAITypes.Random:
                return this.randomSelection(boardstate);
        }
        return -1;
    }

    private static calculateMinMax(
        boardstate: GameTile[],
        myValue: number
    ): number {
        //Clones the boardstate without keeping the by ref property
        const mapArray = boardstate.map((tile) => tile.tokenPlaced); // <- converts gameitle into number array based off tokenPlaced.
        // const clonedArray = [...boardstate]; // <- copy of boardstate into new array, without reference to old.

        let calculatedMove: number = null;
        let bestValue: number = -10000;

        boardstate.forEach((curEvaluatedTile, i) => {
            if (curEvaluatedTile.tokenPlaced === 0) {
                this.n = 0;
                // If there is no current calculated move, its the first one it looks at. Makes sure theres "a" move...
                if (calculatedMove === null) {
                    calculatedMove = boardstate.indexOf(curEvaluatedTile);
                }

                // Calcluates the scores value of placing a token on the Gametile "curEvaluatedTile".
                const moveValue = this.minimaxRecursive(
                    [...mapArray],
                    0,
                    boardstate.indexOf(curEvaluatedTile),
                    false,
                    myValue
                );

                console.log(
                    `Index ${i} on the board scored ${moveValue} with ${this.n} itterations to calculate.`
                );

                // If this tile has a better score than the current "best move", this tile is now the best move.
                if (moveValue > bestValue) {
                    console.log("new best value ", moveValue, ">", bestValue);
                    bestValue = moveValue;
                    calculatedMove = boardstate.indexOf(curEvaluatedTile);
                }
            }
        });

        // Debug log out which move it took - return.
        console.log(calculatedMove);
        return calculatedMove;
    }

    private static calculateMinMaxAlphaBeta(boardstate: GameTile[]): number {
        return -1;
    }

    private static randomSelection(boardState: GameTile[]): number {
        const possibleIndex = [];

        boardState.forEach((tile, i) => {
            if (tile.tokenPlaced == 0) {
                possibleIndex.push(i);
            }
        });

        const i =
            possibleIndex[Math.floor(Math.random() * possibleIndex.length)];
        console.log(i, possibleIndex);
        return i;
    }

    private static sequentialSelection(boardstate: GameTile[]): number {
        let selection: number = -1;

        boardstate.forEach((element) => {
            if (element.tokenPlaced === 0 && selection === -1) {
                console.log(boardstate.indexOf(element));
                selection = boardstate.indexOf(element);
            }
        });

        return selection;
    }

    private static minimaxRecursive(
        boardstate: number[],
        depth: number,
        moveIndex: number,
        IsMax: boolean,
        myValue: number
    ): number {
        // Increase number of itterations:
        this.n++;

        // Places the next move:
        if (!IsMax) {
            boardstate[moveIndex] = myValue;
        } else {
            boardstate[moveIndex] = myValue === 1 ? 2 : 1;
        }

        // Checks for an available move. If none then game is over..
        let movesLeft: boolean = this.checkIfMovesLeft(boardstate);

        const w = this.isWinner(boardstate);

        let str = `Winner = ${w}\n`;
        if (w != 0) {
            for (let i = 0; i < boardstate.length; i++) {
                str += boardstate[i];
            }
        }

        if (w === myValue) {
            str += `Score: ${10 - depth}`;
            if (this.debugLog) {
                console.log(str);
            }
            return 10 - depth;
        } else if (w === (myValue === 1 ? 2 : 1)) {
            str += `Score: ${-10 + depth}`;
            if (this.debugLog) {
                console.log(str);
            }
            return -10 + depth;
        }

        if (!movesLeft) {
            return 0;
        }

        if (IsMax) {
            let baseValue: number = -1000000;
            boardstate.forEach((element, i) => {
                if (element === 0) {
                    baseValue = Math.max(
                        baseValue,
                        this.minimaxRecursive(
                            [...boardstate],
                            depth + 1,
                            i,
                            !IsMax,
                            myValue
                        )
                    );
                }
            });

            return baseValue;
        } else {
            let baseValue: number = 1000000;
            boardstate.forEach((element, i) => {
                if (element === 0) {
                    baseValue = Math.min(
                        baseValue,
                        this.minimaxRecursive(
                            [...boardstate],
                            depth + 1,
                            i,
                            !IsMax,
                            myValue
                        )
                    );
                }
            });

            return baseValue;
        }

        throw new Error("Exited without returning");
    }

    private static checkIfMovesLeft(boardstate: number[]): boolean {
        let movesLeft = false;
        boardstate.forEach((element) => {
            if (element === 0) {
                movesLeft = true;
            }
        });

        // console.log(`Moves left: ${movesLeft ? "Yes" : "no"}`);
        return movesLeft;
    }

    private static isWinner(boardState: number[]): number {
        //Check columns
        for (let i = 0; i < 3; i++) {
            if (
                boardState[i] !== 0 &&
                boardState[i] === boardState[i + 3] &&
                boardState[i + 6] === boardState[i]
            ) {
                //win logic
                if (this.debugLog) {
                    console.warn("Win found via cols");
                    console.log(boardState);
                }
                return boardState[i];
            }
        }

        //Check Rows
        for (let i = 0; i < 3; i++) {
            let y = i * 3;
            if (
                boardState[y] !== 0 &&
                boardState[y] === boardState[y + 1] &&
                boardState[y + 2] === boardState[y]
            ) {
                //win logic
                if (this.debugLog) {
                    console.warn("Win found via rows");
                    console.log(boardState);
                }
                return boardState[y];
            }
        }

        //Check diagonals

        if (
            boardState[0] !== 0 &&
            boardState[4] === boardState[0] &&
            boardState[0] === boardState[8]
        ) {
            //win logic
            return boardState[0];
        }

        if (
            boardState[2] !== 0 &&
            boardState[4] === boardState[2] &&
            boardState[2] === boardState[6]
        ) {
            //win logic
            return boardState[2];
        }

        return 0;
    }
}
