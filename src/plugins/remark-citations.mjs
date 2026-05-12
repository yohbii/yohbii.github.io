import { readFileSync } from "node:fs";
import { visit } from "unist-util-visit";

const citationPattern = /\[@([^\]]+)\]/g;
let labels;

export default function remarkCitations() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || typeof index !== "number" || !citationPattern.test(node.value)) {
        citationPattern.lastIndex = 0;
        return;
      }

      citationPattern.lastIndex = 0;
      const children = [];
      let lastIndex = 0;
      let match;

      while ((match = citationPattern.exec(node.value)) !== null) {
        if (match.index > lastIndex) {
          children.push({
            type: "text",
            value: node.value.slice(lastIndex, match.index)
          });
        }

        const keys = match[1]
          .split(";")
          .map((key) => key.trim().replace(/^@/, ""))
          .filter(Boolean);

        children.push({ type: "text", value: "[" });

        keys.forEach((key, keyIndex) => {
          if (keyIndex > 0) {
            children.push({ type: "text", value: "; " });
          }

          children.push({
            type: "link",
            url: `#ref-${key}`,
            title: null,
            data: {
              hProperties: {
                className: ["citation"],
                ariaLabel: `Citation ${key}`
              }
            },
            children: [{ type: "text", value: getLabel(key) }]
          });
        });

        children.push({ type: "text", value: "]" });
        lastIndex = match.index + match[0].length;
      }

      if (lastIndex < node.value.length) {
        children.push({
          type: "text",
          value: node.value.slice(lastIndex)
        });
      }

      parent.children.splice(index, 1, ...children);
    });
  };
}

function getLabel(key) {
  labels ??= loadLabels();
  return labels.get(key) ?? key;
}

function loadLabels() {
  const path = new URL("../data/references.bib", import.meta.url);
  const bibtex = readFileSync(path, "utf-8");
  const entries = new Map();
  const entryPattern = /@\w+\s*\{\s*([^,]+),([\s\S]*?)(?=\n\s*@|\s*$)/g;
  let match;

  while ((match = entryPattern.exec(bibtex)) !== null) {
    const key = match[1].trim();
    const body = match[2];
    const author = getField(body, "author");
    const year = getField(body, "year");
    const surname = author ? getShortAuthor(author) : key;
    entries.set(key, year ? `${surname} ${year}` : surname);
  }

  return entries;
}

function getField(body, field) {
  const pattern = new RegExp(`${field}\\s*=\\s*[{\"]([^}\"]+)`, "i");
  return pattern.exec(body)?.[1]?.replace(/\s+/g, " ").trim();
}

function getShortAuthor(author) {
  const authors = author.split(/\s+and\s+/i).map((name) => name.trim());
  const first = authors[0] ?? "";
  const surname = first.includes(",")
    ? first.split(",")[0].trim()
    : first.split(/\s+/).at(-1);

  return authors.length > 1 ? `${surname} et al.` : surname ?? first;
}
