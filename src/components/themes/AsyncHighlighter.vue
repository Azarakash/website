<script setup lang="ts">
import { VueCodeHighlighterMulti } from "vue-code-highlighter";

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
</script>

<template>
  <div class="select-text">
    <VueCodeHighlighterMulti
      :key="code.key"
      :code="code.data"
    />
  </div>
</template>