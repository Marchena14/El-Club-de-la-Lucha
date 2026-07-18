# El Club de la Lucha - Agent Instructions

## Project Overview
Web app for a Pokémon VGC competitive gaming club. Single-page application with vanilla JS, no build tools, no frameworks.

## Tech Stack
- **HTML5** - Single `index.html` file
- **CSS3** - `styles.css` with CSS custom properties (dark theme)
- **JavaScript** - Vanilla JS, no modules, no bundler
- **Storage** - localStorage + GitHub API sync (data.json)

## File Structure
```
├── index.html      # Single page, all modals and sections inline
├── app.js          # All JS logic (~720 lines)
├── styles.css      # All styles (~720 lines)
├── data.json       # Data file synced with GitHub (sesiones, deberes)
├── logoClub.png    # Club logo
└── AGENTS.md       # This file
```

## Architecture

### Main Objects (app.js)
- **`DB`** - Database layer. Handles localStorage cache + GitHub API sync.
  - `DB._cache` = `{ sesiones: [], deberes: [] }`
  - `DB.cargar()` - Load from GitHub or fallback to localStorage
  - `DB.set(clave, datos)` - Save and trigger GitHub sync
  - `DB._guardarGitHub()` - PUT to GitHub API using SHA tracking
  - `DB._getConfig()` - Read GitHub config from localStorage
- **`Config`** - GitHub config modal (owner, repo, token, branch)
- **`Sesiones`** - Sessions CRUD (theorica/practica). Filtered view, cards grid.
- **`Deberes`** - Homework/tasks CRUD. Toggle completed, priority, deadlines.
- **`POKEDEX`** - Map of Pokémon names → national dex IDs (VGC competitive only)

### Data Model
```javascript
// Sesión
{
  id: string,        // Date.now base36 + random
  fecha: string,     // "YYYY-MM-DD"
  tipo: "teorica" | "practica",
  tema: string,
  descripcion: string,
  youtube: string,   // URL
  pokepastes: [{ url, raw, equipo }],
  asistentes: string
}

// Deber
{
  id: string,
  titulo: string,
  descripcion: string,
  pokepastes: [{ url, raw, equipo }],
  fechaLimite: string,  // "YYYY-MM-DD"
  prioridad: "normal" | "alta",
  completado: boolean
}
```

### Key Functions
- `parsearPoképaste(texto)` - Parses pokepaste text, extracts Pokémon names, maps to sprite IDs via POKEDEX
- `normalizarNombre(str)` - Normalizes names (lowercase, remove accents/symbols, guiones→espacios)
- `renderEquipo(equipo, urlPaste)` - Renders sprite images from PokeAPI GitHub raw URLs
- `renderYouTube(url)` - Renders YouTube link (not embedded)
- `escHtml(str)` - XSS-safe HTML escaping
- `mostrarEstado(tipo, mensaje)` - Status bar notifications (ok/error/loading)

### GitHub Sync
- Uses GitHub Contents API (PUT with SHA for updates)
- Token stored in localStorage (`club_config`)
- SHA tracked in `DB._sha` for optimistic concurrency
- Config modal: `Config.abrirModal()`, `Config.guardar(event)`

## Conventions
- **No imports/exports** - Everything is global, loaded via single `<script>` tag
- **No build step** - Edit files directly, open index.html in browser
- **Spanish** - UI text and code comments in Spanish
- **No frameworks** - Pure vanilla JS, no React/Vue/etc.
- **CSS variables** for theming (`--accent`, `--bg-card`, etc.)
- **Event handlers** inline in HTML (`onclick="Sesiones.abrirModal()"`)

## How to Run
- Open `index.html` directly in browser, or
- Use a local server (e.g., VS Code Live Server)

## GitHub Sync Setup
User must configure via the ⚙ button:
1. GitHub repo owner
2. Repo name
3. Personal access token with repo permissions
4. Branch (default: main)

The `data.json` in the repo stores `{ sesiones: [], deberes: [] }`.

## Notes
- Pokémon sprites from: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/{id}.png`
- Poképastes URL: `https://pokepast.es/`
- The POKEDEX object covers Gen 1-9 competitive VGC Pokémon
- Modals are shown/hidden via `display: none/flex`
- Sections switched via `.section.active` CSS class
- No tests, no linting configured
