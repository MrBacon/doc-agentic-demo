/**
 * The only place in the app that talks to the network.
 * Components and hooks call these functions; nothing calls fetch directly.
 */

export type DocumentStatus = "indexed" | "scanning" | "quarantined";

export interface DocumentSummary {
  id: string;
  title: string;
  repository: string;
  status: DocumentStatus;
  sizeKb: number;
  updatedAt: string;
  updatedBy: string;
}

const BFF_BASE_URL = "/bff/api";

/** Stand-in for the BFF while this demo runs without a backend. */
const SEED: DocumentSummary[] = [
  {
    id: "DOC-4821",
    title: "Registered agent appointment — Delaware",
    repository: "Corporate Filings",
    status: "indexed",
    sizeKb: 284,
    updatedAt: "2026-09-16T09:12:00Z",
    updatedBy: "j.deboer",
  },
  {
    id: "DOC-4822",
    title: "Annual report worksheet FY25",
    repository: "Corporate Filings",
    status: "scanning",
    sizeKb: 1140,
    updatedAt: "2026-09-17T14:48:00Z",
    updatedBy: "s.nair",
  },
  {
    id: "DOC-4823",
    title: "Trademark renewal notice — EUIPO",
    repository: "Brand Services",
    status: "indexed",
    sizeKb: 96,
    updatedAt: "2026-09-15T08:30:00Z",
    updatedBy: "m.oconnell",
  },
  {
    id: "DOC-4824",
    title: "Scanned intake bundle (unverified sender)",
    repository: "Intake",
    status: "quarantined",
    sizeKb: 5320,
    updatedAt: "2026-09-18T06:05:00Z",
    updatedBy: "intake-service",
  },
  {
    id: "DOC-4825",
    title: "Board resolution — treasury signatories",
    repository: "Entity Management",
    status: "indexed",
    sizeKb: 412,
    updatedAt: "2026-09-12T16:20:00Z",
    updatedBy: "j.deboer",
  },
];

export async function fetchDocuments(query: string): Promise<DocumentSummary[]> {
  void BFF_BASE_URL; // real build calls the BFF here
  await new Promise((resolve) => setTimeout(resolve, 450));

  const term = query.trim().toLowerCase();
  if (!term) return SEED;

  return SEED.filter(
    (doc) =>
      doc.title.toLowerCase().includes(term) ||
      doc.repository.toLowerCase().includes(term) ||
      doc.id.toLowerCase().includes(term)
  );
}
