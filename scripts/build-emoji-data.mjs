import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectDirectory = path.resolve(scriptDirectory, "..");
const sourcePath = path.join(projectDirectory, "data", "unicode-emoji-test.txt");
const outputPath = path.join(projectDirectory, "unicode-expressions.js");
const source = fs.readFileSync(sourcePath, "utf8");

function decodeXml(value) {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, decimal) => String.fromCodePoint(Number(decimal)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&");
}

function readAnnotations(relativePath, annotationMap) {
  const xml = fs.readFileSync(path.join(projectDirectory, relativePath), "utf8");
  const annotationPattern = /<annotation\s+([^>]*\bcp="([^"]+)"[^>]*)>([\s\S]*?)<\/annotation>/g;
  let match;

  while ((match = annotationPattern.exec(xml)) !== null) {
    const attributes = match[1];
    const character = decodeXml(match[2]);
    const text = decodeXml(match[3].replace(/<[^>]+>/g, "").trim());
    if (!text || text === "↑↑↑") {
      continue;
    }

    const record = annotationMap.get(character) || { shortName: "", keywords: [] };
    if (/\btype="tts"/.test(attributes)) {
      record.shortName = text;
    } else {
      record.keywords.push(...text.split("|").map((keyword) => keyword.trim()).filter(Boolean));
    }
    annotationMap.set(character, record);
  }
}

const annotations = new Map();
readAnnotations(path.join("data", "common", "annotations", "en.xml"), annotations);
readAnnotations(path.join("data", "common", "annotationsDerived", "en.xml"), annotations);

let group = "Other";
let subgroup = "Other";
const expressions = [];

for (const rawLine of source.split(/\r?\n/)) {
  const line = rawLine.trim();
  if (line.startsWith("# group:")) {
    group = line.slice("# group:".length).trim();
    continue;
  }
  if (line.startsWith("# subgroup:")) {
    subgroup = line.slice("# subgroup:".length).trim();
    continue;
  }
  if (!line || line.startsWith("#") || !line.includes("fully-qualified")) {
    continue;
  }

  const [data, comment = ""] = line.split("#");
  const [codePointText] = data.split(";");
  const codePoints = codePointText.trim().split(/\s+/);
  const commentMatch = comment.trim().match(/^(\S+)\s+E([0-9.]+)\s+(.+)$/);
  if (!commentMatch) {
    continue;
  }

  const [, character, emojiVersion, name] = commentMatch;
  const annotation = annotations.get(character);
  const id = codePoints.map((value) => value.toLowerCase()).join("-");
  expressions.push({
    id: "unicode-" + id,
    character,
    name: annotation?.shortName || name,
    group,
    subgroup,
    emojiVersion,
    codePoints: codePoints.map((value) => "U+" + value),
    keywords: [...new Set(annotation?.keywords || [])]
  });
}

const banner = [
  "// Generated from Unicode Emoji 17.0 emoji-test.txt.",
  "// Source: https://www.unicode.org/Public/emoji/latest/emoji-test.txt",
  "// Names and keywords use English CLDR 48 annotations.",
  "// Rebuild with: node scripts/build-emoji-data.mjs",
  ""
].join("\n");

fs.writeFileSync(
  outputPath,
  banner + "const UNICODE_EXPRESSIONS = " + JSON.stringify(expressions, null, 2) + ";\n",
  "utf8"
);

console.log(`Generated ${expressions.length} fully-qualified Unicode expressions.`);
