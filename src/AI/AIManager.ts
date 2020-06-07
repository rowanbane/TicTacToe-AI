import GameTile from "../Game/GameTile";

enum EAITypes {
    MinMax,
    MinMaxAlphaBeta,
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
        }
        return -1;
    }

    private static CalculateMinMax(boardstate: GameTile[]): number {
        return -1;
    }

    private static CalculateMinMaxAlphaBeta(boardstate: GameTile[]): number {
        return -1;
    }
}
