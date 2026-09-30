// Photos for categories and individual services (files live in public/images/).
// Stock photos from Unsplash (see public/images/CREDITS.txt). To use your own photo,
// put it in public/images/ and change the path here.

const S = "/images/services/";
const I = "/images/services/items/";

// One photo per category (Home page cards, Services page "All" view)
export const CATEGORY_PHOTOS = {
  iron: S + "iron.jpg",
  steel: S + "steel.jpg",
  aluwin: S + "aluwin.jpg",
  aludoor: S + "aludoor.jpg",
  glass: S + "glass.jpg",
  shutter: S + "shutter.jpg",
  wrought: S + "wrought.jpg",
  grills: S + "grills.jpg",
  allsteel: S + "allsteel.jpg",
  fiber: S + "fiber.jpg",
};

// One photo per service (service cards and popups)
export const SERVICE_PHOTOS = {
  // Iron Works
  "Iron Gates": S + "iron.jpg",
  "Wrought Iron Gates": I + "wrought-iron-gates.jpg",
  "Iron Grills": I + "iron-grills.jpg",
  "Iron Railings": I + "iron-railings.jpg",
  "Iron Doors": I + "iron-doors.jpg",
  "Iron Staircases": I + "iron-staircases.jpg",
  // Steel Works
  "MS Steel Fabrication": I + "ms-fabrication.jpg",
  "SS (Stainless Steel) Railings": I + "ss-railings.jpg",
  "SS Gates": I + "ss-gates.jpg",
  "SS Doors": I + "ss-doors.jpg",
  "Steel Structures and Sheds": S + "steel.jpg",
  "All Steel Work (Custom)": I + "custom-steel.jpg",
  // Aluminium Windows
  "Sliding Windows": S + "aluwin.jpg",
  "Casement Windows": I + "casement-windows.jpg",
  "Fixed Windows": I + "fixed-windows.jpg",
  "Tilt and Turn Windows": I + "tilt-turn-windows.jpg",
  "Aluminium Window Grills": I + "window-grills-alu.jpg",
  // Aluminium Doors
  "Sliding Doors": I + "sliding-doors.jpg",
  "Hinged Doors": S + "aludoor.jpg",
  "Folding Doors": I + "folding-doors.jpg",
  "Bathroom Doors": I + "bathroom-doors.jpg",
  "Aluminium Partition Doors": I + "partition-doors.jpg",
  // Glass Work
  "Glass Doors": I + "glass-doors.jpg",
  "Glass Partitions": S + "glass.jpg",
  "Glass Railings": S + "railing.jpg",
  "Shower Cabins": S + "shower.jpg",
  "Glass Facade and Curtain Wall": I + "glass-facade.jpg",
  "Tempered Glass": I + "tempered-glass.jpg",
  // Shutter Gates
  "Rolling Shutters": I + "rolling-shutters.jpg",
  "Shop Shutters": S + "shutter.jpg",
  "Garage Shutters": I + "garage-shutters.jpg",
  "Automatic Shutters": I + "automatic-shutters.jpg",
  // Wrought Iron Gates
  "Main Entrance Gates": S + "wrought.jpg",
  "Sliding Gates": I + "sliding-gates.jpg",
  "Swing Gates": I + "swing-gates.jpg",
  "Designer Gates": "/images/projects/designer-gate.jpg",
  // Grills
  "Window Grills": I + "window-grills.jpg",
  "Balcony Grills": S + "grills.jpg",
  "Door Grills": I + "door-grills.jpg",
  "Safety Grills": I + "safety-grills.jpg",
  "Decorative Grills": I + "decorative-grills.jpg",
  // All Steel Work
  "Steel Shelving and Racks": S + "allsteel.jpg",
  "Steel Tables and Furniture": I + "steel-tables.jpg",
  "Steel Tanks": I + "steel-tanks.jpg",
  "Steel Trusses": I + "steel-trusses.jpg",
  "Steel Canopies": I + "steel-canopies.jpg",
  // Fiber Glass
  "Fiber Glass Sheets": S + "fiber.jpg",
  "Fiber Glass Roofing": I + "fiber-roofing.jpg",
  "Fiber Glass Sheds": I + "fiber-sheds.jpg",
  "Fiber Glass Doors": I + "fiber-doors.jpg",
};

export const photoFor = (cat, name) => SERVICE_PHOTOS[name] || CATEGORY_PHOTOS[cat];
