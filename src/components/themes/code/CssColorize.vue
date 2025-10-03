<script setup lang="ts">
import { computed } from "vue";

const { code } = defineProps<{
  "code": string;
}>();

const lines = computed(() => code.split("\n"));
</script>

<template>
  <div class="select-text p-4 text-sm text-[#9399b2] font-mono">
    <div v-for="(line, index) in lines" :key="`${line}-${index}`" class="whitespace-pre-wrap">
      <!-- Comments -->
      <span v-if="line.startsWith('/*')">
        {{ line }}
      </span>
      <!-- Empty lines -->
      <span v-else-if="line === ''">
        {{ "\n" }}
      </span>
      <!-- Properties -->
      <template v-else-if="line.startsWith('  ')">
        <span class="text-[#7bb4fa]">
          {{ line.split(":")[0] }}
        </span>
        <span class="text-[#94e2d5]">
          {{ ":" }}
        </span>
        <!-- Property value -->
        <span class="text-[#fab387]">
          {{ line.split(":")[1].split(";")[0] }}
        </span>
        <span>
          {{ ";" }}
        </span>
        <span
          v-if="line.split(':')[1].split(';')[0].startsWith(' rgba')"
          class="ml-2 inline-block size-3 border align-sub"
          :style="{ background: line.split(':')[1].split(';')[0] }"
        ></span>
      </template>
      <!-- Selectors properties end -->
      <span v-else-if="line === '}'" class="text-[#f38ba8]">
        {{ line }}
      </span>
      <!-- Selector properties start -->
      <template v-else-if="line.endsWith('{')">
        <span class="text-[#cdd6f4]">
          {{ line.split("{")[0] }}
        </span>
        <span class="text-[#f38ba8]">
          {{ "{" }}
        </span>
      </template>
      <!-- Probably selectors listing start -->
      <template v-else>
        <span class="text-[#cdd6f4]">
          {{ line.split(",")[0] }}
        </span>
        <span>
          {{ "," }}
        </span>
      </template>
    </div>
  </div>
</template>