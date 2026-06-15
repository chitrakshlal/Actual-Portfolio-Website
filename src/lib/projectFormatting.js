import { html } from "./html.js";

const PROJECT_KEYWORDS = [
  "Aircraft Maintenance Manuals (AMM)",
  "Aircraft Maintenance Manual (AMM)",
  "MRO (Maintenance, Repair & Overhaul)",
  "AI powered retrieval systems",
  "Aircraft Electrical System Digital Twin",
  "aviation maintenance workflows",
  "Aircraft Electrical System",
  "CATIA Mechanical Design workbenches",
  "Fully constrained sketches and assemblies",
  "Surface and skin modelling techniques",
  "Surface and skin modelling",
  "Aircraft Maintenance Manual",
  "ATA chapter references",
  "design-for-manufacturing",
  "design for manufacturing",
  "engineering visualization",
  "assembly integration",
  "predictive maintenance",
  "real-time simulation",
  "real-time retrieval",
  "inspection procedures",
  "Autodesk Inventor",
  "retrieval accuracy",
  "3D CAD modelling",
  "3D modelling",
  "design visualization",
  "Sheet Metal Design",
  "Mechanical Design",
  "Assembly Design",
  "Part Design",
  "2D engineering drawings",
  "2D technical drawings",
  "aerodynamic modelling",
  "aerofoil profiles",
  "aerofoil design",
  "aerofoil",
  "rapid prototyping",
  "ATA chapters",
  "RAG chatbot",
  "fault modes",
  "Digital Twin",
  "digital twin",
  "structural stability",
  "structural strength",
  "structural support",
  "component alignment",
  "weight distribution",
  "dimensional constraints",
  "dimensional accuracy",
  "wing alignment",
  "lift performance",
  "flight stability",
  "launch performance",
  "riveting points",
  "bending limitations",
  "size restrictions",
  "tolerancing",
  "manufacturability",
  "3D printing",
  "Fully constrained",
  "Streamlit",
  "Drafting",
  "CATIA",
  "real time",
];

const PROJECT_KEYWORD_VARIANTS = [
  ...PROJECT_KEYWORDS,
  "digital twins",
];

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function isKeywordMatch(part) {
  const normalized = part.toLowerCase();
  return PROJECT_KEYWORD_VARIANTS.some((keyword) => normalized === keyword.toLowerCase());
}

export function renderFormattedProjectParagraph(text) {
  const pattern = PROJECT_KEYWORDS
    .slice()
    .sort((a, b) => b.length - a.length)
    .map(escapeRegex)
    .join("|");

  const regex = new RegExp(`(${pattern}|digital twins)`, "gi");
  const parts = text.split(regex).filter((part) => part.length > 0);

  return parts.map((part, index) => (
    isKeywordMatch(part)
      ? html`<strong key=${`${part}-${index}`}>${part}</strong>`
      : part
  ));
}
