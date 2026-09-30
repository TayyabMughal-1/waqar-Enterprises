// Questions the order form asks, grouped by type of work (from the proposal).
// Field types: "num" (number + unit), "pills" (tap options), "sel" (dropdown), "text".

const num = (id, label, unit = "") => ({ id, label, type: "num", unit });
const pills = (id, label, opts) => ({ id, label, type: "pills", opts });
const sel = (id, label, opts) => ({ id, label, type: "sel", opts });
const text = (id, label, placeholder = "") => ({ id, label, type: "text", placeholder });

export const FORM_GROUPS = {
  gates: {
    title: "Gates, doors & railings",
    fields: [
      num("w", "Opening width", "ft"),
      num("h", "Height", "ft"),
      pills("style", "Style", ["Modern", "Classic", "Designer"]),
      sel("mat", "Material", ["MS (mild steel)", "SS 304", "SS 316", "Wrought iron", "Not sure"]),
      sel("fin", "Finish", ["Enamel paint", "Powder coat", "SS hairline", "SS mirror", "Not sure"]),
      pills("auto", "Automation", ["No", "Yes", "Not sure"]),
    ],
  },
  windows: {
    title: "Windows & aluminium doors",
    fields: [
      num("units", "Number of units"),
      num("w", "Width (each)", "ft"),
      num("h", "Height (each)", "ft"),
      pills("open", "Opening type", ["Sliding", "Casement", "Fixed", "Tilt & turn", "Folding"]),
      sel("glass", "Glass", ["Clear 5 mm", "Tinted", "Tempered 8 mm", "Frosted"]),
      sel("col", "Frame colour", ["Silver", "Black", "Champagne", "White", "Wood grain"]),
      sel("floor", "Floor level", ["Ground", "1st", "2nd", "3rd or above"]),
      pills("new", "Job type", ["New", "Replacement"]),
    ],
  },
  glass: {
    title: "Glass work & shower cabins",
    fields: [
      num("w", "Width", "ft"),
      num("h", "Height", "ft"),
      pills("thk", "Thickness", ["8 mm", "10 mm", "12 mm", "Not sure"]),
      pills("frame", "System", ["Frameless", "Semi-frameless", "Framed"]),
      sel("hw", "Hardware finish", ["Chrome", "Satin", "Black", "Gold"]),
      pills("priv", "Privacy", ["Clear", "Frosted band", "Fully frosted"]),
      sel("room", "Room type", ["Bathroom", "Office", "Shop front", "Staircase", "Balcony", "Other"]),
    ],
  },
  shutters: {
    title: "Shutters & grills",
    fields: [
      num("w", "Opening width", "ft"),
      num("h", "Height", "ft"),
      num("qty", "Quantity"),
      pills("op", "Operation", ["Manual", "Chain", "Motorised"]),
      pills("sec", "Security level", ["Standard", "Heavy duty"]),
      text("col", "Colour", "e.g. grey, black"),
      sel("loc", "Location", ["Shop", "Garage", "Warehouse", "Home window", "Balcony"]),
    ],
  },
  struct: {
    title: "Steel structures, sheds & fiber glass",
    fields: [
      num("area", "Covered area", "sq ft"),
      num("h", "Height", "ft"),
      text("use", "Purpose", "e.g. car parking, warehouse"),
      sel("roof", "Roofing", ["Steel sheet", "Fiber glass sheet", "Open / none", "Not sure"]),
      sel("acc", "Site access", ["Easy", "Narrow street", "Upper floor / roof"]),
      text("load", "Load or special needs", "e.g. heavy racks, solar panels"),
    ],
  },
};

// Which question group a service uses.
const CATEGORY_GROUP = {
  iron: "gates", steel: "struct", aluwin: "windows", aludoor: "windows", glass: "glass",
  shutter: "shutters", wrought: "gates", grills: "shutters", allsteel: "struct", fiber: "struct",
};

export function groupFor(catKey, serviceName) {
  if (/Gate|Railing|Door|Staircase/.test(serviceName) && ["iron", "steel", "wrought"].includes(catKey)) {
    return "gates";
  }
  return CATEGORY_GROUP[catKey];
}

export const CONTACT_FIELDS = {
  when: sel("when", "When do you need it?", ["As soon as possible", "Within 2 weeks", "Within a month", "Just getting prices"]),
};
