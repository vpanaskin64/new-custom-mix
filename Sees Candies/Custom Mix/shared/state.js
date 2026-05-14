// Custom Mix prototype state — persisted in sessionStorage across the 4 screens.

const STATE_KEY = 'seesCM';

const DEFAULT_STATE = {
  fulfillment: 'shipping',     // 'shipping' | 'pickup'
  storeId: null,
  boxStyleId: 'standard',
  boxSizeId:  '1lb',
  boxDesignId:'white',
  flavors:    [],              // [{ id, sharePct }]
  gift:       { enabled: false, message: '' },
  purchaseMode: 'onetime',     // 'onetime' | 'subscribe'
  cadenceMonths: 2,            // 1 | 2 | 3 (only used when subscribe)
  promoDismissed:  false,
  upsellDismissed: false,
};

window.SeesState = {
  get() {
    try {
      const raw = sessionStorage.getItem(STATE_KEY);
      if (!raw) return { ...DEFAULT_STATE };
      return { ...DEFAULT_STATE, ...JSON.parse(raw) };
    } catch (e) {
      return { ...DEFAULT_STATE };
    }
  },

  set(partial) {
    const next = { ...this.get(), ...partial };
    sessionStorage.setItem(STATE_KEY, JSON.stringify(next));
    return next;
  },

  reset() {
    sessionStorage.removeItem(STATE_KEY);
    return { ...DEFAULT_STATE };
  },

  // ===== Computed helpers =====

  subtotal(state = this.get()) {
    const size   = window.SEES_DATA.findSize(state.boxSizeId);
    const design = window.SEES_DATA.findDesign(state.boxDesignId);
    return (size?.price || 0) + (design?.upcharge || 0);
  },

  cap(state = this.get()) {
    return window.SEES_DATA.findSize(state.boxSizeId)?.cap || 0;
  },

  fillPercent(state = this.get()) {
    const cap = this.cap(state);
    if (!cap) return 0;
    return Math.round((state.flavors.length / cap) * 100);
  },

  // Equal-split rebalance — used when adding a new flavor.
  rebalanceEqual(flavors) {
    const n = flavors.length;
    if (n === 0) return [];
    const base = Math.floor(100 / n);
    const rem  = 100 - (base * n);
    return flavors.map((f, i) => ({ ...f, sharePct: base + (i < rem ? 1 : 0) }));
  },

  // Proportional redistribute — used when removing or changing a share.
  rebalanceProportional(flavors, changedId, newShare) {
    if (flavors.length === 0) return [];
    if (flavors.length === 1) return [{ ...flavors[0], sharePct: 100 }];

    const others    = flavors.filter(f => f.id !== changedId);
    const remaining = 100 - newShare;
    const totalOther = others.reduce((s, f) => s + f.sharePct, 0) || 1;

    const adjusted = others.map(f => ({
      ...f,
      sharePct: Math.max(1, Math.round((f.sharePct / totalOther) * remaining)),
    }));

    // Repair total to 100 (rounding drift)
    const total = adjusted.reduce((s, f) => s + f.sharePct, 0) + newShare;
    const drift = 100 - total;
    if (drift !== 0 && adjusted.length > 0) {
      adjusted[0].sharePct = Math.max(1, adjusted[0].sharePct + drift);
    }

    return flavors.map(f =>
      f.id === changedId ? { ...f, sharePct: newShare } : adjusted.find(a => a.id === f.id)
    );
  },

  // Should the larger-box upsell show on Step 2?
  shouldShowUpsell(state = this.get()) {
    if (state.upsellDismissed) return false;
    const cap = this.cap(state);
    if (!cap) return false;
    if (state.flavors.length / cap < 0.8) return false;
    // Is there a larger compatible size for the current style?
    const style = window.SEES_DATA.findStyle(state.boxStyleId);
    const sizes = style.sizeIds.map(id => window.SEES_DATA.findSize(id));
    const current = window.SEES_DATA.findSize(state.boxSizeId);
    return sizes.some(s => s.cap > current.cap);
  },

  nextLargerSize(state = this.get()) {
    const style = window.SEES_DATA.findStyle(state.boxStyleId);
    const sizes = style.sizeIds.map(id => window.SEES_DATA.findSize(id)).sort((a, b) => a.cap - b.cap);
    const current = window.SEES_DATA.findSize(state.boxSizeId);
    return sizes.find(s => s.cap > current.cap) || null;
  },
};
