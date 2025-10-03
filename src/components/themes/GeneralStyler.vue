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

function toggleLayoutBorder() {
  modifyStyles({
    ...styles,
    "LayoutBorder": !styles.LayoutBorder,
  });
}
function toggleAccentHandlers() {
  modifyStyles({
    ...styles,
    "QObject::handle": !styles["QObject::handle"],
  });
}
function toggleSettingsViewStyles() {
  modifyStyles({
    ...styles,
    "QTabWidget::tab-bar": {
      ...styles["QTabWidget::tab-bar"],
      // 'true' means custom, so the value should be '? 8 : 0', but we are inverting it
      "left": styles["QTabWidget::pane"].border ? 0 : 8,
    },
    "QTabWidget::pane": {
      ...styles["QTabWidget::pane"],
      "border": !styles["QTabWidget::pane"].border,
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
    <div class="flex flex-nowrap items-center">
      <input
        id="layoutBorder"
        type="checkbox"
        :checked="styles.LayoutBorder"
        @input="toggleLayoutBorder"
      />
      <label for="layoutBorder">
        Remove main window borders
      </label>
    </div>
    <div class="flex flex-nowrap items-center">
      <input
        id="accentHandlers"
        type="checkbox"
        :checked="styles['QObject::handle']"
        @input="toggleAccentHandlers"
      />
      <label for="accentHandlers">
        Make toolbar handlers accent colored
      </label>
    </div>
    <div class="flex flex-nowrap items-center">
      <input
        id="tabWidgetPane"
        type="checkbox"
        :checked="styles['QTabWidget::pane'].border"
        @input="toggleSettingsViewStyles"
      />
      <label for="tabWidgetPane">
        Reset tab widgets wrapper style
      </label>
    </div>
  </div>
</template>