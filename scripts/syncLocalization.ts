// call the localizely api to get the latest translations
// save them to the messages/[locale].json files

import dotenv from "dotenv";
import JSZip from "jszip";
import fs from "node:fs/promises";
import path from "node:path";

dotenv.config();

interface NestedObject {
  [key: string]: string | NestedObject;
}

function createNestedObject(flatObject: Record<string, string>): NestedObject {
  const result: NestedObject = {};

  for (const [key, value] of Object.entries(flatObject)) {
    const parts = key.split(".");
    let current = result;

    // Navigate through the parts, creating nested objects as needed
    for (let i = 0; i < parts.length - 1; i++) {
      const part = parts[i];
      // If the current level doesn't exist or is a string, create a new object
      if (!current[part] || typeof current[part] === "string") {
        current[part] = {};
      }
      // We know this must be a NestedObject now
      current = current[part] as NestedObject;
    }

    // Set the final value
    const lastPart = parts[parts.length - 1];
    current[lastPart] = value;
  }

  return result;
}

async function downloadTranslations(url: string, apiKey: string) {
  const response = await fetch(url, {
    headers: {
      "X-API-Token": apiKey,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to download translations: ${response.statusText}`);
  }

  return response.arrayBuffer();
}

// Main execution
const supportedLocales = process.env.SUPPORTED_LOCALES?.split(",") || [];
const apiKey = process.env.LOCALIZELY_API_KEY ?? "";
const url = `${process.env.LOCALIZELY_URL}/projects/${process.env.LOCALIZELY_PROJECT_ID}/files/download?type=json&export_empty_as=main`;

try {
  // Download and extract zip
  const zipBuffer = await downloadTranslations(url, apiKey);
  const jszip = new JSZip();
  const zipContent = await jszip.loadAsync(zipBuffer);

  // Process each file in the zip
  for (const [filename, file] of Object.entries(zipContent.files)) {
    if (file.dir) continue;

    const locale = filename.split(".")[0]; // e.g., "en" from "en.json"

    // Skip if the locale is not supported
    if (!supportedLocales.includes(locale)) continue;

    // Read and parse the translation file
    const content = await (file as JSZip.JSZipObject).async("string");
    const flattenedJson = JSON.parse(content) as Record<string, string>;
    const nestedJson = createNestedObject(flattenedJson);

    // Save the translations
    const messagesDir = path.join(process.cwd(), "messages");
    await fs.mkdir(messagesDir, { recursive: true });

    await fs.writeFile(path.join(messagesDir, `${locale}.json`), JSON.stringify(nestedJson, null, 2), "utf-8");
    console.log(`✓ Saved translations for locale: ${locale}`);
  }

  console.log("✨ Localization sync completed successfully");
} catch (error) {
  console.error("Failed to sync translations:", error);
  process.exit(1);
}
