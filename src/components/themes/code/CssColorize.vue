<script setup lang="ts">
const { code } = defineProps<{
  "code": string;
}>();
</script>

<template>
  <div class="select-text whitespace-pre-wrap p-4 text-sm text-[#9399b2] font-mono">
    {{ code }}
  </div>
</template>