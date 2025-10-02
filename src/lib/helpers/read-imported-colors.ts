import type { DefaultColors } from "@/constants/customization.ts";

export async function readImportedColors({
  event,
}: {
  "event": Event;
}): Promise<typeof DefaultColors | 0> {
  /*
   * Not sure if it will work like supposed in every browser...
   *
   * if (
   *   event.target === null ||
   *   !("files" in event.target) ||
   *   typeof event.target.files !== "object" ||
   *   event.target.files === null ||
   *   !("0" in event.target.files)
   * ) {
   *   return;
   * }
   */
  if (event.target === null) {
    console.error("No file was imported (?)");

    return 0;
  }

  const target = event.target as Partial<{ "files": [Blob] }>;
  const file = target?.files?.[0];
  const content = await file?.text?.();

  if (!content) {
    console.error("No file was imported (?)");

    return 0;
  }

  try {
    const parsed: unknown = JSON.parse(content);

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("colors" in parsed)
    ) {
      console.error("Imported color scheme is not valid");

      return 0;
    }

    // Let's just believe in unknown input for once
    return parsed.colors as typeof DefaultColors;
  } catch (error: unknown) {
    console.error("Couldn't import a color scheme:", error);
  }

  return 0;
}