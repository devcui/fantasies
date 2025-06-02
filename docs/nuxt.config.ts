import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'
import yaml from '@rollup/plugin-yaml'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    '@fantasies/ui',
    'nuxt-component-meta',
    'nuxt-og-image',
    'motion-v/nuxt',
    (_, nuxt) => {
      nuxt.hook('components:dirs', (dirs) => {
        dirs.unshift({ path: resolve('./app/components/content/examples'), pathPrefix: false, prefix: '', global: true })
      })
    }
  ],
  $development: {
    site: {
      url: 'http://localhost:3000'
    }
  },
  $production: {
    site: {
      url: 'https://fantasies-ui.vercel.app'
    }
  },
  devtools: {
    enabled: true
  },
  app: {
    head: {
      script: [{
        key: 'lmsqueezy-config',
        innerHTML: 'window.lemonSqueezyAffiliateConfig = { store: "nuxt" };'
      }, {
        key: 'lmsqueezy',
        src: 'https://lmsqueezy.com/affiliate.js',
        defer: true
      }]
    },
    rootAttrs: {
      'data-vaul-drawer-wrapper': '',
      'class': 'bg-default'
    }
  },
  css: ['~/assets/css/main.css'],
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['1c', '1c-query', 'abap', 'actionscript-3', 'ada', 'adoc', 'angular-html', 'angular-ts', 'apache', 'apex', 'apl', 'applescript', 'ara', 'asciidoc', 'asm', 'astro', 'awk', 'ballerina', 'bash', 'bat', 'batch', 'be', 'beancount', 'berry', 'bibtex', 'bicep', 'blade', 'bsl', 'c', 'cadence', 'cairo', 'cdc', 'clarity', 'clj', 'clojure', 'closure-templates', 'cmake', 'cmd', 'cobol', 'codeowners', 'codeql', 'coffee', 'coffeescript', 'common-lisp', 'console', 'coq', 'cpp', 'cql', 'crystal', 'cs', 'csharp', 'css', 'csv', 'cue', 'cypher', 'd', 'dart', 'dax', 'desktop', 'diff', 'docker', 'dockerfile', 'dotenv', 'dream-maker', 'edge', 'elisp', 'elixir', 'elm', 'emacs-lisp', 'erb', 'erl', 'erlang', 'f', 'f03', 'f08', 'f18', 'f77', 'f90', 'f95', 'fennel', 'fish', 'fluent', 'for', 'fortran-fixed-form', 'fortran-free-form', 'fs', 'fsharp', 'fsl', 'ftl', 'gdresource', 'gdscript', 'gdshader', 'genie', 'gherkin', 'git-commit', 'git-rebase', 'gjs', 'gleam', 'glimmer-js', 'glimmer-ts', 'glsl', 'gnuplot', 'go', 'gql', 'graphql', 'groovy', 'gts', 'hack', 'haml', 'handlebars', 'haskell', 'haxe', 'hbs', 'hcl', 'hjson', 'hlsl', 'hs', 'html', 'html-derivative', 'http', 'hxml', 'hy', 'imba', 'ini', 'jade', 'java', 'javascript', 'jinja', 'jison', 'jl', 'js', 'json', 'json5', 'jsonc', 'jsonl', 'jsonnet', 'jssm', 'jsx', 'julia', 'kotlin', 'kql', 'kt', 'kts', 'kusto', 'latex', 'lean', 'lean4', 'less', 'liquid', 'lisp', 'lit', 'llvm', 'log', 'logo', 'lua', 'luau', 'make', 'makefile', 'markdown', 'marko', 'matlab', 'md', 'mdc', 'mdx', 'mediawiki', 'mermaid', 'mips', 'mipsasm', 'mmd', 'mojo', 'move', 'nar', 'narrat', 'nextflow', 'nf', 'nginx', 'nim', 'nix', 'nu', 'nushell', 'objc', 'objective-c', 'objective-cpp', 'ocaml', 'pascal', 'perl', 'perl6', 'php', 'plsql', 'po', 'polar', 'postcss', 'pot', 'potx', 'powerquery', 'powershell', 'prisma', 'prolog', 'properties', 'proto', 'protobuf', 'ps', 'ps1', 'pug', 'puppet', 'purescript', 'py', 'python', 'ql', 'qml', 'qmldir', 'qss', 'r', 'racket', 'raku', 'razor', 'rb', 'reg', 'regex', 'regexp', 'rel', 'riscv', 'rs', 'rst', 'ruby', 'rust', 'sas', 'sass', 'scala', 'scheme', 'scss', 'sdbl', 'sh', 'shader', 'shaderlab', 'shell', 'shellscript', 'shellsession', 'smalltalk', 'solidity', 'soy', 'sparql', 'spl', 'splunk', 'sql', 'ssh-config', 'stata', 'styl', 'stylus', 'svelte', 'swift', 'system-verilog', 'systemd', 'talon', 'talonscript', 'tasl', 'tcl', 'templ', 'terraform', 'tex', 'tf', 'tfvars', 'toml', 'ts', 'ts-tags', 'tsp', 'tsv', 'tsx', 'turtle', 'twig', 'typ', 'typescript', 'typespec', 'typst', 'v', 'vala', 'vb', 'verilog', 'vhdl', 'vim', 'viml', 'vimscript', 'vue', 'vue-html', 'vy', 'vyper', 'wasm', 'wenyan', 'wgsl', 'wiki', 'wikitext', 'wit', 'wl', 'wolfram', 'xml', 'xsl', 'yaml', 'yml', 'zenscript', 'zig', 'zsh', 'csharp', 'cpp', 'fsharp', 'wenyan']
        }
      }
    }
  },
  mdc: {
    highlight: {
      noApiRoute: false
    }
  },
  ui: {
    fonts: false
  },
  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },
  build: {
    transpile: ['shiki', 'gsap']
  },
  routeRules: { },
  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: '2024-07-09',
  nitro: {
    vercel: {
      functions: {
        supportsWrapper: true,
        supportsResponseStreaming: true
      }
    }
  },
  vite: {
    plugins: [
      yaml()
    ],
    optimizeDeps: {
      include: [
        '@internationalized/date',
        '@vueuse/shared',
        '@vueuse/integrations/useFuse',
        '@tanstack/vue-table',
        'reka-ui',
        'reka-ui/namespaced',
        'embla-carousel-vue',
        'embla-carousel-autoplay',
        'embla-carousel-auto-scroll',
        'embla-carousel-auto-height',
        'embla-carousel-class-names',
        'embla-carousel-fade',
        'embla-carousel-wheel-gestures',
        'colortranslator',
        'tailwindcss/colors',
        'tailwind-variants',
        'ufo',
        'zod',
        'vaul-vue',
        'scule',
        'motion-v',
        'json5',
        'ohash',
        'shiki-transformer-color-highlight'
      ]
    }
  },
  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/icon',
      '@nuxt/image',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      '@nuxtjs/plausible',
      'nuxt/dist',
      'nuxt-og-image',
      resolve('./app/components'),
      '.c12'
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: true,
      exposed: false
    }
  },

  icon: {
    customCollections: [{
      prefix: 'custom',
      dir: resolve('./app/assets/icons')
    }],
    clientBundle: {
      scan: true,
      includeCustomCollections: true
    },
    provider: 'iconify'
  },

  image: {
    format: ['webp', 'jpeg', 'jpg', 'png', 'svg'],
    provider: 'ipx'
  }
})
