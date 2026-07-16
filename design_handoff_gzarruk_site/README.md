# Handoff: gzarruk.com — Personal site + Ironman 70.3 training planner

## Overview
Two pages for Gustavo A. Zarruk's personal site, designed in the **Nocturne** design system (a quiet, compact, dark blue‑grey UI; Inter type; a single blurple accent used as line/glow, never a flood):

1. **Home** — a personal profile / link hub: sticky profile sidebar + scrolling About, Experience, and Contact.
2. **Ironman Training** — an interactive 70.3 season planner: a weekly drag‑and‑drop board, editable sessions, a weekly‑totals summary bar, a plan‑overview timeline with season progress, and an interactive training‑load line chart.

## About the Design Files
The files in this bundle (`Home.dc.html`, `Ironman Training.dc.html`) are **design references created in HTML** — working prototypes showing the intended look and behavior. They are **not production code to copy directly**: they run on an internal component runtime (`support.js`, not included) and load the Nocturne design‑system bundle at `_ds/nocturne-…/`.

The task is to **recreate these designs in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established patterns, and to wire the training planner's data to a real database/API where noted. If no front‑end exists yet, pick an appropriate framework and implement there. Treat the HTML as the source of truth for layout, spacing, color, type, and interaction — not as shippable markup.

## Fidelity
**High‑fidelity.** Final colors, typography, spacing, radii, and interactions. Recreate pixel‑perfectly using the exact tokens in the Design Tokens section. All copy is final unless the client supplies real experience/plan data (see Assets/Notes).

---

## Screens / Views

### 1. Home (`Home.dc.html`)
**Purpose:** Personal landing — who Gustavo is, how to reach him, a contact note.

**Layout:** Two‑column CSS grid, `grid-template-columns: minmax(0,340px) minmax(0,1fr)`, `min-height:100vh`.
- **Left sidebar** (340px): `position: sticky; top:0; align-self:start; min-height:100vh; padding:48px 36px;` background `color-mix(surface 60%, transparent)`, right border `--color-divider`. Flex column, `gap:22px`.
- **Right main** (`1fr`): `padding:64px clamp(28px,5vw,72px); max-width:860px;`.
- **Responsive:** below **920px** the grid collapses to one column; the sidebar becomes static (`position:static; min-height:0`) with a bottom divider instead of a right border.

**Sidebar components (top → bottom):**
- Optional availability pill *(prop `openToWork`, default off)*: pill, 1px accent border, text `--color-accent-300`, a 7px accent dot with a 3px accent‑tinted ring; label "Available for consulting".
- **Avatar**: 108×108 circle, `object-fit:cover; object-position:56% 30%;` ring + glow `box-shadow: 0 0 0 1px var(--color-accent), 0 16px 42px -14px color-mix(accent 52%, transparent)`. Must not shrink (`flex:0 0 108px`).
- **Name** `h1` 27px, `letter-spacing:-0.015em`.
- **Tagline** — accent kicker: uppercase 12px, `letter-spacing:0.06em`, preceded by a solid 28×1px accent dash.
- **Bio** 14px, line‑height 1.62, muted (`text 72%`).
- **Credential tags**: three `.tag` pills (`white-space:nowrap`) — "PhD engineer" (accent tint), "20+ years" (neutral), "Energy focus" (neutral).
- **Link rows** (LinkedIn, GitHub, Email): full‑width rows, 1px divider border, radius 8px, 11×13px padding, 14px label, accent icon chip (18px Phosphor), trailing `arrow-up-right`. Hover: border → accent, background `color-mix(accent 10%, transparent)`.
- **Footer**: `© 2026 Gustavo A. Zarruk`, pushed to bottom (`margin-top:auto`).

**Main sections** (each opens with an accent kicker: dash + uppercase label):
- **About**: lead paragraph 18px/1.68 at full `--color-text`, then a 16px/1.72 muted paragraph. `text-wrap:pretty`.
- **Experience**: 2‑column card grid (`gap:14px`), third card spans both columns. Each `.card .elev-sm` (padding 20px, `gap:11px`): kicker (Foundation / Build / Deliver), a 34×34 accent‑tinted icon chip + `.card-title`, and `.card-body`. Hover: `translateY(-2px)` + accent ring `box-shadow: 0 0 0 1px color-mix(accent 45%), var(--shadow-md)`, transition 0.16s. *(A `list` variant exists behind prop `experienceStyle`.)*
- **Contact** *(prop `showContact`, default on)*: kicker, `h2` "Let's talk" 26px, muted note, then a form — Name + Email (2‑col grid) using `.field`+`.input`, a full‑width `.input` textarea, and a `.btn .btn-primary` "Send message" with trailing `arrow-right`.

**Fading rules** separate sections: a 1px line that fades to transparent over the first/last 48px (`linear-gradient(to right, transparent, var(--color-divider) 48px, var(--color-divider) calc(100% - 48px), transparent)`).

### 2. Ironman Training (`Ironman Training.dc.html`)
**Purpose:** Plan and track a 16‑week Ironman 70.3 season.

