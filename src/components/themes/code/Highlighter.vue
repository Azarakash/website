<script setup lang="ts">
import { computed, ref } from "vue";
import { useClipboard } from "@vueuse/core";
import JsonColorize from "@/components/themes/code/JsonColorize.vue";
import CssColorize from "@/components/themes/code/CssColorize.vue";

const { code } = defineProps<{
  "code": {
    "key" : number;
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

const { copy, copied, isSupported } = useClipboard();

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
    <div class="w-full flex flex-wrap justify-between bg-catppuccin-700">
      <div class="flex shrink-0 flex-wrap">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="selected = tab"
          @mousedown="selected = tab"
          :class="[
          'px-4 py-2 text-sm transition-[background-color,color]',
          selected === tab
            ? 'bg-white text-black'
            : 'text-white hover:bg-catppuccin-600',
        ]"
        >
          {{ tab }}
        </button>
      </div>
      <button
        aria-label="Copy current tab code"
        v-if="isSupported"
        @click="() => copy(current.code)"
        class="grid size-9 shrink-0 place-items-center transition-[background-color] hover:bg-catppuccin-600"
      >
        <span v-if="copied" class="i-lucide-copy-check size-4" />
        <span v-else class="i-lucide-copy size-4" />
      </button>
    </div>
    <JsonColorize v-if="selected === 'theme.json'" :code="current.code" />
    <CssColorize v-else :code="current.code" />
  </div>
</template>