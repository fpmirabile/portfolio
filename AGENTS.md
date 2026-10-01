# Portfolio - Fernando Mirabile

Personal portfolio site built with Astro 7 + Tailwind CSS 4.

## Quick Start

```bash
pnpm dev        # Dev server at localhost:4321
pnpm build      # Build static site to ./dist/
pnpm preview    # Preview production build
pnpm check      # Check Astro templates and TypeScript
pnpm lint       # Lint JavaScript and TypeScript with Oxlint
```

## Architecture

- **Astro 7** for static page generation and routing
- **Astro components** for the portfolio; native disclosures for expandable content
- **Tailwind CSS 4** via Vite plugin with CSS variables for theming
- **TypeScript** in strict mode

## Project Structure

```
src/
├── components/
│   └── sections/      # Reusable page sections
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
├── styles/
│   └── global.css     # Tailwind base + theme variables
└── layouts/
    └── Layout.astro   # Main HTML wrapper
```

## Key Conventions

### Components
- **Astro (.astro)** for static sections and layouts
- PascalCase naming; sections suffixed with "Section" (e.g., `HeroSection.astro`)
- Keep recruiter-facing content in server-rendered HTML

### Data Flow
1. `data.json` and i18n JSON → `PortfolioPage.astro`
2. `PortfolioPage.astro` passes content to section components

### i18n
- 3 languages: `en`, `es`, `pt` (default: `es`)
- Each language has its own route (`/en/`, `/es/`, `/pt/`)
- `data.json` has language-agnostic data; translations live in `i18n/*.json`

### Types
- `SkillLevel`: `"beginner" | "intermediate" | "advanced" | "expert"` — must use only these 4 values
- `SupportedLanguage`: `"es" | "en" | "pt"`
- All interfaces in `src/types/index.ts`

### Theming
- Light/dark mode via `.dark` class on `<html>`
- CSS variables (HSL) defined in `global.css` under `:root` / `.dark`
- Theme preference stored in `localStorage` and applied by `ThemeManager.astro`

## Important Notes

- No test setup — verify changes with `pnpm check`, `pnpm lint`, and `pnpm build`
- `public/Fernando_Mirabile_resume.pdf` is the downloadable resume
- When updating work/tech data, only edit `data.json`. When updating display text, edit i18n files
- The `Certification` type requires a `month` field (string, e.g., "January")
