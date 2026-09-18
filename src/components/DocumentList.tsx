import type { DocumentSummary } from "../api/client";
import { DocumentRow } from "./DocumentRow";

interface Props {
  documents: DocumentSummary[];
  isLoading: boolean;
  error: string | null;
  query: string;
  onOpen: (id: string) => void;
}

export function DocumentList({ documents, isLoading, error, query, onOpen }: Props) {
  if (isLoading) {
    return (
      <p className="state" role="status">
        Loading documents…
      </p>
    );
  }

  if (error) {
    return (
      <p className="state state-error" role="alert">
        {error}
      </p>
    );
  }

  if (documents.length === 0) {
    return (
      <p className="state">
        Nothing matches “{query}”. Try a document ID or a repository name.
      </p>
    );
  }

  return (
    <ul className="list">
      {documents.map((doc) => (
        <DocumentRow key={doc.id} document={doc} onOpen={onOpen} />
      ))}
    </ul>
  );
}
