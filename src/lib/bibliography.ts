import { readFileSync } from "node:fs";

export type BibliographyEntry = {
  key: string;
  type: string;
  title: string;
  author?: string;
  year?: string;
  journal?: string;
  booktitle?: string;
  publisher?: string;
  doi?: string;
  url?: string;
};

let bibliographyCache: Map<string, BibliographyEntry> | undefined;

export function extractCitationKeys(markdown: string) {
  const keys = new Set<string>();
  const citationPattern = /\[@([^\]]+)\]/g;
  let match: RegExpExecArray | null;

  while ((match = citationPattern.exec(markdown)) !== null) {
    for (const rawKey of match[1].split(";")) {
      const key = rawKey.trim().replace(/^@/, "");
      if (key) {
        keys.add(key);
      }
    }
  }

  return [...keys];
}

export function getBibliography() {
  if (bibliographyCache) {
    return bibliographyCache;
  }

  const bibtex = readFileSync(
    "src/data/references.bib",
    "utf-8"
  );
  const parsed = parseBibtex(bibtex);

  bibliographyCache = new Map(
    parsed.map((entry) => {
      const normalized: BibliographyEntry = {
        key: entry.key,
        type: entry.type,
        title: cleanBibtexValue(entry.fields.title) ?? entry.key,
        author: cleanBibtexValue(entry.fields.author),
        year: cleanBibtexValue(entry.fields.year),
        journal: cleanBibtexValue(entry.fields.journal),
        booktitle: cleanBibtexValue(entry.fields.booktitle),
        publisher: cleanBibtexValue(entry.fields.publisher),
        doi: cleanBibtexValue(entry.fields.doi),
        url: cleanBibtexValue(entry.fields.url)
      };

      return [entry.key, normalized];
    })
  );

  return bibliographyCache;
}

export function getEntriesForKeys(keys: string[]) {
  const bibliography = getBibliography();

  return keys.map((key) => {
    return (
      bibliography.get(key) ?? {
        key,
        type: "missing",
        title: key
      }
    );
  });
}

export function formatCitationLabel(entry: BibliographyEntry) {
  const author = entry.author ? getShortAuthor(entry.author) : entry.key;
  return entry.year ? `${author} ${entry.year}` : author;
}

export function formatReference(entry: BibliographyEntry) {
  const parts = [
    entry.author,
    entry.year ? `(${entry.year}).` : undefined,
    entry.title,
    entry.journal ?? entry.booktitle ?? entry.publisher
  ].filter(Boolean);

  return parts.join(" ");
}

function cleanBibtexValue(value?: string) {
  return value
    ?.replace(/[{}]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBibtex(input: string) {
  const entries: Array<{
    key: string;
    type: string;
    fields: Record<string, string>;
  }> = [];
  const entryPattern = /@(\w+)\s*\{\s*([^,]+),([\s\S]*?)(?=\n\s*@|\s*$)/g;
  let entryMatch: RegExpExecArray | null;

  while ((entryMatch = entryPattern.exec(input)) !== null) {
    const [, type, key, body] = entryMatch;
    const fields: Record<string, string> = {};
    const fieldPattern =
      /(\w+)\s*=\s*(?:\{((?:[^{}]|\{[^{}]*\})*)\}|"([^"]*)"|([^,\n]+))/g;
    let fieldMatch: RegExpExecArray | null;

    while ((fieldMatch = fieldPattern.exec(body)) !== null) {
      const [, field, braced, quoted, bare] = fieldMatch;
      fields[field.toLowerCase()] = braced ?? quoted ?? bare ?? "";
    }

    entries.push({
      key: key.trim(),
      type: type.toLowerCase(),
      fields
    });
  }

  return entries;
}

function getShortAuthor(author: string) {
  const authors = author.split(/\s+and\s+/i).map((name) => name.trim());
  const first = authors[0] ?? "";
  const surname = first.includes(",")
    ? first.split(",")[0].trim()
    : first.split(/\s+/).at(-1);

  return authors.length > 1 ? `${surname} et al.` : surname ?? first;
}
