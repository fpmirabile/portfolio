# Portfolio - Fernando Mirabile

Personal portfolio site built with Astro + Svelte 5 + Tailwind CSS 4.

## Quick Start

```bash
pnpm dev        # Dev server at localhost:4321
pnpm build      # Build static site to ./dist/
pnpm preview    # Preview production build
```

## Architecture

- **Astro 5** for static page generation and routing
- **Svelte 5** (runes API: `$props()`, `$state()`, `$derived()`) for interactive components
- **Tailwind CSS 4** via Vite plugin with CSS variables for theming
- **TypeScript** in strict mode

## Project Structure

```
src/
├── components/
│   ├── sections/      # Page sections (Astro + 1 Svelte component)
│   └── common/        # Reusable interactive components (Svelte)
├── constants/
│   └── data.json      # All content data (work experience, technologies, certs, side projects, education)
├── i18n/
│   ├── en.json        # English translations
│   ├── es.json        # Spanish translations
│   └── pt.json        # Portuguese translations
├── types/
│   └── index.ts       # All TypeScript interfaces
├── pages/
│   ├── index.astro    # Root redirect
│   ├── en/index.astro
│   ├── es/index.astro
│   └── pt/index.astro
├── utils/             # Language detection, CV download, custom events
├── styles/
│   └── global.css     # Tailwind base + custom animations + theme variables
└── layouts/
    └── Layout.astro   # Main HTML wrapper
```

## Key Conventions

### Components
- **Astro (.astro)** for static sections and layouts
- **Svelte (.svelte)** for client-side interactive components
- PascalCase naming; sections suffixed with "Section" (e.g., `HeroSection.astro`)
- Svelte components hydrated with `client:idle` or `client:visible`

### Data Flow
1. `data.json` → imported in page-level Astro files
2. i18n JSON → imported per-language in each page route
3. Both passed as props down to section → common components

### i18n
- 3 languages: `en`, `es`, `pt` (default: `es`)
- Each language has its own route (`/en/`, `/es/`, `/pt/`)
- `data.json` has language-agnostic data; translations live in `i18n/*.json`
- Language stored in `localStorage`

### Types
- `SkillLevel`: `"beginner" | "intermediate" | "advanced" | "expert"` — must use only these 4 values
- `SupportedLanguage`: `"es" | "en" | "pt"`
- All interfaces in `src/types/index.ts`

### Theming
- Light/dark mode via `.dark` class on `<html>`
- CSS variables (HSL) defined in `global.css` under `:root` / `.dark`
- Theme preference stored in `localStorage`
- Astro ↔ Svelte communication via custom events (`toggleTheme`, `themeChanged`)

## Important Notes

- No ESLint or Prettier configured — follow existing code style
- No test setup — be careful with changes, verify via `pnpm build`
- `public/Fernando_Mirabile_resume.pdf` is the downloadable resume
- When updating work/tech data, only edit `data.json`. When updating display text, edit i18n files
- The `Certification` type requires a `month` field (string, e.g., "January")
