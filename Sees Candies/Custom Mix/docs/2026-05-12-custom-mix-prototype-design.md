# Custom Mix Prototype — Design Doc

**Date:** 2026-05-12
**Owner:** Vlad
**Source of truth:** Figma frame `83877:212970` in file `EFGd9bqscHasGbuawgVxYZ` ("04 - Sees - Commerce Components - WIP") + Jira epic SEES-3856 children.

---

## Goal

Build a clickable, mobile-only HTML prototype of the Custom Mix builder so flow, state, and microinteractions can be validated end-to-end without writing production React.

## Scope

**In (4 screens):**
1. **Step 1 — Pick a Box** (`01-pick-a-box.html`)
2. **Step 2 — Select Flavors** (`02-select-flavors.html`)
3. **Step 3 — Review Your Mix** (`03-review.html`)
4. **Step 4 — Added to Bag** (`04-added-to-bag.html`)

**In (modals/states):**
- Box Zoom modal (SEES-4335)
- What's Inside modal (SEES-4339)
- Larger-Box Upsell card (SEES-4340)
- Downsize Conflict modal (SEES-4351)
- Summary collapsed/expanded toggle
- Autofill state (SEES-4338)
- Gift message editor (toggle in SEES-4039)
- Subscribe & Save toggle + cadence dropdown (SEES-4345)
- Empty state on Step 2 ("Select any flavor to start")
- Promo banner with session dismiss (SEES-4337)

**Out (this prototype):**
- Landing page (SEES-4035)
- Multi-recipient assignment (SEES-4346) — single recipient only
- Desktop layouts — mobile only this round
- A/B testing, feature toggles, datalayer events (SEES-4050, 4342, 4343)
- Real URL routing (SEES-4341) — state lives in `sessionStorage`
- Approaching-Shipping-Discount logic — render visual only, no recompute
- Real product imagery — placeholder boxes/colors until Vlad supplies assets

## Tech approach

**Stack:** Standalone HTML per screen + shared JS/CSS. React via CDN with Babel-standalone for JSX. State persisted across screens via `sessionStorage` (key: `seesCM`). Plain CSS (Panda is the prod stack — overkill here; spacing/tokens still align so handoff is straightforward).

**Why not single-page React app:** Each Figma screen is a separate URL the user can deep-link to. Matches the Figma frame structure and makes design review easier (each file = each screen).

**Why placeholder images:** Vlad supplies real assets later. Placeholder generation uses inline SVG with brand-correct ratios so layout stays honest.

## File structure

```
/Sees Prototypes/Sees Candies/Custom Mix/
├── docs/
│   ├── 2026-05-12-custom-mix-prototype-design.md   ← this file
│   └── plans/
│       └── 2026-05-12-custom-mix-prototype-plan.md
├── shared/
│   ├── state.js     ← getState, setState, defaults, reset
│   ├── data.js      ← catalog: boxes, sizes, designs, flavors
│   ├── styles.css   ← tokens + shared component styles
│   └── ui.js        ← Header, Summary panel, Modal, Tile (shared React components)
├── 01-pick-a-box.html
├── 02-select-flavors.html
├── 03-review.html
├── 04-added-to-bag.html
├── NEXT_SESSION_PROMPT.md
└── README.md
```

## Data model

Stored in `sessionStorage["seesCM"]` as JSON:

```js
{
  fulfillment: "shipping" | "pickup",
  storeId: string | null,           // only if pickup
  boxStyleId: string,               // default: "standard"
  boxSizeId: string,                // default: smallest valid for style
  boxDesignId: string,              // default: first valid for style+size
  flavors: [{ id, sharePct }],      // sum to 100 when non-empty
  gift: { enabled: bool, message: string },
  purchaseMode: "onetime" | "subscribe",
  cadenceWeeks: number | null,      // only if subscribe
  promoDismissed: bool,             // session dismissed flag for SEES-4337
  upsellDismissed: bool             // session dismissed flag for SEES-4340
}
```

### Catalog (sample — enumerated in `data.js`)

**Box styles (3):**
- `standard` — Standard Box (sizes: 1lb, 2lb, 3lb)
- `heart` — Heart Box (size: 1lb only)
- `square` — Square Box (size: 7.4" × 7.25" only — pre-selected non-interactive)

**Box sizes (with flavor caps — SEES-3520 + upsell math):**
- `1lb` — $35.50, cap 8
- `2lb` — $55.50, cap 10
- `3lb` — $79.50, cap 12
- `heart-1lb` — $39.50, cap 8
- `square` — $39.50, cap 8

**Box designs:**
- `white` — Free
- `lavender` — Free
- `birthday` — +$4.95

