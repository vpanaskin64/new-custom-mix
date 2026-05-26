# See's Candies — Custom Mix Builder Prototype

Interactive mobile prototype for the Custom Mix Builder flow.

## Screens

| Step | Description |
|------|-------------|
| 1 | Box Selection — delivery toggle, box style / size / design |
| 2 | Flavor Selection — filter chips, 2-col grid, percentage steppers, upsell |
| 3 | Review — box & flavor summary, gift message, purchase toggle |
| 4 | Added to Bag — confirmation, free shipping progress, build another |

## Features

- Single-page app — all 4 steps in one HTML file, no reloads
- In-memory state — no sessionStorage, data lives across steps
- Reusable drawer (bottom sheet) used for image preview and "What's Inside"
- Summary panel — slides up from bottom, showing flavor breakdown with steppers
- Upsell banner — appears when flavor max is reached, auto-upgrades box size
- Downgrade modal — triggered when switching to a smaller box with too many flavors
- Toast notifications — success confirmations for upgrades and downgrades

## Running Locally

Open `index.html` in any modern browser — no build step required.

## Assets

Product images, box images, and icons are in the `Assets/` folder. 
