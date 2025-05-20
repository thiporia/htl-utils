import { useState } from "react";
import { contextHandlers } from "./contextHandlers";

const allContexts = Object.keys(contextHandlers);

export default function TestUI() {
  const [input, setInput] = useState("");
  const [context, setContext] = useState("text");

  const output = contextHandlers[context](input);

  return (
    <div
      style={{
        padding: "1rem",
        marginTop: "2rem",
        borderTop: "2px solid #ccc",
      }}
    >
      <h2>🔍 HTL Context Playground</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label>Input Text:</label>
        <br />
        <textarea
          rows={4}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: "100%", fontFamily: "monospace" }}
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label>HTL Context:</label>
        <br />
        <select value={context} onChange={(e) => setContext(e.target.value)}>
          {allContexts.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div
        style={{
          padding: "1rem",
          background: "#f4f4f4",
          border: "1px solid #ddd",
        }}
      >
        <h4>Output:</h4>
        <div>{output}</div>
      </div>
    </div>
  );
}
