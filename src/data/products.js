// Fixed Scenario 1 menu. Prices are stored in centavos (₱1.00 = 100)
// so later cart math uses whole numbers and avoids floating-point errors.
export const products = [
  { id: 'rice-plain', name: 'Rice (Plain)', category: 'Sides', priceCentavos: 1500 },
  { id: 'fried-chicken', name: 'Fried Chicken (1 pc)', category: 'Mains', priceCentavos: 6500 },
  { id: 'pork-adobo', name: 'Pork Adobo', category: 'Mains', priceCentavos: 6000 },
  { id: 'vegetable-side', name: 'Vegetable Side Dish', category: 'Sides', priceCentavos: 3500 },
  { id: 'iced-tea', name: 'Iced Tea (cup)', category: 'Drinks', priceCentavos: 2000 },
  { id: 'bottled-water', name: 'Bottled Water', category: 'Drinks', priceCentavos: 2000 },
]

// Order in which the menu groups are shown.
export const categories = ['Mains', 'Sides', 'Drinks']
