# Custom Mix Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a 4-screen clickable mobile-only HTML prototype of the Custom Mix builder with full state persistence and all key modals.

**Architecture:** Standalone HTML per screen (Step 1 → 4). React + Babel via CDN. Shared `state.js`, `data.js`, `styles.css`, `ui.js`. State in `sessionStorage` so Edit links round-trip.

**Tech Stack:** HTML, React 18 + Babel-standalone via CDN, plain CSS with custom properties for tokens, sessionStorage for state. No build step.

**Output folder:** `/Users/vladsokur/Desktop/Sees Prototypes/Sees Candies/Custom Mix/`

**Verification mode:** No automated tests. Each task ends with manual checklist + open in browser to verify.

---

## Task 0: Skeleton + shared assets

**Files:**
- Create: `shared/styles.css` (tokens, base, components)
- Create: `shared/data.js` (catalog)
- Create: `shared/state.js` (sessionStorage helpers)
- Create: `shared/ui.js` (Header, Summary, Modal, Tile, Stepper React components)
- Create: `index.html` (redirects to `01-pick-a-box.html` for convenience)

**Steps:**
1. Confirm `data.js` enumerates 3 box styles, 3 sizes (+ heart-1lb, square variants), 3 designs, 12 flavors per design doc.
2. Confirm `state.js` exports `getState()`, `setState(partial)`, `resetState()`, default state.
3. Confirm `styles.css` defines `--color-bg`, `--color-fg`, `--color-muted`, `--color-border`, `--space-*`, `--font-display`, `--font-body`, plus Sees black/white palette.
4. Confirm `ui.js` exports: `Header`, `SummaryBar`, `ProductTile`, `Modal`, `BottomSheet`, `Stepper`, `Chip`, `ProgressBar`.
5. Open `01-pick-a-box.html` shell in browser to confirm shared assets load.

**Verify:** No console errors. Header renders. Tap event on a placeholder tile logs to console.

---

## Task 1: Step 1 — Pick a Box

**Files:**
- Create: `01-pick-a-box.html`

**Components:** Fulfillment toggle, Promo banner, Box Style scroller, Box Size row, Box Design scroller, Summary (sticky bottom).

**Steps:**
1. Render Custom Mix header.
2. Render Promo banner (visible by default, X dismisses for session).
3. Render Fulfillment segmented control. Default Shipping.
4. Render Box Style scroller. Default first style selected. Each tile has zoom icon → opens Box Zoom modal.
5. Render Box Size row. Reads compatible sizes from current style. Disabled tiles for incompatible (with `aria-disabled` + visible "—" treatment). Single-size style auto-pre-selects and renders as non-interactive.
6. Render Box Design scroller. Each tile: image, name, upcharge label.
7. Render Box Zoom modal (half-sheet) — title, image, "Start from this mix · $XX.XX" CTA, close X. CTA selects style + advances to Step 2.
8. Render Summary bar. Collapsed by default. Tap chevron to expand.
9. Wire "NEXT: SELECT FLAVORS" CTA → `02-select-flavors.html`.
10. Persist state on every change.

**Verify:**
- All 3 styles selectable; switching style filters sizes/designs correctly.
- Heart Box auto-selects size, hides Box Size row interaction.
- Square Box pre-selects single size and design — non-interactive size tile.
- Promo dismiss persists across reload.
- Box Zoom CTA jumps to Step 2 with state saved.
- Summary subtotal reflects size + design upcharge.

---

## Task 2: Step 2 — Select Flavors

**Files:**
- Create: `02-select-flavors.html`

**Components:** Search input, filter chips, flavor grid, Larger-Box Upsell, Summary (with autofill + per-flavor rows), What's Inside modal.

**Steps:**
1. Render header + filter chip row + search icon.
2. Tapping search icon opens inline search input replacing chips. Case-insensitive substring match on flavor name or item code.
3. Render 2-col grid of flavor tiles. Default empty state: "Select any flavor to start" overlay.
4. Tile tap toggles selection. On select: equal-split rebalance (`Math.floor(100/N)` with remainder to first item).
5. "What's Inside?" link opens modal with name, image, description, ingredients, allergens, primary "Add to Box" / "Remove from Box" CTA.
6. Selected tile shows +/- stepper. Increment by 5%. Adjust triggers proportional redistribute across other selected flavors. Floor 1%.
7. Render Larger-Box Upsell card under flavor grid when `selectedCount / cap >= 0.8` AND a larger compatible size exists. Accept swaps size, preserves selections, rebalances. Dismiss hides for session.
8. Render Summary bar. Collapsed: "X Selected, Max Y · Box Fill %". Expanded: list of selected flavors with stepper + Remove, plus Autofill button.
9. Autofill picks random "Most Popular" flavors until cap is reached, equal split.
10. Disable "NEXT: REVIEW YOUR BOX" CTA until ≥1 flavor selected.

