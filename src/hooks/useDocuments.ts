import { useEffect, useState } from "react";
import { fetchDocuments, type DocumentSummary } from "../api/client";

type State = {
  documents: DocumentSummary[];
  isLoading: boolean;
  error: string | null;
};

export function useDocuments(query: string): State {
  const [state, setState] = useState<State>({
    documents: [],
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    fetchDocuments(query)
      .then((documents) => {
        if (cancelled) return;
        setState({ documents, isLoading: false, error: null });
      })
      .catch(() => {
        if (cancelled) return;
        setState({
          documents: [],
          isLoading: false,
          error: "Documents could not be loaded. Try again in a moment.",
        });
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return state;
}
