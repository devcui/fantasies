# Fantasies

Secondary development of nuxt ui

## how to use

1. Install dependencies

```bash
npm install @nuxt/fantasies
```

2. Import the module

```bash
 modules: [
    '@nuxt/fantasies',
  ]
```

3. Tailwindcss configuration

```js
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'sky',
      neutral: 'slate'
    }
  },
  fantasies: {
    button: {
      color: 'primary',
      variant: 'solid',
      size: 'md',
      rounded: 'md'
    }
  }
})
```

4. How to run

```bash
pnpm i
pnpx nuxt prepare
pnpm dev:prepare
# nuxt
pnpm dev
# vue
pnpm dev:vue
```

## What else can be done

You can think of it as a starter that extends @nuxt/ui
