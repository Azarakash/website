<script setup lang="ts">
const {
  layoutBorder,
  toggleLayoutBorder,
  accentHandlers,
  toggleAccentHandlers,
  tabWidgetPane,
  toggleTabWidgetPane,
  resetStyles,
} = defineProps<{
  "layoutBorder"        : boolean;
  "toggleLayoutBorder"  : () => void;
  "accentHandlers"      : boolean;
  "toggleAccentHandlers": () => void;
  "tabWidgetPane"       : boolean;
  "toggleTabWidgetPane" : () => void;
  "resetStyles"         : () => void;
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
        :checked="layoutBorder"
        @input="toggleLayoutBorder"
      />
      <label for="layoutBorder">
        Toggle
      </label>
    </div>
    <div class="flex flex-nowrap items-center">
      <input
        id="accentHandlers"
        type="checkbox"
        :checked="accentHandlers"
        @input="toggleAccentHandlers"
      />
      <label for="accentHandlers">
        Toggle
      </label>
    </div>
    <div class="flex flex-nowrap items-center">
      <input
        id="tabWidgetPane"
        type="checkbox"
        :checked="tabWidgetPane"
        @input="toggleTabWidgetPane"
      />
      <label for="tabWidgetPane">
        Toggle
      </label>
    </div>
  </div>
</template>