// Generates slides/index.json — a manifest of all decks with their metadata,
// scraped from each deck's index.html. The manifest is consumed by
// bluprince13.com/slides to render an index of all decks.
//
// Run from the repo root after adding or editing a deck, and commit the result:
//   node scripts/build-manifest.mjs

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SLIDES_DIR = 'slides'
const OUT_FILE = join(SLIDES_DIR, 'index.json')

// Shared infrastructure and non-deck directories
const EXCLUDE = new Set(['reveal.js', 'css', 'plugins', 'template', 'demo'])

const BANNER_CANDIDATES = ['banner.png', 'banner.jpg', 'banner.webp']
    .flatMap(f => [f, `images/${f}`, `assets/${f}`])

const getMeta = (html, name) =>
    html.match(new RegExp(`<meta\\s+name="${name}"\\s+content="([^"]*)"`))?.[1] ?? null

// First local image referenced by the deck, checking index.html then
// index.md. Matches both raw <img> tags and markdown images, in document
// order, so a title-slide logo wins over later diagrams.
const findDeckImage = slug => {
    const sources = []
    for (const file of ['index.html', 'index.md']) {
        const path = join(SLIDES_DIR, slug, file)
        if (!existsSync(path)) continue
        const content = readFileSync(path, 'utf8')
        sources.push(
            ...[...content.matchAll(/<img[\s\S]*?src="([^"]+)"|!\[[^\]]*\]\(([^)\s]+)\)/g)]
                .map(m => m[1] ?? m[2])
        )
    }
    return sources
        .map(src => src.replace(/^\.\//, ''))
        .find(src => !src.startsWith('http') && !src.startsWith('..') && existsSync(join(SLIDES_DIR, slug, src)))
}

const decks = readdirSync(SLIDES_DIR, { withFileTypes: true })
    .filter(entry => entry.isDirectory() && !EXCLUDE.has(entry.name))
    .filter(entry => existsSync(join(SLIDES_DIR, entry.name, 'index.html')))
    .map(({ name: slug }) => {
        const html = readFileSync(join(SLIDES_DIR, slug, 'index.html'), 'utf8')
        const banner =
            BANNER_CANDIDATES.find(f => existsSync(join(SLIDES_DIR, slug, f))) ??
            findDeckImage(slug)
        return {
            slug,
            title: html.match(/<title>(.*?)<\/title>/s)?.[1].trim() ?? slug,
            description: getMeta(html, 'description'),
            author: getMeta(html, 'author'),
            banner: banner ? `/slides/${slug}/${banner}` : null,
            date: getMeta(html, 'date')
        }
    })
    .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? ''))

writeFileSync(OUT_FILE, JSON.stringify({ decks }, null, 4) + '\n')
console.log(`Wrote ${OUT_FILE} with ${decks.length} decks:`)
decks.forEach(d => console.log(`  ${d.date ?? '????-??-??'}  ${d.slug}`))
