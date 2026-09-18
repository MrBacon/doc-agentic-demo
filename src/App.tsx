import { useState } from "react";
import { useDocuments } from "./hooks/useDocuments";
import { DocumentList } from "./components/DocumentList";

export default function App() {
  const [query, setQuery] = useState("");
  const [opened, setOpened] = useState<string | null>(null);
  const { documents, isLoading, error } = useDocuments(query);

  return (
    <main className="shell">
      <header className="masthead">
        <h1>Documents</h1>
        <p className="masthead-sub">
          Everything indexed from Laserfiche, newest change first.
        </p>
      </header>

      <label className="search">
        <span className="search-label">Search documents</span>
        <input
          type="search"
          value={query}
          placeholder="Title, document ID, or repository"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <DocumentList
        documents={documents}
        isLoading={isLoading}
        error={error}
        query={query}
        onOpen={setOpened}
      />

      {opened && (
        <p className="toast" role="status">
          Opened {opened}
        </p>
      )}
    </main>
  );
}
