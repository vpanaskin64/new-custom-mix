# Next Session — Build the Custom Mix Prototype

Copy/paste prompt for the next chat:

---

We're continuing the See's Candies Custom Mix prototype. Everything is prepped — design doc, plan, sample catalog, brand styles, and state helpers. Just build the screens.

**Read first:**
- `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/docs/2026-05-12-custom-mix-prototype-design.md`
- `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/docs/plans/2026-05-12-custom-mix-prototype-plan.md`
- `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/shared/data.js`
- `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/shared/state.js`
- `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/shared/styles.css`

**Figma source of truth:** https://www.figma.com/design/EFGd9bqscHasGbuawgVxYZ/04---Sees---Commerce-Components---WIP?node-id=83877-212970

**Order of operations:**
1. Pull screenshots of each individual screen + each modal directly from Figma (don't reuse the overview frame — get close-ups). Use `mcp__cedf43b2-f37c-46aa-a1c7-e8732592ed6d__get_metadata` on `83877:212970` to find child node IDs, then `get_screenshot` per child.
2. Build `shared/ui.js` first (Header, SummaryBar, ProductTile, Modal, Chip, Stepper, ProgressBar).
3. Build Task 0 → Task 6 from the plan, verify each in browser before moving on.
4. Pause for review after Task 1, Task 2, and Task 5 — those are the highest-stakes ones.

**Constraints (already decided):**
- Mobile only (`max-width: 480px`).
- Placeholder images via inline SVG already wired in `data.js`. Don't replace them — Vlad will swap real product photography later.
- Single recipient only. Skip the SEES-4346 multi-recipient block entirely on Step 3.
- Skip the landing page (SEES-4035). Prototype starts at Step 1.
- React via CDN + Babel-standalone. No build step. No localStorage — `sessionStorage` only.

**Save outputs to:** `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/`
