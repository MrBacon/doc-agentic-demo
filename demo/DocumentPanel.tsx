// Demo prop: copy this into src/components/ on a branch to trigger the review.
// It breaks every rule in .github/workflows/ui-review.md on purpose.
import { useEffect, useState } from "react";

export function DocumentPanel(props: any) {
  const [docs, setDocs] = useState<any>([]);

  useEffect(() => {
    fetch("https://docconnect-api-uat.azurecontainerapps.io/v1/documents?take=50", {
      headers: { Authorization: "Bearer " + props.token },
    })
      .then((r) => r.json())
      .then((d) => setDocs(d.items));
  }, []);

  const openDoc = (id: any) => {
    fetch("https://docconnect-api-uat.azurecontainerapps.io/v1/documents/" + id)
      .then((r) => r.json())
      .then((d) => props.onOpen(d));
  };

  return (
    <div style={{ padding: 16, background: "#fff", borderRadius: 4 }}>
      <div style={{ fontSize: 20, fontWeight: "bold", marginBottom: 12 }}>
        Documents
      </div>
      {docs.map((d: any) => (
        <div
          key={d.id}
          onClick={() => openDoc(d.id)}
          style={{ padding: 8, cursor: "pointer", borderBottom: "1px solid #eee" }}
        >
          <div style={{ color: "#333" }}>{d.title}</div>
          <div style={{ color: "#999", fontSize: 12 }}>
            {d.repository} — {d.status}
          </div>
        </div>
      ))}
    </div>
  );
}