**Flavors (~12 starter set):** mix of milk/dark/white/non-chocolate so all 5 filter chips have results. Each flavor has: id (e.g. `#12`), name, category, image (placeholder), description, ingredients, allergens, optional "Limited Time" or "Most Popular" badge.

## Per-screen behavior summary

### Step 1 — Pick a Box
- Fulfillment toggle (Shipping / Pick Up in Store). Pickup opens a fake "Choose store" sheet with 1 hard-coded location to demo selection.
- Box Style horizontal scroller (3 tiles). Each tile has a zoom icon → Box Zoom modal.
- Box Size row — disabled tiles for incompatible sizes (with `aria-disabled` + tooltip on long-press). Single-size styles show one tile pre-selected, non-interactive.
- Box Design horizontal scroller — design name + upcharge label.
- Sticky bottom Summary panel. Collapsed shows step indicator, selection caption, subtotal, expand chevron, "NEXT: SELECT FLAVORS" CTA.
- Promo banner above form, dismissible (session).

### Step 2 — Select Flavors
- Top bar: search icon (opens inline search input), filter chips (All / Milk / Dark / White / Non-Choc / Most Popular).
- 2-col grid of flavor tiles. Each: image, item code, name, "What's Inside?" link, badge (if any). Top-right checkmark when selected. +/- stepper appears only when selected, displays share %.
- Tapping body toggles selection. Equal-split rebalance on add. Proportional redistribute on remove or stepper adjust. Floor 1%, ceiling 100%.
- Summary collapsed: "X Selected, Max Y". Box Fill % bar. Expanded shows per-flavor share + Remove links + Autofill button + Apply CTA.
- Autofill fills remaining capacity with random "Most Popular" flavors at equal share.
- Larger-Box Upsell card appears when ≥80% cap filled AND a larger compatible size exists. Accept swaps size + recalcs shares. Dismiss hides for session.
- Downsize modal appears if user navigates back to Step 1 and picks a smaller cap.

### Step 3 — Review Your Mix
- Box Summary card (image + name + size/design/fulfillment + Edit → Step 1).
- Selected Flavors card (count, expandable list of flavors + %, Edit → Step 2).
- Approaching-Shipping-Discount visual (free shipping bar + "Add Treats" link → no-op).
- "This box is a gift" toggle. When on: gift message field (150-char counter) + Save Message button.
- Purchase Mode toggle (One-Time Purchase / Subscribe & Save). Subscribe reveals cadence dropdown ("Every 1 month" / "Every 2 months" / "Every 3 months", default 2). CTA label changes "Add to Bag" → "Subscribe".
- Sticky bottom CTA: "ADD TO BAG · $X.XX" or "SUBSCRIBE · $X.XX".
- (Multi-recipient block — intentionally skipped this round.)

### Step 4 — Added to Bag
- Success check + heading "Your box in the bag".
- Configured box card: image, name (e.g. "Custom Mix White Gift Box"), size + flavor count, price, "Edit This Box" → Step 1 with all state preserved.
- Free shipping progress bar (visual only).
- Primary "Review Bag & Checkout" → no-op (alert / placeholder).
- Secondary "Continue shopping" → no-op (back to Step 1 or alert).
- "Building for multiple people?" card with "Build Another Box" → resets state and returns to Step 1.

## Header behavior

Custom Mix minimalist header on all 4 screens:
- "See's CANDIES" wordmark, left
- "BUILD A CUSTOM BOX" label, next to wordmark
- (no Back to Home on mobile)

## Assumptions / decisions called out

| # | Decision | Rationale |
|---|---|---|
| A1 | Flavor caps: 1lb=8, 2lb=10, 3lb=12 | Reverse-engineered from upsell ticket ("Upgrade to 2lb to add 2 more flavors") |
| A2 | Share rebalance: equal-split on add, proportional on remove/adjust | No algorithm specified; this is the most predictable behavior |
| A3 | "Continue shopping" → returns to Step 1 | No real homepage in prototype |
| A4 | Subscribe cadences: 1, 2, 3 months (default 2) | "Recommended" pre-selected — picked the middle |
| A5 | One store hardcoded for Pickup | Pickup is in scope (toggle) but store selection is not the focus |
| A6 | Promo banner SKU = "standard" | Demo-only; tapping CTA pre-selects Standard Box |
| A7 | Larger-box upsell threshold: 80% cap filled | Matches spec |
| A8 | Empty Step 2 state: "Select any flavor to start" | Per Figma |

## Open items for future sessions

- Real product imagery (boxes, designs, flavors) — Vlad will supply
- Desktop two-column layout
- Multi-recipient assignment integration
- Landing page (SEES-4035)
- Approaching-Shipping-Discount real math
- Treats upsell modal
- Datalayer events instrumentation