**Layout:** single centered column, `max-width:1240px; margin:0 auto; padding:44px clamp(20px,5vw,56px) 72px;`. Top‑left back link "← gzarruk.com" → Home.

**Sections (top → bottom):**
- **Header**: "Season plan" kicker, `h1` "Ironman 70.3 Training" (36px; ≤680px → 26px), subtitle `{phase · Week N · focus}`.
- **Plan overview**:
  - Row: "PLAN OVERVIEW" label; right side a **Starts** `type="date"` input (`color-scheme:dark`) + "N weeks" total.
  - **Phase timeline**: 4 clickable segments (Base/Build/Peak/Taper) whose flex‑grow is proportional to each phase's week count (6 / 5 / 3 / 2 = 16). Active segment: `color-mix(accent 26%)` fill, `--color-accent-100` text, inset 1px accent ring. Clicking selects that phase.
  - **Season progress bar**: 6px track, accent fill to `absoluteWeek / totalWeeks`; label "Week N of 16 · P%".
- **Toolbar** (flex, wraps): phase segmented control (`.seg`/`.seg-opt` radios); week nav (prev/next `.btn-icon` + centered "Week N of M" with the week's date range); right‑aligned group (`.im-actions`, unwraps full‑width ≤680px): "Synced HH:MM" status pill, **Sync** button (re‑sync animation), **Reset week** ghost button.
- **Summary bar**: single no‑wrap row, horizontal scroll on overflow. Cells (divider‑separated): **Total volume** (accent‑300 figure), **Sessions**, **Swim**, **Bike**, **Run** (each with its discipline‑colored icon), **Completed** (`done/total · %` + a 4px accent progress meter). Figures are 20px heading, tabular‑nums. Bike/Run each include half of any Brick session's time; Total counts everything once.
- **Weekly board** (`.im-board`): 7 day columns Mon–Sun (`repeat(7, minmax(146px,1fr))`, `min-width:960px`) inside a horizontal‑scroll wrapper. **≤680px:** collapses to a single stacked column (`grid-template-columns:1fr; min-width:0`), columns drop their 360px min‑height, no horizontal scroll.
  - **Column header**: day abbrev + calendar date (from Start date) + a "TODAY" accent pill when the date is today; right‑aligned daily volume total. Today's column gets an inset accent ring.
  - **Session card** (draggable): 3px left border in the discipline color; a discipline tag (tinted bg `color-mix(color 20%)`, text `color-mix(color 82%, white)`, Phosphor icon) + **edit** (pencil) and **delete** (trash) icon buttons; title; a meta row (clock + duration, gauge + zone/intensity); optional description; a "Mark done / Done" toggle (circle → accent check‑circle) on a top‑bordered footer.
  - **Empty day**: dashed "Rest day — drag or add a session" drop zone.
  - **+ Add session** dashed button per column (adds a session and opens the edit modal).
- **Season training‑load chart** (`.im-chartcard`): see Chart below.
- Footer note.

**Edit modal** (`.dialog` over a `color-mix(neutral-900 58%)` backdrop; click backdrop or ✕ to close): Discipline `<select>`, Title, Duration (`H:MM` or plain minutes), Intensity (zone), Description `<textarea>`; footer has a ghost **Delete** (left) and **Cancel** / **Save changes** (right, `.btn-primary`).

#### Chart (SVG line chart, `viewBox 0 0 900 220`, width:100%)
- **Header**: "SEASON TRAINING LOAD"; "Completed Xh / Yh · Z%"; a **Weekly / Cumulative** segmented toggle.
- **Series**: one polyline per sport in its discipline color (1.6px) + a bold **Total** line in the accent (2.6px). Weekly = per‑week minutes; Cumulative = running season totals. Y auto‑scales to a "nice" step (15/30/60/120/180/300/600… min) so ticks land on round hour values.
- **Axes**: y gridlines + tick marks + hour labels (0, 3h, 6h…); x tick marks + week numbers 1–16; faint vertical lines at phase boundaries; a dashed accent line at the current week. Titles: rotated "Time (hours)" (y), "Week" (x).
  - **IMPORTANT gotcha:** axis tick labels must be **real SVG `<text>` nodes** with a solid `fill` (e.g. `#b2b6ca`). Interpolating a dynamic value as a `<text>` child in this runtime wrapped it in a non‑text element, giving the glyphs zero width (invisible). In the prototype they're built with `React.createElement('text', …, label)`; in a normal SVG/React app just render `<text fill="#b2b6ca">{label}</text>` directly.
- **Legend**: clickable pills (Total + each sport) with the season total; clicking toggles that trace (dimmed to 0.4 when hidden); the y‑axis rescales to visible traces.
- **Hover tooltip**: pointer over the plot shows a guide line, a dot on each visible trace, and a card with the week number, phase, date range, and each visible series' value + Total. (Add touch support for mobile if the target platform needs it — the prototype is pointer‑only.)
- **≤680px:** the chart keeps a legible size and scrolls horizontally within its card (`overflow-x:auto`, svg `min-width:600px`) rather than squishing.

---

## Interactions & Behavior
- **Home** links open in new tabs (LinkedIn/GitHub) / `mailto:` (Email). The contact form has no backend — it builds a `mailto:gzarruk@gmail.com` with the subject/body from the fields and navigates there. Swap for a real form endpoint in production.
- **Training board**: HTML5 drag‑and‑drop moves a session card to another day (`dragstart` stores the id, column `dragover` highlights + `drop` reassigns the day). Add / edit (modal) / delete / mark‑done all mutate the week's session list.
- **Phase/week nav** re‑derives the visible week; **Start date** shifts every calendar date, the current‑week highlight, and the chart's current‑week marker.
- **Chart**: trace toggles, weekly/cumulative switch, and hover are all live re‑renders.
- Transitions are subtle (0.12–0.16s ease) — card hover lift, drop‑target highlight. Respect the design system's focus‑visible accent ring; no browser‑default focus.

## State Management
Training planner state (prototype keeps it client‑side; move to real persistence/API in production):
- `phase` ('Base'|'Build'|'Peak'|'Taper'), `week` (0‑based within phase), `sessions` (array for the current week), `done` (map of sessionId→bool), `start` (ISO date), `editingId`/`draft` (modal), `chartMode` ('weekly'|'cumulative'), `chartHidden` (map of series→hidden), `hoverIdx`, `status`.
- **Persistence:** the prototype writes to `localStorage` under keys prefixed `im703_v1_` (`_week_<phase>_<n>`, `_done`, `_view`, `_start`, `_chartmode`, `_charthidden`). Replace with the real datastore. Session ids must stay stable for done/persistence to line up.
- **Data source:** the plan is a static JSON model (`planData`) — phases → week templates → day sessions `{ d, disc, focus, dur, zone, desc }`, plus a `duration` (week count) per phase. Weeks beyond authored templates reuse them (`week % templates.length`). This is where a real DB/API should plug in.

## Design Tokens (Nocturne)
- **Colors:** bg `#161826`, surface `#232532`, text `#e9e9ed`, accent `#9184d9`, divider `color-mix(#e9e9ed 16%, transparent)`, deck/section indigo `#262a60`.
- **Accent ramp:** 100 `#f5f4ff` · 300 `#d2cefd` · 500 `#968ae0` · 700 `#5d5294` · 900 `#2b2741`.
- **Neutral ramp:** 100 `#f3f5fe` · 300 `#cfd3e5` · 400 `#b2b6ca` · 500 `#9397ab` · 700 `#595d6c` · 800 `#3f424d` · 900 `#292b31`.
- **Discipline colors:** Swim `#5fb1cb`, Bike `#d8a75f`, Run `#e08a6c`, Strength `#9aa0ba`, Yoga `#84c08f`, Brick `#b884d6`, Rest `#7b8299`. Axis label grey `#b2b6ca`.
- **Type:** Inter (headings + body), heading weight 500 (do not bold past 500). Sizes: h1 42 / h2 32 / h3 25 / h4 20; body 15/1.55.
- **Spacing (0.70× scale):** 2.8 / 5.6 / 8.4 / 11.2 / 16.8 / 22.4px. **Radius:** sm 4 / md 8 / lg 14. **Shadows:** sm `0 0 0 1px #3f424d`; md `0 0 0 1px #595d6c, 0 6px 18px rgba(0,0,0,.55)`; lg `0 0 0 1px #9397ab, 0 16px 40px rgba(0,0,0,.65)`.
- **Lit ground** (page background): accent‑tinted radial bloom top‑right + a black fall‑off bottom‑left over `--color-bg`.
- Full system source (stylesheet + component classes `.btn/.tag/.field/.input/.card/.seg/.table/.dialog`, ramps, foundations) lives under `_ds/nocturne-…/` in the project — pull exact values from `styles.css`.

## Assets
- `assets/profile.jpeg` (768×1024) — Gustavo's photo, framed as a circular avatar on Home. Provided by the client.
- **Icons:** [Phosphor](https://phosphoricons.com) (regular weight) throughout — e.g. `linkedin-logo`, `github-logo`, `envelope-simple`, `arrow-up-right`, `graduation-cap`, `flask`, `briefcase`, `person-simple-swim`, `bicycle`, `person-simple-run`, `barbell`, `flower-lotus`, `link-simple`, `bed`, `pencil-simple`, `trash`, `clock`, `gauge`, `caret-left/right`, `arrow-clockwise`.
- **Fonts:** Inter (Google Fonts).

## Notes / open items
- Experience content on Home is paraphrased from the bio into three focus areas — replace with real roles/dates/companies for a dated timeline if desired.
- The training plan is realistic **sample** data — swap `planData` for the client's real plan (originally maintained in a Google Sheet).

## Files
- `Home.dc.html` — Home page prototype.
- `Ironman Training.dc.html` — training planner prototype.
- `assets/profile.jpeg` — avatar image.
- `screenshots/home.png` — Home reference render.
- `screenshots/01-ironman-training.png` — training planner (top: plan overview, summary bar, board).
- `screenshots/02-ironman-training.png` — training planner (season training‑load chart).
