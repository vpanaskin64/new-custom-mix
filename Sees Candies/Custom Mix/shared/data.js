// Custom Mix catalog — sample data for the prototype.
// Replace placeholder images with real product photography when supplied by Vlad.

const PLACEHOLDER_BOX = (label, bg = '#e8e4dc') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='${bg}'/><text x='100' y='105' font-family='Georgia,serif' font-size='16' fill='#1a1a1a' text-anchor='middle'>${label}</text></svg>`
  )}`;

const PLACEHOLDER_FLAVOR = (label, bg = '#cbb38a') =>
  `data:image/svg+xml;utf8,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'><rect width='200' height='200' fill='${bg}'/><circle cx='100' cy='100' r='62' fill='#8a6b3d'/><text x='100' y='106' font-family='Georgia,serif' font-size='13' fill='#fff' text-anchor='middle'>${label}</text></svg>`
  )}`;

window.SEES_DATA = {
  // ===== FULFILLMENT =====
  fulfillment: [
    { id: 'shipping', label: 'Shipping' },
    { id: 'pickup',   label: 'Pick Up in Store' },
  ],

  // ===== ONE DEMO STORE FOR PICKUP =====
  stores: [
    { id: 'sf-union-sq', name: 'San Francisco — Union Square', address: '210 Powell St, San Francisco, CA' },
  ],

  // ===== BOX STYLES =====
  styles: [
    {
      id: 'standard',
      name: 'Standard Box',
      image: PLACEHOLDER_BOX('Standard'),
      sizeIds:   ['1lb', '2lb', '3lb'],
      designIds: ['white', 'lavender', 'birthday'],
    },
    {
      id: 'heart',
      name: 'Heart Box',
      image: PLACEHOLDER_BOX('Heart', '#e9bcbc'),
      sizeIds:   ['heart-1lb'],
      designIds: ['red-heart'],
    },
    {
      id: 'square',
      name: 'Square Box',
      image: PLACEHOLDER_BOX('Square', '#dcdcdc'),
      sizeIds:   ['square'],
      designIds: ['square-classic'],
    },
  ],

  // ===== BOX SIZES (price + flavor cap per SEES-3520 assumption) =====
  sizes: [
    { id: '1lb',       label: '1lb',           price: 35.50, cap: 10 },
    { id: '2lb',       label: '2 lb',          price: 55.00, cap: 12 },
    { id: '3lb',       label: '3 lb',          price: 75.00, cap: 15 },
    { id: 'heart-1lb', label: '1 lb',          price: 39.50, cap: 8  },
    { id: 'square',    label: '7.4" × 7.25"',  price: 39.50, cap: 8  },
  ],

  // ===== BOX DESIGNS =====
  designs: [
    { id: 'white',          name: 'White',          upcharge: 0,    image: PLACEHOLDER_BOX('White', '#f5f5f5') },
    { id: 'lavender',       name: 'Lavender',       upcharge: 0,    image: PLACEHOLDER_BOX('Lavender', '#dcd3e8') },
    { id: 'birthday',       name: 'Birthday',       upcharge: 4.95, image: PLACEHOLDER_BOX('Birthday', '#f3e1a4') },
    { id: 'red-heart',      name: 'Red Heart',      upcharge: 0,    image: PLACEHOLDER_BOX('Heart', '#e9bcbc') },
    { id: 'square-classic', name: 'Classic Square', upcharge: 0,    image: PLACEHOLDER_BOX('Square', '#dcdcdc') },
  ],

  // ===== FLAVORS =====
  // Categories used in filter chips: milk | dark | white | non-chocolate
  // Badges: 'limited' | 'popular' | null
  flavors: [
    { id: '#12', name: 'Milk California Brittle',  category: 'milk',  badge: 'popular', image: PLACEHOLDER_FLAVOR('#12', '#caa779'),
      desc: 'Crunchy almond brittle wrapped in smooth milk chocolate.',
      ingredients: 'Sugar, cream, almonds, milk chocolate (sugar, cocoa butter, chocolate, milk).',
      allergens: 'Milk, soy, tree nuts (almonds).' },

    { id: '#13', name: 'Milk Bordeaux',            category: 'milk',  badge: 'popular', image: PLACEHOLDER_FLAVOR('#13', '#a87a4f'),
      desc: 'Brown sugar butter cream center coated in milk chocolate.',
      ingredients: 'Sugar, butter, cream, milk chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#14', name: 'Milk Caramel Patty',       category: 'milk',  badge: null,      image: PLACEHOLDER_FLAVOR('#14', '#9a6e3e'),
      desc: 'Soft caramel disc dipped in milk chocolate.',
      ingredients: 'Sugar, corn syrup, cream, milk chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#15', name: 'Milk Butterchew',          category: 'milk',  badge: null,      image: PLACEHOLDER_FLAVOR('#15', '#b8895a'),
      desc: 'Chewy butter caramel in milk chocolate.',
      ingredients: 'Sugar, cream, butter, milk chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#21', name: 'Dark Bordeaux',            category: 'dark',  badge: 'popular', image: PLACEHOLDER_FLAVOR('#21', '#3e2a1a'),
      desc: 'Brown sugar butter cream coated in dark chocolate.',
      ingredients: 'Sugar, cream, butter, dark chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#22', name: 'Dark Scotchmallow',        category: 'dark',  badge: null,      image: PLACEHOLDER_FLAVOR('#22', '#4a2f1c'),
      desc: 'Honey marshmallow + caramel coated in dark chocolate.',
      ingredients: 'Sugar, corn syrup, honey, dark chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#23', name: 'Dark Raspberry Cream',     category: 'dark',  badge: 'limited', image: PLACEHOLDER_FLAVOR('#23', '#5a2030'),
      desc: 'Raspberry cream center dipped in dark chocolate.',
      ingredients: 'Sugar, cream, raspberry, dark chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#31', name: 'White Truffle',            category: 'white', badge: null,      image: PLACEHOLDER_FLAVOR('#31', '#efe7d4'),
      desc: 'Silky vanilla truffle in white chocolate.',
      ingredients: 'Sugar, cream, vanilla, white chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#32', name: 'Strawberry Truffle',       category: 'white', badge: 'limited', image: PLACEHOLDER_FLAVOR('#32', '#e8c2c4'),
      desc: 'Strawberry cream truffle in white chocolate.',
      ingredients: 'Sugar, cream, strawberry, white chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#33', name: 'White Molasses Chips',     category: 'white', badge: null,      image: PLACEHOLDER_FLAVOR('#33', '#d8c69c'),
      desc: 'Molasses brittle chips coated in white chocolate.',
      ingredients: 'Sugar, molasses, butter, white chocolate.',
      allergens: 'Milk, soy.' },

    { id: '#41', name: 'Peanut Brittle',           category: 'non-chocolate', badge: 'popular', image: PLACEHOLDER_FLAVOR('#41', '#d6a55a'),
      desc: 'Crispy peanut brittle, no chocolate coating.',
      ingredients: 'Sugar, corn syrup, peanuts, butter.',
      allergens: 'Peanuts, milk, soy.' },

    { id: '#42', name: 'Almond Royal',             category: 'non-chocolate', badge: null,      image: PLACEHOLDER_FLAVOR('#42', '#c89860'),
      desc: 'Toasted almond + butterscotch hard candy.',
      ingredients: 'Sugar, corn syrup, almonds, butter.',
      allergens: 'Tree nuts (almonds), milk.' },
  ],
};

// Helper accessors
window.SEES_DATA.findStyle  = (id) => window.SEES_DATA.styles.find(s => s.id === id);
window.SEES_DATA.findSize   = (id) => window.SEES_DATA.sizes.find(s => s.id === id);
window.SEES_DATA.findDesign = (id) => window.SEES_DATA.designs.find(d => d.id === id);
window.SEES_DATA.findFlavor = (id) => window.SEES_DATA.flavors.find(f => f.id === id);
