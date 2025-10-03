<script setup lang="ts">
// eslint-disable-next-line unicorn/no-abusive-eslint
// eslint-disable-next-line
// @ts-ignore
import { HighCode } from "vue-highlight-code";
import "vue-highlight-code/dist/style.css";

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
    <HighCode
      v-for="file in code.data"
      :key="file.title"
      :code-value="file.code"
      :text-editor="false"
      :lang="file.lang"
      :lang-name="file.title"
    />
  </div>
</template>