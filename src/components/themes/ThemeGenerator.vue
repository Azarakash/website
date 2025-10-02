<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from "vue";
import { CustomizationTabs, DefaultColors, DefaultCSS } from "@/constants/customization.ts";
import ColorGenerator from "@/components/themes/ColorGenerator.vue";
import GeneralStyler from "@/components/themes/GeneralStyler.vue";
import ButtonsStyler from "@/components/themes/ButtonsStyler.vue";
import InputsStyler from "@/components/themes/InputsStyler.vue";
import OthersStyler from "@/components/themes/OthersStyler.vue";
import LauncherThemed from "@/components/themes/windows/LauncherThemed.vue";
import SettingsThemed from "@/components/themes/windows/SettingsThemed.vue";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import "vue-code-highlighter/dist/style.css";
import { transformToCss } from "@/lib/helpers/transform-to-css.ts";
import HighlighterLoading from "@/components/themes/HighlighterLoading.vue";
import { readImportedColors } from "@/lib/helpers/read-imported-colors.ts";

const AsyncHighlighter = defineAsyncComponent({
  "loader"          : () => import("@/components/themes/AsyncHighlighter.vue"),
  "loadingComponent": HighlighterLoading,
});

const selected = ref<typeof CustomizationTabs[number]["Key"]>("colors");

const colors = ref<typeof DefaultColors>({ ...DefaultColors });
const styles = ref<typeof DefaultCSS>({ ...DefaultCSS });

const codeView = ref<boolean>(false);

const currentCode = computed(() => {
  return {
    // needed to re-render the code view component
    "key" : Math.random().toString(),
    "data": [
      {
        "lang" : "json",
        "title": "theme.json",
        "code" : JSON.stringify({
          "colors": {
            ...colors.value,
            "fadeAmount": 0.5,
            "fadeColor" : "#000000",
          },
          "name"   : `A Custom Theme <${Math.floor(Math.random() * 10_000)}>`,
          "widgets": "Fusion",
        }, null, 2),
      },
      {
        "lang" : "css",
        "title": "themeStyle.css",
        "code" : transformToCss(styles.value),
      },
    ],
  };
});

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

function toggleCSS() {
  styles.value.Enabled = !styles.value.Enabled;
  selected.value = "colors";
}
function downloadTheme() {
  const zip = new JSZip;
  const randomKey = Math.floor(Math.random() * 10_000);
  const folder = zip.folder(`customTheme${randomKey}`);

  if (!folder) {
    console.error("Couldn't create a folder for the theme zip");

    return;
  }

  folder.file("theme.json", currentCode.value.data[0].code);
  folder.file("themeStyle.css", currentCode.value.data[1].code);

  zip.generateAsync({ "type": "blob" }).then(content => {
    saveAs(content, `customTheme${randomKey}.zip`);
  });
}
function toggleCodeView() {
  codeView.value = !codeView.value;
}
async function handleImport(event: Event) {
  const importedColors = await readImportedColors({ event });

  if (importedColors === 0) {
    return;
  }

  colors.value = {
    ...colors.value,
    ...importedColors,
  };
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
          :disabled="tab.Key !== 'colors' && !styles.Enabled"
          class="group px-4 py-2 first:pt-4 disabled:opacity-60"
        >
          <span
            :class="[
              'grid size-10 place-items-center rounded-md transition-[background-color]',
              'group-hover:bg-catppuccin-800 group-disabled:group-hover:bg-transparent',
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
        <div class="flex flex-wrap gap-4">
          <button
            v-for="item in [
              { 'name': 'Toggle CSS', 'icon': 'i-lucide-brush',
                'action': toggleCSS, 'active': styles.Enabled },
              { 'name': 'Export', 'icon': 'i-lucide-share-2', 'action': downloadTheme, 'active': false },
              { 'name': 'Show JSON & CSS', 'icon': 'i-lucide-braces',
                'action': toggleCodeView, 'active': codeView },
            ]"
            :key="item.name"
            @click="item.action"
            :class="[
              'w-fit flex flex-nowrap items-center gap-4 rounded-md p-2 transition-[background-color]',
              item.active && 'bg-catppuccin-800',
            ]"
          >
            <span :class="[item.icon, 'block size-6']" />
            <span class="block text-white font-medium">
              {{ item.name }}
            </span>
          </button>
          <label for="import-colors" class="w-fit flex flex-nowrap cursor-pointer items-center gap-4 rounded-md p-2">
            <span class="i-lucide-import block size-6" />
            <span class="block text-white font-medium">
              Import Colors
            </span>
          </label>
          <input
            id="import-colors"
            type="file"
            accept="application/json"
            @change="handleImport"
            class="invisible"
          />
        </div>
        <div class="select-text">
          <AsyncHighlighter v-if="codeView" :code="currentCode" />
        </div>
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