# Fantasies

An enhanced UI component library built on top of Nuxt UI, providing additional components and utilities for modern web applications.

## Features

- 🎨 Extended component library based on @nuxt/ui
- 🔧 Highly customizable with TailwindCSS
- 📱 Mobile-first responsive design
- 🎯 TypeScript support
- ⚡ Lightning fast with Nuxt 3

## Installation

1. **Install the package**

```bash
npm install @fantasies/ui
```

2. **Add to your Nuxt configuration**

```js
// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@fantasies/ui',
  ]
})
```

3. **Configure TailwindCSS and component defaults**

```js
// app.config.ts
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

## Development

### Prerequisites

- Node.js 22+
- pnpm

### Getting Started

1. **Install dependencies**

```bash
pnpm i
```

2. **Prepare the development environment**

```bash
pnpx nuxt prepare
pnpm dev:prepare
```

3. **Start development server**

```bash
# For Nuxt playground
pnpm dev

# For Vue playground
pnpm dev:vue
```

## What's Included

Fantasies extends @nuxt/ui with additional components and utilities, providing a comprehensive starter kit for building modern web applications with enhanced UI capabilities.

## Roadmap

- [x] MDC Prose components
- [x] Read Nuxt UI theme variables and merge rules
- [ ] Generate MDC themes like Nuxt UI
- [ ] Documentation website
- [ ] Project homepage
- [x] JS Driver form component with validation
- [ ] JS Driver table component with sorting and filtering
- [ ] Paginated table with automatic URL-based requests
- [ ] Comprehensive test suite

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE.md](LICENSE.md) file for details.

