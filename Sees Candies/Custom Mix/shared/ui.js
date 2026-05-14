// shared/ui.js — Shared React components for the Custom Mix prototype.
// Plain JS (no JSX) so it can load as a regular <script> under file:// protocol.
// Exports to window globals for use in each screen's inline Babel script.

const CE = React.createElement;

// ─── Header ──────────────────────────────────────────────────────────────────
window.CMHeader = function CMHeader() {
  return CE(‘header’, { className: ‘cm-header’ },
    CE(‘div’, { className: ‘cm-header__logo’ },
      CE(‘span’, { className: ‘cm-header__sees’ }, "See’s"),
      CE(‘span’, { className: ‘cm-header__candies’ }, ‘Candies’)
    ),
    CE(‘span’, { className: ‘cm-header__label’ }, ‘Build a Custom Box’)
  );
};

// ─── Promo Banner ─────────────────────────────────────────────────────────────
window.PromoBanner = function PromoBanner({ onDismiss }) {
  return CE('div', { className: 'promo' },
    CE('span', null,
      CE('span', null, '🍫 '),
      CE('strong', null, 'Free Shipping'),
      ' on orders over $50 — limited time'
    ),
    CE('button', { className: 'promo__close', onClick: onDismiss, 'aria-label': 'Dismiss promo' }, '✕')
  );
};

// ─── Bottom Sheet / Modal ─────────────────────────────────────────────────────
window.BottomSheet = function BottomSheet({ open, onClose, children }) {
  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return CE('div', {
    className: 'scrim',
    onClick: (e) => { if (e.target === e.currentTarget) onClose(); },
  },
    CE('div', { className: 'sheet', role: 'dialog', 'aria-modal': 'true' },
      children
    )
  );
};

// ─── Progress Bar ─────────────────────────────────────────────────────────────
window.ProgressBar = function ProgressBar({ pct, style }) {
  return CE('div', { className: 'progress', style },
    CE('div', {
      className: 'progress__fill',
      style: { width: `${Math.min(100, Math.max(0, pct))}%` }
    })
  );
};

// ─── Percent Stepper ─────────────────────────────────────────────────────────
window.PercentStepper = function PercentStepper({ value, onDecrement, onIncrement, minVal = 1 }) {
  return CE('div', { className: 'stepper', onClick: (e) => e.stopPropagation() },
    CE('button', {
      className: 'stepper__btn',
      onClick: onDecrement,
      disabled: value <= minVal,
      'aria-label': 'Decrease'
    }, '−'),
    CE('span', { className: 'stepper__val' }, `${value}%`),
    CE('button', {
      className: 'stepper__btn',
      onClick: onIncrement,
      disabled: value >= 99,
      'aria-label': 'Increase'
    }, '+')
  );
};

// ─── Toast ───────────────────────────────────────────────────────────────────
window.Toast = function Toast({ message, visible }) {
  return CE('div', {
    style: {
      position: 'fixed',
      bottom: '100px',
      left: '50%',
      transform: `translateX(-50%) translateY(${visible ? 0 : '20px'})`,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.2s, transform 0.2s',
      background: '#1a1a1a',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '4px',
      fontSize: '13px',
      pointerEvents: 'none',
      zIndex: 200,
      whiteSpace: 'nowrap',
    }
  }, message);
};
