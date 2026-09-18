import type { DocumentSummary } from "../api/client";

const STATUS_LABEL: Record<DocumentSummary["status"], string> = {
  indexed: "Indexed",
  scanning: "Scanning",
  quarantined: "Quarantined",
};

function formatUpdated(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

interface Props {
  document: DocumentSummary;
  onOpen: (id: string) => void;
}

export function DocumentRow({ document, onOpen }: Props) {
  return (
    <li className="row">
      <button
        type="button"
        className="row-open"
        onClick={() => onOpen(document.id)}
      >
        <span className="row-title">{document.title}</span>
        <span className="row-meta">
          {document.id} in {document.repository}
        </span>
      </button>

      <span className={`status status-${document.status}`}>
        {STATUS_LABEL[document.status]}
      </span>

      <span className="row-updated">
        {formatUpdated(document.updatedAt)} by {document.updatedBy}
      </span>
    </li>
  );
}
