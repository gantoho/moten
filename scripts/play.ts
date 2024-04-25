#!/usr/bin/env zx

import 'zx/globals'

const [vueVersion = 'vue3'] = process.argv.slice(3)

await $`pnpm -F @moten/ui build`
await $`pnpm -F @moten/playground-${vueVersion} dev` // pnpm -F @moten/playground-vue3 dev
