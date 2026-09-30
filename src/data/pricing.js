// ============================================================
//  PRICE ESTIMATOR RATES — set these to YOUR real prices.
//  All amounts are in Pakistani Rupees and include fabrication + installation.
//  The site shows a LOW–HIGH range; the final price is confirmed after a site visit.
// ============================================================
//
//  measure:  "area"   → width × height in feet      (rate per sq ft)
//            "length" → running length in feet      (rate per running ft)
//            "cover"  → length × width covered area (rate per sq ft)
//  rate:     [low, high] per sq ft or per running ft, for the basic option
//  options:  each choice multiplies the rate, e.g. 1.2 = 20% more
//  extras:   fixed add-ons [low, high], charged once per unit (× quantity)
//  cat/service: which quote-form service the "Get exact quote" button pre-fills
//  photo:    picture shown for this job type
//  presets:  common sizes, [label, first size, second size] in feet (second is 0 for railings)

export const MIN_JOB = 15000; // smallest job we take, in Rs
export const PRICES_UPDATED = "October 2026";

export const ESTIMATES = [
  {
    id: "ms-gate",
    photo: "/images/services/iron.jpg",
    presets: [["Single door gate", 4, 7], ["Car gate", 10, 7], ["Main double gate", 14, 8]],
    label: "MS / iron gate",
    cat: "iron",
    service: "Iron Gates",
    measure: "area",
    rate: [1100, 1600],
    options: [
      { id: "design", label: "Design", choices: [["Simple bars / sheet", 1], ["Modern slats / box pattern", 1.15], ["Designer / laser-cut panel", 1.4]] },
      { id: "finish", label: "Finish", choices: [["Primer + enamel paint", 1], ["Powder coat", 1.12]] },
    ],
    extras: [{ id: "motor", label: "Automatic gate motor + remote", price: [90000, 180000] }],
  },
  {
    id: "wrought-gate",
    photo: "/images/services/wrought.jpg",
    presets: [["Garden gate", 4, 6], ["Car gate", 10, 7], ["Grand entrance", 16, 10]],
    label: "Wrought iron gate",
    cat: "wrought",
    service: "Main Entrance Gates",
    measure: "area",
    rate: [1800, 3000],
    options: [
      { id: "design", label: "Design", choices: [["Classic scrolls", 1], ["Heavy ornamental", 1.3]] },
      { id: "finish", label: "Finish", choices: [["Black enamel", 1], ["Black + gold highlights", 1.1], ["Powder coat", 1.12]] },
    ],
    extras: [{ id: "motor", label: "Automatic gate motor + remote", price: [90000, 180000] }],
  },
  {
    id: "ss-gate",
    photo: "/images/services/items/ss-gates.jpg",
    presets: [["Single door gate", 4, 7], ["Car gate", 10, 7], ["Main double gate", 14, 8]],
    label: "Stainless steel gate",
    cat: "steel",
    service: "SS Gates",
    measure: "area",
    rate: [3800, 5800],
    options: [
      { id: "grade", label: "Steel grade", choices: [["SS 304", 1], ["SS 316 (coastal / heavy use)", 1.35]] },
      { id: "finish", label: "Finish", choices: [["Hairline (brushed)", 1], ["Mirror", 1.12]] },
    ],
    extras: [{ id: "motor", label: "Automatic gate motor + remote", price: [90000, 180000] }],
  },
  {
    id: "railing",
    photo: "/images/services/items/iron-railings.jpg",
    presets: [["One stair flight", 12, 0], ["Balcony", 20, 0], ["Full staircase", 40, 0]],
    label: "Stair / balcony railing",
    cat: "iron",
    service: "Iron Railings",
    measure: "length",
    rate: [1400, 2200],
    options: [
      { id: "material", label: "Material", choices: [["MS pipe / flat bar", 1], ["SS 304", 2.6], ["SS 304 + tempered glass", 4.2]] },
    ],
    extras: [],
  },
  {
    id: "grill",
    photo: "/images/services/items/window-grills.jpg",
    presets: [["Small window", 3, 3], ["Standard window", 4, 4], ["Large window", 6, 5]],
    label: "Window / safety grill",
    cat: "grills",
    service: "Window Grills",
    measure: "area",
    rate: [550, 950],
    options: [
      { id: "design", label: "Design", choices: [["Plain square bar", 1], ["Decorative pattern", 1.3], ["Laser-cut panel", 1.8]] },
    ],
    extras: [],
  },
  {
    id: "alu-window",
    photo: "/images/services/items/sliding-windows.jpg",
    presets: [["Small window", 3, 3], ["Standard window", 4, 4], ["Large window", 6, 5]],
    label: "Aluminium window",
    cat: "aluwin",
    service: "Sliding Windows",
    measure: "area",
    rate: [1200, 1900],
    options: [
      { id: "type", label: "Opening type", choices: [["Sliding", 1], ["Casement", 1.1], ["Fixed", 0.85], ["Tilt & turn", 1.45]] },
      { id: "glass", label: "Glass", choices: [["Clear 5 mm", 1], ["Tinted 5 mm", 1.05], ["Tempered 8 mm", 1.2], ["Double glazed", 1.6]] },
      { id: "section", label: "Profile", choices: [["Standard section", 1], ["Heavy section", 1.25]] },
    ],
    extras: [],
  },
  {
    id: "alu-door",
    photo: "/images/services/aludoor.jpg",
    presets: [["Single door", 3, 7], ["Double door", 6, 7], ["Wide sliding", 10, 8]],
    label: "Aluminium / glass door",
    cat: "aludoor",
    service: "Sliding Doors",
    measure: "area",
    rate: [1500, 2400],
    options: [
      { id: "type", label: "Door type", choices: [["Sliding", 1], ["Hinged", 1.05], ["Folding (bi-fold)", 1.35]] },
      { id: "glass", label: "Glass", choices: [["Clear 5 mm", 1], ["Tempered 8 mm", 1.15], ["Frosted", 1.08]] },
    ],
    extras: [],
  },
  {
    id: "glass-partition",
    photo: "/images/services/glass.jpg",
    presets: [["Small office", 10, 9], ["Meeting room", 16, 9], ["Large wall", 24, 10]],
    label: "Glass partition",
    cat: "glass",
    service: "Glass Partitions",
    measure: "area",
    rate: [1500, 2400],
    options: [
      { id: "thickness", label: "Glass", choices: [["10 mm tempered", 1], ["12 mm tempered", 1.15]] },
      { id: "privacy", label: "Privacy", choices: [["Clear", 1], ["Frosted band", 1.08], ["Fully frosted", 1.15]] },
    ],
    extras: [{ id: "door", label: "Glass door with patch fittings", price: [45000, 85000] }],
  },
  {
    id: "shower",
    photo: "/images/services/shower.jpg",
    presets: [["Compact", 3, 6.5], ["Standard", 4, 7], ["Walk-in", 5, 7]],
    label: "Shower cabin",
    cat: "glass",
    service: "Shower Cabins",
    measure: "area",
    rate: [2000, 3200],
    options: [
      { id: "system", label: "System", choices: [["Frameless", 1], ["Semi-frameless", 0.9], ["Framed", 0.8]] },
      { id: "fittings", label: "Fittings", choices: [["Chrome", 1], ["Black / gold", 1.15]] },
    ],
    extras: [],
  },
  {
    id: "shutter",
    photo: "/images/services/shutter.jpg",
    presets: [["Small shop", 8, 8], ["Standard shop", 10, 10], ["Garage / godown", 14, 12]],
    label: "Rolling shutter",
    cat: "shutter",
    service: "Rolling Shutters",
    measure: "area",
    rate: [750, 1150],
    options: [
      { id: "slat", label: "Slats", choices: [["Galvanised steel", 1], ["Heavy-duty MS", 1.2]] },
      { id: "operation", label: "Operation", choices: [["Manual (push-up)", 1], ["Chain", 1.1]] },
    ],
    extras: [{ id: "motor", label: "Shutter motor + remote", price: [70000, 140000] }],
  },
  {
    id: "shed",
    photo: "/images/services/items/steel-structures.jpg",
    presets: [["Car porch", 20, 12], ["Small godown", 40, 30], ["Warehouse", 100, 60]],
    label: "Steel shed / structure",
    cat: "steel",
    service: "Steel Structures and Sheds",
    measure: "cover",
    rate: [750, 1400],
    options: [
      { id: "roof", label: "Roofing", choices: [["Steel sheet", 1], ["Fiber glass sheet", 1.05], ["Insulated sandwich panel", 1.35]] },
      { id: "height", label: "Height", choices: [["Up to 12 ft", 1], ["12–20 ft", 1.2], ["Above 20 ft", 1.4]] },
    ],
    extras: [],
  },
  {
    id: "fiber-roof",
    photo: "/images/services/fiber.jpg",
    presets: [["Car porch", 20, 12], ["Terrace", 25, 15], ["Parking shed", 40, 20]],
    label: "Fiber glass roof / porch",
    cat: "fiber",
    service: "Fiber Glass Roofing",
    measure: "cover",
    rate: [650, 1100],
    options: [
      { id: "sheet", label: "Sheet", choices: [["Standard fiber glass", 1], ["UV-protected polycarbonate", 1.2]] },
      { id: "frame", label: "Frame", choices: [["MS frame, painted", 1], ["Aluminium frame", 1.25]] },
    ],
    extras: [],
  },
  {
    id: "racks",
    photo: "/images/services/items/steel-shelving.jpg",
    presets: [["One bay", 6, 7], ["Shop wall", 12, 7], ["Store room", 24, 8]],
    label: "Steel racks / shelving",
    cat: "allsteel",
    service: "Steel Shelving and Racks",
    measure: "area",
    rate: [900, 1500],
    options: [
      { id: "duty", label: "Load", choices: [["Light / medium duty", 1], ["Heavy duty (pallet)", 1.35]] },
      { id: "finish", label: "Finish", choices: [["Primer + paint", 1], ["Powder coat", 1.1]] },
    ],
    extras: [],
  },
];

export const MEASURE_LABELS = {
  area: { a: "Width", b: "Height", unit: "sq ft" },
  cover: { a: "Length", b: "Width", unit: "sq ft" },
  length: { a: "Running length", unit: "running ft" },
};
