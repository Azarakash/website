<script setup lang="ts">
import type { DefaultCSS } from "@/constants/customization.ts";
import { computed, type UnwrapRef } from "vue";

const {
  styles,
  modifyStyles,
  resetStyles,
} = defineProps<{
  "styles"      : typeof DefaultCSS;
  "modifyStyles": (newStyles: typeof DefaultCSS) => void;
  "resetStyles" : () => void;
}>();

const styleResetButtons = computed(() => {
  return [
    { "label": "tool button", "selector": "QToolButton", "value": styles["QToolButton"].border },
    { "label": "push button", "selector": "QPushButton", "value": styles["QPushButton"].border },
    { "label": "tab button", "selector": "QTabBar::tab", "value": styles["QTabBar::tab"].border },
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
</script>

<template>
  <div class="w-full flex flex-col gap-2">
    <button @click="resetStyles" class="w-fit flex flex-nowrap items-center gap-4 rounded-md py-2 pl-2 pr-3 transition-[background-color] hover:bg-catppuccin-800">
      <span class="i-lucide-rotate-ccw block size-6 text-gray-400" />
      <span class="block text-gray-400 font-medium">
        Reset Styles
      </span>
    </button>
    <div
      v-for="styleResetButton in styleResetButtons"
      :key="styleResetButton.selector"
      class="flex flex-nowrap items-center"
    >
      <input
        type="checkbox"
        :id="`${styleResetButton.selector}Border`"
        :checked="styleResetButton.value"
        @input="() => toggleButton(styleResetButton.selector)"
      />
      <label :for="`${styleResetButton.selector}Border`">
        Reset {{ styleResetButton.label }} style
      </label>
    </div>
  </div>
</template>