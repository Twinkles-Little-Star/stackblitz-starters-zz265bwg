export default function SnapshotPage() {
  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Snapshot</h1>
      <p>Your Snapshot route is working.</p>
    </div>
"use client";

import { useState } from "react";

export default function SnapshotPage() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/snapshot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: input }),
      });

      if (!res.ok) {
        throw new Error("Snapshot request failed");
      }

      const data = await res.json();
      setResult(data.message || "Snapshot saved successfully.");
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>Snapshot</h1>

      <p style={{ marginBottom: "1.5rem", opacity: 0.8 }}>
        Enter your Snapshot text below. It will be saved and processed through your API route.
      </p>

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your Snapshot here..."
          style={{
            width: "100%",
            height: "150px",
            padding: "1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
            marginBottom: "1rem",
          }}
        />

        <button
          type="submit"
          disabled={loading || !input.trim()}
          style={{
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            borderRadius: "8px",
            background: loading ? "#999" : "#000",
            color: "#fff",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Saving..." : "Save Snapshot"}
        </button>
      </form>

      {error && (
        <div
          style={{
            padding: "1rem",
            background: "#ffe5e5",
            borderRadius: "8px",
            marginBottom: "1rem",
            color: "#b00000",
          }}
        >
          {error}
        </div>
      )}

      {result && (
        <div
          style={{
            padding: "1rem",
            background: "#e8ffe8",
            borderRadius: "8px",
            color: "#006600",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
}

