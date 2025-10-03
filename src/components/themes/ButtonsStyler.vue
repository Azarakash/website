<script setup lang="ts">
import type { DefaultCSS } from "@/constants/customization.ts";
import { computed, type UnwrapRef } from "vue";

const {
  styles,
  background,
  modifyStyles,
  resetStyles,
} = defineProps<{
  "styles"      : typeof DefaultCSS;
  "background"  : string;
  "modifyStyles": (newStyles: typeof DefaultCSS) => void;
  "resetStyles" : () => void;
}>();

const styleResetButtons = computed(() => {
  return [
    { "selector": "QToolButton", "value": styles["QToolButton"].border },
    { "selector": "QPushButton", "value": styles["QPushButton"].border },
    { "selector": "QTabBar::tab", "value": styles["QTabBar::tab"].border },
  ] as const;
});

// Unwraps 'ComputedRef<T>' and gets a constant array
function toggleButton(selector: UnwrapRef<typeof styleResetButtons>[number]["selector"]) {
  modifyStyles({
    ...styles,
    [selector]: {
      ...styles[selector],
      "border": !styles[selector].border,
    },
  });
}

function getPushButtonBackground(inputBackground: false | string, borderless: boolean) {
  if (borderless && (inputBackground === false)) {
    return "transparent";
  }

  if (borderless) {
    return inputBackground + "25";
  }

  return "linear-gradient(to bottom, #ffffff22, #ffffff11)";
}
</script>

<template>
  <div class="grid cols-1 w-full gap-2 lg:cols-3 sm:cols-2">
    <button @click="resetStyles" class="w-fit flex flex-nowrap items-center gap-4 rounded-md py-2 pl-2 pr-3 transition-[background-color] hover:bg-catppuccin-800">
      <span class="i-lucide-rotate-ccw block size-6 text-gray-400" />
      <span class="block text-gray-400 font-medium">
        Reset Styles
      </span>
    </button>
    <div
      v-for="styleResetButton in styleResetButtons"
      :key="styleResetButton.selector"
      class="flex flex-nowrap items-center p-2"
    >
      <input
        type="checkbox"
        :id="`${styleResetButton.selector}Border`"
        :checked="styleResetButton.value"
        @input="() => toggleButton(styleResetButton.selector)"
        :class="[
        'shrink-0 size-6 appearance-none rounded-md cursor-pointer',
        styleResetButton.value
          ? 'bg-white'
          : 'bg-catppuccin-700',
      ]"
      />
      <label :for="`${styleResetButton.selector}Border`" class="cursor-pointer pl-4 text-gray-400">
        <span>Customize</span>
        <span>{{ " " }}</span>
        <span class="text-white">{{ styleResetButton.selector }}</span>
      </label>
    </div>
  </div>
  <div
    class="flex flex-wrap gap-2 border border-[#7a7a7a] p-2"
    :style="{ background: background, }"
  >
    <div
      v-for="pushButton in ['I am a QPushButton!', 'Close', 'Help']"
      :key="pushButton"
      class="w-fit flex border text-sm leading-none"
      :style="{
        background  : getPushButtonBackground(
          styles.QPushButton['background-color'],
          styles.QPushButton.border,
        ),
        borderColor : styles.QPushButton.border ? 'transparent' : '#ffffff27',
        borderRadius: styles.QPushButton.border ? 0 : '2px',
        padding     : styles.QPushButton.padding || '2px 4px',
      }"
    >
      {{ pushButton }}
    </div>
  </div>
</template>