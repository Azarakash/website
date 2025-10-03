<script setup lang="ts">
import { DefaultColors } from "@/constants/customization.ts";
import { computed } from "vue";

const { code } = defineProps<{
  "code": string;
}>();
const parsed = computed((): {
  "colors" : typeof DefaultColors & Record<"fadeAmount", number> & Record<"fadeColor", string>;
  "name"   : string;
  "widgets": string;
} => {
  try {
    // we already validated everything before this point
    return JSON.parse(code) as ({
      "colors" : typeof DefaultColors & Record<"fadeAmount", number> & Record<"fadeColor", string>;
      "name"   : string;
      "widgets": string;
    });
  } catch (error: unknown) {
    console.error("Couldn't parse the provided code in JsonColorize.vue. Really?", error);

    return {
      "colors" : { ...DefaultColors, "fadeAmount": 0.5, "fadeColor": "#000000" },
      "name"   : "A Custom Theme <0000>",
      "widgets": "Fusion",
    };
  }
});
</script>

<template>
  <div class="select-text p-4 text-sm text-[#9399b2] font-mono">
    <div class="text-[#f38ba8]">
      <span>{</span>
    </div>
    <div class="whitespace-pre-wrap">
      <span>
        {{ "  \"" }}
      </span>
      <span class="text-[#89b4fa]">
        {{ "colors" }}
      </span>
      <span>
        {{ "\":" }}
      </span>
      <span class="text-[#fab370]">
        {{ " {" }}
      </span>
    </div>
    <div
      v-for="([key, value], index) in Object.entries(parsed.colors)"
      :key="key"
      class="whitespace-pre-wrap"
    >
      <span>
        {{ "    \"" }}
      </span>
      <span class="text-[#89b4fa]">
        {{ key }}
      </span>
      <span>
        {{ "\":" }}
      </span>
      <span class="text-[#a6e3a1]">
        {{ " " + JSON.stringify(value) }}
      </span>
      <span v-if="index !== Object.keys(parsed.colors).length - 1">
        {{ "," }}
      </span>
      <span v-if="typeof value === 'string'" class="ml-2 inline-block size-3 border align-sub" :style="{ background: value }" />
    </div>
    <div class="whitespace-pre-wrap">
      <span class="text-[#fab370]">
        {{ "  }" }}
      </span>
      <span>
        {{ "," }}
      </span>
    </div>
    <div class="whitespace-pre-wrap">
      <span>
        {{ "  \"" }}
      </span>
      <span class="text-[#89b4fa]">
        {{ "name" }}
      </span>
      <span>
        {{ "\":" }}
      </span>
      <span class="text-[#a6e3a1]">
        {{ " " + JSON.stringify(parsed.name) }}
      </span>
      <span>
        {{ "," }}
      </span>
    </div>
    <div class="whitespace-pre-wrap">
      <span>
        {{ "  \"" }}
      </span>
      <span class="text-[#89b4fa]">
        {{ "widgets" }}
      </span>
      <span>
        {{ "\":" }}
      </span>
      <span class="text-[#a6e3a1]">
        {{ " " + JSON.stringify(parsed.widgets) }}
      </span>
    </div>
    <div class="text-[#f38ba8]">
      <span>}</span>
    </div>
  </div>
</template>