**Verify:**
- Selection → unselection rebalances correctly.
- Stepper adjustment redistributes proportionally.
- All 5 filter chips work (each has ≥1 matching flavor).
- Search finds by name AND by code (e.g. "#12").
- Upsell appears at 80% threshold, disappears below or when dismissed.
- Autofill respects cap.
- Empty-state overlay disappears on first selection.

---

## Task 3: Step 3 — Review Your Mix

**Files:**
- Create: `03-review.html`

**Components:** Box Summary card, Selected Flavors card (expandable), Free shipping bar (visual), Gift toggle + editor, Purchase Mode toggle + cadence dropdown, sticky bottom CTA.

**Steps:**
1. Render header.
2. Render Box Summary card. Image + name + "1lb · White · Shipping" + Edit link → Step 1.
3. Render Selected Flavors card. Header shows count. Tap to expand → list of flavors with %. Edit link → Step 2.
4. Render Free Shipping bar — static visual, copy: "Add $X.XX for FREE shipping on $50+".
5. Render "This box is a gift" toggle. When on: textarea (150-char counter), Save Message button. Save shows toast "Message saved".
6. Render Purchase Mode toggle (segmented: One-Time Purchase / Subscribe & Save).
7. When Subscribe selected: reveal "Delivers Every" dropdown (1 / 2 / 3 months, default 2). CTA label flips "Add to Bag" → "Subscribe".
8. Sticky bottom CTA bar with subtotal + button. Tap → `04-added-to-bag.html`.

**Verify:**
- Edit links round-trip with state preserved.
- Gift toggle reveals/hides editor cleanly.
- Subscribe toggle changes CTA label and shows dropdown.
- Subtotal correct: box price + design upcharge.

---

## Task 4: Step 4 — Added to Bag

**Files:**
- Create: `04-added-to-bag.html`

**Components:** Success indicator, configured box card, free shipping bar, Review Bag CTA, Continue shopping link, Build Another Box card.

**Steps:**
1. Render header + success check + heading.
2. Render configured box card. Image, generated product name (e.g. "Custom Mix White Gift Box"), "1lb · 3 flavors", price, "Edit This Box" → Step 1 with state preserved.
3. Render free shipping progress visual.
4. Render primary "REVIEW BAG & CHECKOUT" CTA → `alert("Cart not built in this prototype")`.
5. Render "Continue shopping" link → returns to Step 1.
6. Render "Building for multiple people?" card with "BUILD ANOTHER BOX" → reset state, return to Step 1.

**Verify:**
- Box name reflects selected box + design.
- Edit link preserves state.
- Build Another Box clears state and starts fresh at Step 1.

---

## Task 5: Downsize Conflict Modal

**Files:**
- Modify: `01-pick-a-box.html` (add modal trigger on size change)
- Modify: `shared/ui.js` (add `DownsizeModal`)

**Steps:**
1. On Step 1, when user picks a size whose cap < current `flavors.length`, intercept and open Downsize Modal.
2. Modal content: title "Too many flavors for this box", subtitle "The {targetSize} fits up to {cap} flavors. Remove {n} to switch.", list of selected flavors with Remove + stepper, "SWITCH TO {targetSize}" primary (disabled until count ≤ cap), "KEEP CURRENT BOX" secondary, X close.
3. As user removes flavors in modal, subtitle counter updates live.
4. Primary applies size, rebalances, closes modal.
5. Cancel/X restores previous size.

**Verify:**
- Modal appears only when going from larger to smaller cap.
- Counter updates live as flavors are removed.
- Switch button only enables when count meets cap.

---

## Task 6: Polish + smoke test

**Steps:**
1. Walk the full flow Step 1 → 4 with various paths:
   - Standard / 1lb / White → 3 flavors → onetime
   - Standard / 2lb / Birthday → 10 flavors (trigger upsell) → subscribe (2 months) → gift on with message
   - Heart Box → autofill → review → edit back → change to Square → confirm downsize modal
3. Verify state survives reload mid-flow.
4. Verify all modals close on X, scrim, Escape.
5. Verify tap targets ≥ 44px.
6. Verify Custom Mix header consistent across all 4 screens.
7. Take screenshots of each screen + each modal for design review.

---

## After completion

- Commit the prototype folder.
- Update `Custom Mix/README.md` with screenshots and "how to view" instructions.
- Update Sees project memory with the new prototype location.
