// 10 categories, 50 services (from the proposal's website architecture).
// key   – short id (photos for each service are set in data/photos.js)
// spec  – "Typical options" shown in the service popup
// items – [service name, one-line description]

export const CATEGORIES = [
  {
    key: "iron",
    name: "Iron Works",
    summary: "Gates, grills, railings, doors and stairs in mild steel and iron.",
    spec: [
      'MS pipe 1"–2", 16–18 gauge',
      'Box section 1"×1" to 2"×4"',
      "Red-oxide primer + 2 coats enamel",
      "Optional powder coat",
    ],
    items: [
      ["Iron Gates", "Main and side gates in MS box and pipe, made to your opening."],
      ["Wrought Iron Gates", "Forged scrolls, spears and collars for a classic look."],
      ["Iron Grills", "Window and ventilator grills that add security without blocking light."],
      ["Iron Railings", "Stair, balcony and roof railings with handrails at a safe height."],
      ["Iron Doors", "Solid sheet or grill doors for stores, rooftops and back entrances."],
      ["Iron Staircases", "Straight, L-shaped and spiral stairs with chequered or wooden treads."],
    ],
  },
  {
    key: "steel",
    name: "Steel Works",
    summary: "MS fabrication and stainless steel railings, gates and structures.",
    spec: [
      "SS 304 for indoor / general use",
      "SS 316 for coastal or heavy use",
      "Hairline or mirror finish",
      "MS I-beams, channels and angles",
    ],
    items: [
      ["MS Steel Fabrication", "Custom mild steel work cut and welded to drawing."],
      ["SS (Stainless Steel) Railings", "Rust-free stair and balcony railings with glass or rod infill."],
      ["SS Gates", "Modern stainless gates with a hairline or mirror finish."],
      ["SS Doors", "Stainless doors for kitchens, labs and commercial spaces."],
      ["Steel Structures and Sheds", "Portal frames and sheds for warehouses, parking and workshops."],
      ["All Steel Work (Custom)", "One-off steel pieces made to your sketch or requirement."],
    ],
  },
  {
    key: "aluwin",
    name: "Aluminium Windows",
    summary: "Sliding, casement, fixed and tilt-and-turn windows.",
    spec: [
      "Profiles in silver, black, champagne, wood grain",
      "Clear, tinted, frosted or tempered glass",
      "Rubber gaskets + weather seals",
      "Fly mesh on request",
    ],
    items: [
      ["Sliding Windows", "Smooth-running two and three track sliders for every room."],
      ["Casement Windows", "Side-hung windows that open fully for air and seal tight when shut."],
      ["Fixed Windows", "Non-opening panes for maximum light and view."],
      ["Tilt and Turn Windows", "Tilt for ventilation or swing open for cleaning."],
      ["Aluminium Window Grills", "Slim aluminium security grills that match your frames."],
    ],
  },
  {
    key: "aludoor",
    name: "Aluminium Doors",
    summary: "Sliding, hinged, folding, bathroom and partition doors.",
    spec: [
      "Heavy-duty sliding tracks and rollers",
      "Multi-point or mortise locks",
      "Glass or ACP panel infill",
      "Frame colours to match windows",
    ],
    items: [
      ["Sliding Doors", "Large glass sliders for lounges, terraces and balconies."],
      ["Hinged Doors", "Single and double swing doors with strong hinges."],
      ["Folding Doors", "Bi-fold panels that stack to one side for a wide opening."],
      ["Bathroom Doors", "Water-proof aluminium doors that never swell or rot."],
      ["Aluminium Partition Doors", "Doors that fit into office and shop partitions."],
    ],
  },
  {
    key: "glass",
    name: "Glass Work",
    summary: "Glass doors, partitions, railings, cabins and facades.",
    spec: [
      "Tempered glass 8 / 10 / 12 mm",
      "Clear, frosted band or full frost",
      "Chrome, satin, black or gold fittings",
      "Frameless or framed systems",
    ],
    items: [
      ["Glass Doors", "Frameless tempered doors with patch fittings and floor springs."],
      ["Glass Partitions", "Office and room dividers that keep spaces bright."],
      ["Glass Railings", "Clean stair and balcony railings with SS spigots or channels."],
      ["Shower Cabins", "Frameless and framed enclosures sized to your bathroom."],
      ["Glass Facade and Curtain Wall", "Building fronts with structural glazing systems."],
      ["Tempered Glass", "Toughened glass cut and supplied for tables, shelves and panels."],
    ],
  },
  {
    key: "shutter",
    name: "Shutter Gates",
    summary: "Rolling, shop, garage and motorised shutters.",
    spec: [
      "Galvanised or MS slats",
      "Manual, chain or motorised operation",
      "Side guides + bottom lock",
      "Paint or powder coat finish",
    ],
    items: [
      ["Rolling Shutters", "Durable roll-up shutters for any wide opening."],
      ["Shop Shutters", "Secure shop fronts with strong locks and smooth rolling."],
      ["Garage Shutters", "Space-saving shutters for home garages."],
      ["Automatic Shutters", "Motorised shutters with remote control."],
    ],
  },
  {
    key: "wrought",
    name: "Wrought Iron Gates",
    summary: "Main entrance, sliding, swing and designer gates.",
    spec: [
      "Forged scrolls, leaves and spears",
      "Sliding track or swing hinge",
      "Gate motor ready",
      "Black, bronze or two-tone finish",
    ],
    items: [
      ["Main Entrance Gates", "A strong first impression for your home."],
      ["Sliding Gates", "Gates that run on a track where there is no room to swing."],
      ["Swing Gates", "Single and double leaf gates on heavy-duty hinges."],
      ["Designer Gates", "Custom patterns, laser-cut panels and name plates."],
    ],
  },
  {
    key: "grills",
    name: "Grills",
    summary: "Window, balcony, door, safety and decorative grills.",
    spec: [
      "Square bar 12 mm / flat bar patterns",
      "Fixed or openable frames",
      "Anti-cut designs for ground floors",
      "Matching colour to frames",
    ],
    items: [
      ["Window Grills", "Security for every window in plain or patterned designs."],
      ["Balcony Grills", "Enclosures that keep children and pets safe."],
      ["Door Grills", "A second grill door for air flow with security."],
      ["Safety Grills", "Heavy grills for ground floors, shops and stores."],
      ["Decorative Grills", "Patterned grills that add character to the facade."],
    ],
  },
  {
    key: "allsteel",
    name: "All Steel Work",
    summary: "Racks, furniture, tanks, trusses and canopies.",
    spec: [
      "Angle, channel and pipe sections",
      "Bolted or welded construction",
      "Load-rated shelving",
      "Primer + paint or galvanised",
    ],
    items: [
      ["Steel Shelving and Racks", "Storage racks for shops, stores and warehouses."],
      ["Steel Tables and Furniture", "Work tables, benches and custom steel furniture."],
      ["Steel Tanks", "Water and storage tanks welded to size."],
      ["Steel Trusses", "Roof trusses for sheds, halls and factories."],
      ["Steel Canopies", "Entrance, car porch and walkway canopies."],
    ],
  },
  {
    key: "fiber",
    name: "Fiber Glass",
    summary: "Sheets, roofing, sheds and doors in fiber glass.",
    spec: [
      "Translucent and opaque sheets",
      "UV-protected surface",
      "Corrugated or flat profiles",
      "Steel or aluminium framing",
    ],
    items: [
      ["Fiber Glass Sheets", "Light, weather-proof sheets in many colours."],
      ["Fiber Glass Roofing", "Roofs that let light in and keep rain out."],
      ["Fiber Glass Sheds", "Car porch, terrace and parking sheds."],
      ["Fiber Glass Doors", "Moisture-proof doors for bathrooms and utility areas."],
    ],
  },
];

export const CATEGORY_BY_KEY = Object.fromEntries(CATEGORIES.map((c) => [c.key, c]));

export const ALL_SERVICES = CATEGORIES.flatMap((c) =>
  c.items.map(([name, desc], index) => ({ name, desc, cat: c.key, index }))
);
