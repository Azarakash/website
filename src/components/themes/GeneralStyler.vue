<script setup lang="ts">
import type { DefaultCSS } from "@/constants/customization.ts";
import { computed } from "vue";

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

const generalStylingButtons = computed(() => {
  return [
    {
      "id"    : "layoutBorder",
      "value" : styles.LayoutBorder,
      "action": toggleLayoutBorder,
      "label" : { "pre": "Remove toolbar borders", "highlighted": "" },
    },
    {
      "id"    : "accentHandlers",
      "value" : styles["QObject::handle"],
      "action": toggleAccentHandlers,
      "label" : { "pre": "Use accent color for", "highlighted": "QObject::handle" },
    },
    {
      "id"    : "tabWidgetPane",
      "value" : styles["QTabWidget::pane"].border,
      "action": toggleSettingsViewStyles,
      "label" : { "pre": "Customize", "highlighted": "QTabWidget" },
    },
  ] as const;
});
</script>

<template>
  <div class="grid cols-1 w-full gap-2 sm:cols-2">
    <button @click="resetStyles" class="w-fit flex flex-nowrap items-center gap-4 rounded-md py-2 pl-2 pr-3 transition-[background-color] hover:bg-catppuccin-800">
      <span class="i-lucide-rotate-ccw block size-6 text-gray-400" />
      <span class="block text-gray-400 font-medium">
        Reset Styles
      </span>
    </button>
    <div
      v-for="stylingButton in generalStylingButtons"
      :key="stylingButton.id"
      class="flex flex-nowrap items-center p-2"
    >
      <input
        type="checkbox"
        :id="stylingButton.id"
        :checked="stylingButton.value"
        @input="stylingButton.action"
        :class="[
        'shrink-0 size-6 appearance-none rounded-md cursor-pointer',
        stylingButton.value
          ? 'bg-white'
          : 'bg-catppuccin-700',
      ]"
      />
      <label :for="stylingButton.id" class="cursor-pointer pl-4 text-gray-400">
        <span>{{ stylingButton.label.pre }}</span>
        <span>{{ " " }}</span>
        <span class="text-white">{{ stylingButton.label.highlighted }}</span>
      </label>
    </div>
  </div>
</template>