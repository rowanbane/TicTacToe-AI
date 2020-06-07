import GameTile from "../Game/GameTile";

export enum EAITypes {
    MinMax,
    MinMaxAlphaBeta,
    Random,
    Sequential,
}

export class AIManager {
    public static getNextMove(
        boardstate: GameTile[],
        aiType: EAITypes
    ): number {
        switch (aiType) {
            case EAITypes.MinMax:
                return this.CalculateMinMax(boardstate);

            case EAITypes.MinMaxAlphaBeta:
                return this.CalculateMinMaxAlphaBeta(boardstate);

            case EAITypes.Random:
                return this.RandomSelection(boardstate);

            case EAITypes.Sequential:
                return this.CalculateMinMaxAlphaBeta(boardstate);
        }
        return -1;
    }

    private static CalculateMinMax(boardstate: GameTile[]): number {
        //Clones the boardstate without keeping the by ref property
        const mapArray = boardstate.map((tile) => tile.tokenPlaced); // <- converts gameitle into number array based off tokenPlaced.
        const clonedArray = [...boardstate]; // <- copy of boardstate into new array, without reference to old.

        return -1;
    }

    private static CalculateMinMaxAlphaBeta(boardstate: GameTile[]): number {
        return -1;
    }

    private static RandomSelection(boardState: GameTile[]): number {
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

    private static SequentialSelection(boardstate: GameTile[]): number {
        let selection: number = -1;

        boardstate.forEach((element) => {
            if (element.tokenPlaced === 0 && selection === -1) {
                console.log(boardstate.indexOf(element));
                selection = boardstate.indexOf(element);
            }
        });

        return selection;
    }
}
