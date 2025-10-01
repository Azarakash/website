<script setup lang="ts">
import { ref } from "vue";
import { CustomizationTabs, DefaultColors } from "@/constants/customization.ts";
import ColorGenerator from "@/components/themes/ColorGenerator.vue";
import GeneralStyler from "@/components/themes/GeneralStyler.vue";
import ButtonsStyler from "@/components/themes/ButtonsStyler.vue";
import InputsStyler from "@/components/themes/InputsStyler.vue";
import OthersStyler from "@/components/themes/OthersStyler.vue";
import LauncherThemed from "@/components/themes/windows/LauncherThemed.vue";
import SettingsThemed from "@/components/themes/windows/SettingsThemed.vue";
import { saveAs } from "file-saver";
import JSZip from "jszip";

const selected = ref<typeof CustomizationTabs[number]["Key"]>("colors");
const colors = ref<typeof DefaultColors>({ ...DefaultColors });

function selectColor({
  key,
  color,
}: {
  "key"  : keyof typeof DefaultColors;
  "color": typeof DefaultColors[keyof typeof DefaultColors];
}) {
  colors.value[key] = color;
}
function resetColors() {
  colors.value = { ...DefaultColors };
}

function downloadTheme() {
  const zip = new JSZip;
  const randomKey = Math.floor(Math.random() * 10_000);
  const folder = zip.folder(`customTheme${randomKey}`);

  if (!folder) {
    return;
  }

  folder.file("themeStyle.css", "/* WIP */");
  folder.file("theme.json", JSON.stringify({
    "colors": {
      ...colors.value,
      "fadeAmount": 0.5,
      "fadeColor" : "#000000",
    },
    "name"   : `A Custom Theme <${randomKey}>`,
    "widgets": "Fusion",
  }, null, 2));

  zip.generateAsync({ "type": "blob" }).then(content => {
    saveAs(content, `customTheme${randomKey}.zip`);
  });
}
</script>

<template>
  <div class="mx-auto my-12 max-w-240 flex flex-col gap-4 px-4">
    <!-- @touch*.stop prevents mobile swipes -->
    <div
      @touchstart.stop
      @touchmove.stop
      @touchend.stop
      class="relative w-full flex flex-wrap gap-0 overflow-x-auto rounded-md bg-catppuccin-900 sm:flex-nowrap"
    >
      <div class="flex shrink-0 gap-0 sm:flex-col">
        <button
          @click="selected = tab.Key"
          v-for="tab in CustomizationTabs"
          :key="tab.Key"
          :aria-label="tab.Name"
          :title="tab.Name"
          class="group px-4 py-2 first:pt-4"
        >
          <span
            :class="[
              'grid size-10 place-items-center rounded-md transition-[background-color]',
              'group-hover:bg-catppuccin-800',
              selected === tab.Key
                ? 'bg-catppuccin-800'
                : 'bg-catppuccin-900',
            ]"
          >
            <span :class="['block size-6', tab.Icon]" />
          </span>
        </button>
      </div>
      <div class="w-full flex flex-col gap-4 py-4 pl-4 pr-4 sm:pl-0">
        <button @click="downloadTheme" class="w-fit rounded-md p-3 leading-none transition-[background-color] hover:bg-catppuccin-800">
          Download
        </button>
        <ColorGenerator
          v-if="selected === 'colors'"
          :colors="colors"
          :set-color="selectColor"
          :reset-colors="resetColors"
        />
        <GeneralStyler v-else-if="selected === 'general'" />
        <ButtonsStyler v-else-if="selected === 'buttons'" />
        <InputsStyler v-else-if="selected === 'inputs'" />
        <OthersStyler v-else />
        <LauncherThemed
          :highlight="colors.Highlight"
          :highlighted-text="colors.HighlightedText"
          :button-text="colors.ButtonText"
          :background="colors.Window"
          :background-text="colors.WindowText"
          :text="colors.Text"
          :base="colors.Base"
          :tooltip-base="colors.ToolTipBase"
          :tooltip-text="colors.ToolTipText"
        />
        <SettingsThemed
          :highlight="colors.Highlight"
          :highlight-text="colors.HighlightedText"
          :background="colors.Window"
          :button-color="colors.Button"
          :background-text="colors.WindowText"
          :text="colors.Text"
          :base="colors.Base"
        />
      </div>
    </div>
  </div>
</template>