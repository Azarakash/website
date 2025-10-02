<script setup lang="ts">
import Image from "@/components/base/Image.vue";

const {
  highlight,
  highlightedText,
  buttonText,
  background,
  backgroundText,
  text,
  base,
  tooltipBase,
  tooltipText,
} = defineProps<{
  "highlight"      : string;
  "highlightedText": string;
  "buttonText"     : string;
  "background"     : string;
  "backgroundText" : string;
  "text"           : string;
  "base"           : string;
  "tooltipBase"    : string;
  "tooltipText"    : string;
}>();

const buttons = {
  "instance": [
    { "name": "Launch", "icon": "i-lucide-play" },
    { "name": "Kill", "icon": "i-lucide-x" },
    { "name": "Edit", "icon": "i-lucide-edit" },
    { "name": "Change Group", "icon": "i-lucide-bookmark" },
    { "name": "Folder", "icon": "i-lucide-folder" },
  ],
  "menu": [
    { "name": "Add Instance", "icon": "i-lucide-plus" },
    { "name": "Folders", "icon": "i-lucide-folder" },
    { "name": "Settings", "icon": "i-lucide-settings" },
    { "name": "Help", "icon": "i-lucide-circle-question-mark" },
    { "name": "Update", "icon": "i-lucide-cloud" },
  ],
};
</script>

<template>
  <div class="h-full min-w-84 w-full flex flex-col border-x border-[#7a7a7a]">
    <div
      class="flex flex-nowrap items-center justify-between border-t border-[#7a7a7a]"
      :style="{
        background: background,
        padding   : '4px',
      }"
    >
      <div class="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <div
          v-for="button in buttons.menu"
          :key="button.name"
          class="relative flex flex-nowrap items-center"
        >
          <div :class="['size-6', button.icon]" />
          <div
            class="text-xs"
            :style="{ color: buttonText }"
          >
            {{ button.name }}
          </div>
          <div
            v-if="button.name === 'Settings'"
            class="absolute left-0 top-7 select-text p-1 text-nowrap text-xs leading-none"
            :style="{
              background: tooltipBase,
              color     : tooltipText,
            }"
          >
            Change settings.
          </div>
        </div>
      </div>
      <div class="flex shrink-0 flex-nowrap items-center">
        <Image class-names="size-6" src="/skins/monochrome_steve.png" alt="" />
        <div
          class="text-xs"
          :style="{ color: buttonText }"
        >
          Accounts
        </div>
      </div>
    </div>
    <div
      class="flex flex-nowrap border-t border-[#7a7a7a]"
      :style="{ background: base }"
    >
      <div class="w-full flex flex-col gap-2 p-1">
        <div class="flex flex-nowrap items-center gap-1">
          <div
            class="i-lucide-chevron-down size-6 shrink-0"
            :style="{ color: text }"
          />
          <div
            class="shrink-0 text-xs font-bold"
            :style="{ color: text }"
          >
            Ungrouped
          </div>
          <div
            class="ml-1 h-[2px] w-full opacity-15"
            :style="{ background: text }"
          />
        </div>
        <div class="flex flex-wrap gap-2">
          <div
            v-for="version in ['1.16.5', '1.21.8']"
            :key="version"
            class="w-fit flex flex-col items-center gap-2"
          >
            <Image
              class-names="size-12"
              src="/assets/grass.svg"
              alt="Grass SVG icon"
            />
            <div
              class="grid w-24 place-items-center py-[5px] text-xs leading-none"
              :style="{
                background: version === '1.16.5' ? highlight : '#00000055',
                color     : version === '1.16.5' ? highlightedText : text,
              }"
            >
              {{ version }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="h-full w-39 flex flex-col items-center border-l border-[#7a7a7a]"
        :style="{ background: background }"
      >
        <Image class-names="size-20 mt-2" src="/assets/grass.svg" alt="Grass SVG icon" />
        <div
          class="py-2 text-xs leading-none"
          :style="{ color: buttonText }"
        >
          1.16.5
        </div>
        <div
          v-for="button in buttons.instance"
          :key="button.name"
          class="w-full flex flex-nowrap items-center justify-between p-1"
        >
          <div class="flex flex-nowrap items-center gap-1">
            <div :class="['size-4', button.icon]" />
            <div
              class="text-xs"
              :style="{ color: buttonText }"
            >
              {{ button.name }}
            </div>
          </div>
          <div v-if="button.name === 'Launch'" class="i-fluent-caret-down-16-filled size-3 bg-[#7a7a7a]"></div>
        </div>
        <div class="h-8 w-full" />
      </div>
    </div>
    <div
      class="flex flex-nowrap justify-between border-t border-[#7a7a7a] p-1"
      :style="{ background: background }"
    >
      <div class="flex flex-nowrap items-center gap-1">
        <div class="i-fluent-news-16-regular" />
        <p
          class="select-text text-sm"
          :style="{ color: buttonText }"
        >
          Freesm Launcher Release Sequoia 1.3.0, now available
        </p>
      </div>
      <div class="flex flex-nowrap items-center gap-1">
        <div class="i-fluent-news-16-regular" />
        <p
          class="select-text pr-4 text-sm"
          :style="{ color: buttonText }"
        >
          More news
        </p>
      </div>
    </div>
    <div
      class="flex flex-nowrap justify-between border-y border-[#7a7a7a] pt-1"
      :style="{ background: background }"
    >
      <p
        class="select-text px-1 text-sm"
        :style="{ color: backgroundText }"
      >
        No instance selected
      </p>
      <textarea
        disabled
        class="max-h-6 min-h-6 w-33 bg-transparent text-sm"
        :style="{ color: backgroundText }"
      >Total playtime: 0s</textarea>
    </div>
  </div>
</template>