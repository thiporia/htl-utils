import TestUI from "./TestUI";
import { contextHandlers } from "./contextHandlers";
import { contexts } from "./data";

export default function App() {
  const showDemo = true;

  return (
    <>
      {showDemo && <TestUI />}
      <h1>references</h1>
      {contexts.map(({ name, input }) => (
        <div
          key={name}
          style={{
            marginBottom: "1rem",
            padding: "1rem",
            border: "1px solid #ccc",
          }}
        >
          <h2>{name}</h2>
          <pre>
            <strong>Input:</strong> {JSON.stringify(input)}
          </pre>
          <div>
            <strong>Output:</strong> {contextHandlers[name](input)}
          </div>
        </div>
      ))}
    </>
  );
}
