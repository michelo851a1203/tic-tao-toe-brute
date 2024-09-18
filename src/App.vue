<script setup lang="ts">
  import { useBase } from './composables/useBase';
  const {
    ticTacToeMap,
    currentWinStatus,
    ticTacToeAction,
  } = useBase();
</script>

<template>
  <div mt-10 ml-10 w-100 grid="~ cols-3">
    <div @click="ticTacToeAction(0)" relative w-full pb-full border-b="solid 2px black" border-r="solid 2px black">
      <div font-bold absolute text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(0)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(1)" relative w-full pb-full border-b="solid 2px black" border-r="solid 2px black">
      <div font-bold absolute text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(1)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(2)" relative w-full pb-full border-b="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(2)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(3)" relative w-full pb-full border-b="solid 2px black" border-r="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(3)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(4)" relative w-full pb-full border-b="solid 2px black" border-r="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(4)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(5)" relative w-full pb-full border-b="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(5)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(6)" relative w-full pb-full border-r="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(6)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(7)" relative w-full pb-full border-r="solid 2px black">
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(7)?.value ?? '' }}</div>
    </div>
    <div @click="ticTacToeAction(8)" relative w-full pb-full>
      <div absolute font-bold text-3xl flex items-center justify-center inset-0>{{ ticTacToeMap.get(8)?.value ?? '' }}</div>
    </div>
  </div>
  <div v-if="currentWinStatus !== null" data-testid="area" rounded-lg px-3 py-2 border="solid 1px red-500" bg-red-200>
    {{ currentWinStatus }} is Win
  </div>
</template>
