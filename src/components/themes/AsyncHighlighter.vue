<script setup lang="ts">
import { computed, ref } from "vue";

const { code } = defineProps<{
  "code": {
    "key" : string;
    "data": Array<{
      "lang" : string;
      "title": string;
      "code" : string;
    }>;
  };
}>();
const tabs = computed(() => {
  return code.data.map(({ title }) => title);
});

const selected = ref<string>(tabs.value[0]);
const current = computed(() => {
  const found = code.data.find(({ title }) => title === selected.value);

  if (!found) {
    return code.data[0];
  }

  return found;
});
</script>

<template>
  <div class="relative h-fit flex shrink-0 flex-col overflow-hidden rounded-md bg-catppuccin-800">
    <div class="w-full flex flex-wrap bg-catppuccin-700">
      <button
        v-for="tab in tabs"
        :key="tab"
        @click="selected = tab"
        @mousedown="selected = tab"
        :class="[
          'px-4 py-2 text-sm',
          selected === tab
            ? 'bg-white text-black'
            : 'text-white',
        ]"
      >
        {{ tab }}
      </button>
    </div>
    <div class="select-text whitespace-pre-wrap p-4 text-sm font-mono">
      {{ current.code }}
    </div>
  </div>
</template>