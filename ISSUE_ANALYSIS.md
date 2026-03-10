# Open Issues Weighted Analysis

> Analysis of open issues in [overleaf/overleaf](https://github.com/overleaf/overleaf/issues)
> as of 2026-03-10. The fork `hubgit/overleaf` has zero open issues; all issues
> below are from the upstream repository.

## Scoring Methodology

Each issue is scored 1–5 on five dimensions:

| Dimension | Description |
|-----------|-------------|
| **Effort** | Implementation complexity (5 = trivial fix, 1 = massive undertaking) |
| **Clarity** | How well-defined the problem/solution is (5 = crystal clear, 1 = vague) |
| **Desirability** | Community demand — reactions, comments, breadth of impact (5 = high demand) |
| **Feasibility** | Technical risk, dependency on external factors (5 = straightforward) |
| **Impact** | How many users benefit, severity if a bug (5 = affects everyone) |

**Composite Score** = (Effort + Clarity + Desirability + Feasibility + Impact) / 5
Higher is better — issues that are easy, clear, wanted, feasible, and impactful rank highest.

---

## Tier 1: Best Candidates (Score ≥ 4.0)

### #1461 — EPS image inclusion fails (missing ghostscript) — Score: 4.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 5 | 5 | 4 | 5 | 4 |

- **What:** Container image 6.1.2 is missing `ghostscript`, breaking EPS includes.
- **Why top-ranked:** One-line Dockerfile fix (`apt-get install ghostscript`). Problem and solution are both crystal clear. Affects all self-hosted users with EPS files.
- **Risk:** Near zero.

### #1378 — .bst file false syntax errors — Score: 4.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 5 | 5 | 3 | 5 | 4 |

- **What:** `.bst` files get LaTeX syntax highlighting, showing spurious errors.
- **Why high-ranked:** Reporter identified the exact code location. Fix is to add a proper language mapping or disable syntax checking for `.bst`. Very low effort.
- **Risk:** Minimal — the worst case is a neutral "no highlighting" fallback.

### #1238 — Slide title missing from outline with whitespace — Score: 4.2
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 5 | 5 | 3 | 5 | 3 |

- **What:** `\begin{frame} {Title}` (space before brace) doesn't appear in the outline.
- **Why high-ranked:** Pure regex/parser fix in the outline generator. Clear reproduction steps, minimal code change. Related to #1235.
- **Risk:** Minimal — isolated parsing logic.

### #1235 — Support \frametitle in outline — Score: 4.2
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 5 | 5 | 3 | 5 | 3 |

- **What:** Outline/navigation doesn't recognize `\frametitle{}` in Beamer presentations.
- **Why high-ranked:** Straightforward parser addition. Overleaf's own docs use `\frametitle`, so there's a consistency argument too.
- **Risk:** Minimal.

### #1441 — docker-compose.yml MongoDB version mismatch — Score: 4.0
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 5 | 4 | 4 | 3 |

- **What:** Default compose file ships MongoDB 6.0, but the app requires 8.0.
- **Why high-ranked:** PR #1443 already exists. Blocks every new self-hosted deployment. Clear fix, just needs migration guidance.
- **Risk:** Moderate — existing users need volume migration instructions.

---

## Tier 2: Strong Candidates (Score 3.4–3.9)

### #1396 — \newcolumntype confuses word count — Score: 3.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 4 | 3 | 4 | 4 |

- **What:** Word count returns 0 and throws parsing errors when `\newcolumntype` is used.
- **Analysis:** Likely a fix in the texcount wrapper or argument escaping. Moderate clarity — needs code investigation but the reproduction is clear.

### #1364 — Anonymous user cannot use global chat (CE) — Score: 3.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 5 | 3 | 3 | 4 |

- **What:** Chat breaks for anonymous users because `userId` is null, failing MongoDB ObjectId validation.
- **Analysis:** Reporter identified root cause in `ChatController.js`. Fix requires careful design — can't just assign a dummy ID without side effects. Moderate feasibility risk.

### #1435 — Toggle for soft wrapping — Score: 3.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 4 | 4 | 4 | 3 |

- **What:** No way to disable soft word wrapping in the source editor.
- **Analysis:** 4 thumbs up. CodeMirror 6 supports line wrapping configuration natively. Needs a settings UI toggle and persistence. Moderate effort.

### #1384 — Auto-insert \item on Enter in itemize — Score: 3.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 4 | 4 | 4 | 3 |

- **What:** Pressing Enter inside `itemize` should auto-insert `\item`.
- **Analysis:** 4 thumbs up. Already works in Visual Editor — precedent code exists. Needs porting to Source Editor's CodeMirror keybinding layer.

### #1361 — Edit/review button overlaps editor content — Score: 3.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 4 | 3 | 4 | 3 |

- **What:** The review toggle button overlays the first line of the editor.
- **Analysis:** PR #1394 exists (transparency approach). Could also be fixed with CSS repositioning. Well-understood UI bug.

### #1296 — Preview renders symbols from non-included packages — Score: 3.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 4 | 3 | 4 | 4 |

- **What:** Editor preview shows `\implies` correctly even without `amsmath` loaded, but PDF compilation fails.
- **Analysis:** Misleading UX. Fix could be in the preview renderer's package resolution, or a warning when packages are missing.

### #1267 — Scrolling in .bib file buggy — Score: 3.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 3 | 3 | 3 | 5 |

- **What:** Erratic scroll-jumping in `.bib` files and long `.tex` files in visual editor.
- **Analysis:** 6 comments with screen recordings. Likely a CodeMirror re-rendering issue. Needs investigation — unclear root cause lowers clarity and feasibility scores, but this is annoying and affects many users.

### #1456 — Toolkit fails on new install — Score: 3.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 3 | 4 | 3 | 4 |

- **What:** MongoDB ECONNREFUSED race condition on fresh install.
- **Analysis:** Likely a startup ordering issue in the toolkit scripts. Needs debugging of the replica set init timing. Important because it's the first thing new users encounter.

---

## Tier 3: Moderate Candidates (Score 2.8–3.3)

### #1278 — User Mentions in Comments — Score: 3.2
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 3 | 5 | 3 | 3 |

- **What:** Allow @mentioning collaborators in review comments.
- **Analysis:** **49 thumbs up** — highest community demand of any issue. But implementation is significant: needs notification system, user resolution, UI autocomplete. Desirability is massive but effort is high.

### #1440 — Native RTL support in CodeMirror — Score: 3.2
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 5 | 3 | 3 | 3 |

- **What:** RTL languages (Arabic, Persian, Hebrew) don't render correctly in the editor.
- **Analysis:** Exceptionally well-written issue with specific technical proposals (CodeMirror 6's `bidiIsolates`). But the implementation touches deep editor internals and has complex interaction with LaTeX commands.

### #1458 — SVG Preview — Score: 3.2
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 4 | 4 | 2 | 4 | 2 |

- **What:** No preview for SVG files in the editor.
- **Analysis:** Technically straightforward — add SVG to the preview file type list. Low community demand so far (1 thumbs up).

### #1457 — Coloured comments — Score: 3.0
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 3 | 3 | 3 | 3 |

- **What:** Ability to color-code comments for visual priority.
- **Analysis:** Moderate everything. Needs UI design decisions, color picker, persistence. Nice-to-have.

### #1430 — Sandbox-compile only, no local TexLive — Score: 3.0
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 4 | 3 | 3 | 3 |

- **What:** Replace local TexLive with Docker-based compilation in CLSI service.
- **Analysis:** External implementation already exists with source code and Docker images. High clarity, but integrating into the main repo requires significant CLSI refactoring. 3 thumbs up.

### #1279 — One-click text color and highlight — Score: 3.0
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 4 | 2 | 3 | 3 |

- **What:** Quick-action buttons for text color/highlighting like Bold/Italic.
- **Analysis:** One commenter volunteered to contribute. Moderate effort — needs toolbar UI, LaTeX command insertion, and visual editor rendering.

### #1256 — .txt files removed from cache (breaks robust-externalize) — Score: 2.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 4 | 2 | 3 | 2 |

- **What:** Cache cleanup aggressively removes `.txt` files, breaking `robust-externalize`.
- **Analysis:** Needs investigation of CLSI cache cleanup logic. Clear repro but narrow impact (one specific package).

### #1275 — Underscore in algorithm doesn't stop compilation — Score: 2.8
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 3 | 2 | 3 | 3 |

- **What:** Compilation doesn't error out correctly with underscores in algorithm environment.
- **Analysis:** May be a LaTeX behavior rather than an Overleaf bug. Needs investigation.

---

## Tier 4: Large Efforts / Low Tractability (Score < 2.8)

### #1349 — Real-time VS Code integration — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 1 | 2 | 5 | 2 | 2 |

- **What:** Live sync between VS Code / external editors and Overleaf projects.
- **Analysis:** 11 thumbs up and 4 comments. Very high demand. But this requires a public API, real-time sync protocol, and fundamentally changes the architecture. Massive effort.

### #1047 — GitLab integration — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 1 | 3 | 5 | 2 | 1 |

- **What:** Native GitLab (or generic Git) integration.
- **Analysis:** **13 reactions + 7 on comments** — very high demand. But this is a "big feature" requiring a new service integration, OAuth flow, webhook handling. The `git-bridge` service exists but only for GitHub.

### #1059 — ARM64 Docker images — Score: 2.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 4 | 4 | 2 | 1 |

- **What:** Official pre-built ARM64 Docker images.
- **Analysis:** 13 comments, community workarounds exist. Main blocker is CI infrastructure (multi-arch builds are slow/expensive). Community images fill the gap partially.

### #1045 — .docx export — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 3 | 3 | 2 | 2 |

- **What:** Export projects as Word documents.
- **Analysis:** Working PoC exists using `pdf2docx`. But quality concerns (layout fidelity), dependency management, and integration into the download flow make this non-trivial.

### #1291 — Spell check per document — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 3 | 3 | 2 | 2 |

- **What:** Per-document spell-check language instead of project-wide.
- **Analysis:** Requires metadata storage per file, settings UI, and editor integration changes.

### #1453 — Shared-with-others unified view — Score: 2.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 4 | 2 | 3 | 2 |

- **What:** Dashboard to manage projects you've shared with others.
- **Analysis:** Well-designed with mockups. But requires new API endpoints, database queries for reverse-sharing lookups, and full UI implementation.

### #1438 — Editor/PDF resize disables both views — Score: 2.6
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 3 | 3 | 2 | 2 | 3 |

- **What:** Dragging the resize handle hides both panels.
- **Analysis:** A maintainer explained this is *intentional* for performance. Fixing it properly requires solving the underlying layout-shift performance problem.

### #1433 — Helix keybindings — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 3 | 2 | 2 | 2 |

- **What:** Add Helix editor keybindings to CodeMirror.
- **Analysis:** 3 thumbs up. No CodeMirror 6 Helix keymap exists — would need to be built from scratch. Niche audience.

### #1254 — Custom auto-completions — Score: 2.4
| Effort | Clarity | Desirability | Feasibility | Impact |
|--------|---------|-------------|-------------|--------|
| 2 | 3 | 2 | 3 | 2 |

- **What:** User-configurable auto-complete entries for environments/commands.
- **Analysis:** Needs settings UI, persistence, and integration with the CodeMirror completion system. Moderate scope for limited demand.

---

## Summary: Top 10 by Composite Score

| Rank | Issue | Title | Score | Key Rationale |
|------|-------|-------|-------|---------------|
| 1 | #1461 | Missing ghostscript in container | **4.6** | One-line Dockerfile fix, blocks EPS users |
| 2 | #1378 | .bst false syntax errors | **4.4** | Code location identified, trivial fix |
| 3 | #1238 | Outline whitespace parsing bug | **4.2** | Simple regex fix |
| 4 | #1235 | \frametitle in outline | **4.2** | Simple parser addition |
| 5 | #1441 | MongoDB version mismatch | **4.0** | PR exists, blocks new installs |
| 6 | #1396 | Word count broken by \newcolumntype | **3.8** | Clear repro, likely small fix |
| 7 | #1364 | Anonymous chat broken | **3.8** | Root cause identified |
| 8 | #1435 | Soft wrapping toggle | **3.8** | 4 thumbs up, CM6 supports it natively |
| 9 | #1384 | Auto-insert \item | **3.8** | 4 thumbs up, Visual Editor precedent |
| 10 | #1361 | Review button overlaps editor | **3.6** | PR #1394 exists |

### Key Takeaway

The highest-value work is in **Tier 1 bug fixes** (#1461, #1378, #1238, #1235, #1441) — all
are low-effort, high-clarity fixes that improve the experience for self-hosted users immediately.
The most *desired* features (#1278 user mentions, #1349 VS Code integration, #1047 GitLab)
are architecturally significant and would require dedicated development cycles.
