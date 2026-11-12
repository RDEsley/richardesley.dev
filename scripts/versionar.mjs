#!/usr/bin/env node
/**
 * versionar.mjs - Carimba ?v=<hash> nos CSS e JS locais.
 *
 * O servidor manda cachear CSS e JS por 7 dias. Quando um arquivo muda mas o nome continua
 * igual, navegadores que já o tinham (o do Instagram, por exemplo) misturam HTML novo com
 * CSS antigo. Com o hash do conteúdo na URL, qualquer mudança vira uma URL nova.
 *
 * Uso: node scripts/versionar.mjs   (rode antes de cada commit que mexa em CSS ou JS)
 *      node scripts/versionar.mjs --check   (só confere; sai com erro se algo estiver defasado)
 */
import { createHash } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const checkOnly = process.argv.includes("--check");
let stale = 0;

const hash = (file) => createHash("sha256").update(readFileSync(file)).digest("hex").slice(0, 10);

function write(file, text) {
  if (readFileSync(file, "utf8") === text) return;
  stale++;
  console.log(`${checkOnly ? "defasado" : "atualizado"}: ${relative(root, file).split(sep).join("/")}`);
  if (!checkOnly) writeFileSync(file, text);
}

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (name === ".git" || name === "node_modules") return [];
    if (statSync(path).isDirectory()) return htmlFiles(path);
    return name.endsWith(".html") ? [path] : [];
  });
}

// 1. @import do main.css: cada arquivo importado recebe o hash do próprio conteúdo.
const mainCss = join(root, "src/styles/main.css");
write(
  mainCss,
  readFileSync(mainCss, "utf8").replace(
    /@import\s+"([^"?]+)(?:\?v=[0-9a-f]+)?";/g,
    (_, href) => `@import "${href}?v=${hash(join(root, "src/styles", href))}";`,
  ),
);

// 2. Páginas HTML: href/src locais de .css e .js recebem o hash (main.css já com os imports).
const ref = /\b(href|src)="((?:\.\.\/)*(?!https?:|\/\/)[^"?#]+\.(?:css|js))(?:\?v=[0-9a-f]+)?"/g;
for (const file of htmlFiles(root)) {
  const text = readFileSync(file, "utf8").replace(ref, (all, attr, href) => {
    const target = resolve(dirname(file), href);
    return `${attr}="${href}?v=${hash(target)}"`;
  });
  write(file, text);
}

if (checkOnly && stale) {
  console.error(`${stale} arquivo(s) com versão defasada. Rode: node scripts/versionar.mjs`);
  process.exit(1);
}
console.log(stale ? `${stale} arquivo(s) ${checkOnly ? "defasados" : "atualizados"}.` : "Versões em dia.");
