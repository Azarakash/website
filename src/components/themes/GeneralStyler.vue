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
    <button class="w-fit" @click="resetStyles">
      Reset all styles
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