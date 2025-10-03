<script setup lang="ts">
import type { DefaultCSS } from "@/constants/customization.ts";

const {
  styles,
  modifyStyles,
  resetStyles,
} = defineProps<{
  "styles"      : typeof DefaultCSS;
  "modifyStyles": (newStyles: typeof DefaultCSS) => void;
  "resetStyles" : () => void;
}>();
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <button @click="resetStyles" class="w-fit flex flex-nowrap items-center gap-4 rounded-md py-2 pl-2 pr-3 transition-[background-color] hover:bg-catppuccin-800">
      <span class="i-lucide-rotate-ccw block size-6 text-gray-400" />
      <span class="block text-gray-400 font-medium">
        Reset Styles
      </span>
    </button>
    <div class="flex flex-nowrap items-center">
      <input
        id="layoutBorder"
        type="checkbox"
        :checked="styles.QToolButton.border"
        @input="toggleLayoutBorder"
      />
      <label for="layoutBorder">
        Remove main window borders
      </label>
    </div>
  </div>
</template>