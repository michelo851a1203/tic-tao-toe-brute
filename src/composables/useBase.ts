import { ref, shallowRef, computed } from 'vue';

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

type NumericRange<From extends number, To extends number> = Exclude<Enumerate<To>, Enumerate<From>> | To;

type TicTacToeID = NumericRange<0, 8>;

export enum TicTacToeValue {
  Cross = 'X',
  Circle = 'O',
  Tie = '平手'
}

export interface TicTacToeNode {
  value?: TicTacToeValue;
}

export const useBase = () => {
  // state::
  const currentRound = shallowRef<TicTacToeValue>(TicTacToeValue.Circle);
  const ticTacToeMap = ref<Map<TicTacToeID, TicTacToeNode>>(new Map());

  // computed::
  const currentWinStatus = computed<TicTacToeValue | null>(() => {
    const horizontalList: TicTacToeID[][] = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
    const vertical: TicTacToeID[][] = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
    const slope: TicTacToeID[][] = [[0, 4, 8], [2, 4, 6]];
    const checkList = [horizontalList, vertical, slope];
    for (let i = 0; i < checkList.length; i++) {
      const currentResult = checkIfWinFromCondition(checkList[i]);
      if (typeof currentResult !== 'undefined') return currentResult;
    }

    const currentMap = ticTacToeMap.value;

    if(currentMap.size === 9) {
      return TicTacToeValue.Tie;
    }

    return null;
  });

  // methods::
  const ticTacToeAction = (id: TicTacToeID): void => {
    const isWin = currentWinStatus.value
    if (isWin !== null) return;
    const currentTicTacToeMap = ticTacToeMap.value;
    const currentMap = currentTicTacToeMap.get(id);
    if (currentMap) return;
    const newMark: TicTacToeNode = {
      value: currentRound.value,
    };
    currentTicTacToeMap.set(id, newMark);
    nextRound();
  };

  const checkIfWinFromCondition = (idNestedList: TicTacToeID[][]): TicTacToeValue | undefined => {
    return idNestedList
      .map<TicTacToeValue | undefined>(conditionList => {
        const isCircleWin = checkIfWin(conditionList, TicTacToeValue.Circle);
        const isCrossWin = checkIfWin(conditionList, TicTacToeValue.Cross);
        if (isCircleWin) return TicTacToeValue.Circle;
        if (isCrossWin) return TicTacToeValue.Cross;
      })
      .find(item => typeof item !== 'undefined');
  };

  const checkIfWin = (elementList: TicTacToeID[], expectedValue: TicTacToeValue): boolean => {
    const resultMap = ticTacToeMap.value;
    return elementList.every(nodeID => {
      const nodeValue = resultMap.get(nodeID)?.value
      if (!nodeValue) return false;
      return nodeValue === expectedValue;
    });
  };

  const nextRound = (): void => {
    currentRound.value = currentRound.value === TicTacToeValue.Circle ? TicTacToeValue.Cross : TicTacToeValue.Circle;
  };

  return {
    // state::
    ticTacToeMap,
    //computed::
    currentWinStatus,
    // methods::
    ticTacToeAction,
  };
};

export type UseBase = typeof useBase;
