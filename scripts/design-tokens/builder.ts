import { rmSync } from 'fs'
import { kebabCase } from 'lodash-es'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import StyleDictionary from 'style-dictionary'
import { createCssFormat } from './_css-format.ts'
import { createTsFormat } from './_ts-format.ts'

const FORMAT_NAME__CSS = 'css/ds-format'
const FORMAT_NAME__TS = 'ts/ds-format'

const [, , srcFile, outDir] = process.argv
const rootDir = path.resolve(import.meta.dirname, '../..')
const srcPath = path.resolve(rootDir, srcFile)
const outPath = path.resolve(rootDir, outDir)
const { default: tokensJson } = await import(pathToFileURL(srcPath).href)

// Clear folder
rmSync(outDir, { recursive: true, force: true })

const sd = new StyleDictionary({
  tokens: tokensJson,
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: outPath,
      options: { outputReferences: true },
      files: Object.keys(tokensJson).map((name: string) => ({
        destination: `${kebabCase(name)}.css`,
        format: FORMAT_NAME__CSS,
        filter: (token) => token.path[0] === name,
      })),
    },
    ts: {
      transformGroup: 'css',
      buildPath: outPath,
      options: { outputReferences: false },
      files: Object.keys(tokensJson).map((name: string) => ({
        destination: `${kebabCase(name)}.ts`,
        format: FORMAT_NAME__TS,
        filter: (token) => token.path[0] === name,
      })),
    },
  },
  log: { verbosity: 'verbose', warnings: 'disabled' },
})

sd.registerFormat({ ...createCssFormat(), name: FORMAT_NAME__CSS })
sd.registerFormat({ ...createTsFormat(sd), name: FORMAT_NAME__TS })

await sd.buildAllPlatforms()
