import { useState } from "react";

import "./App.css";
import { useTransition } from "react";

function App() {
  const [show, setShow] = useState("A");
  const [show2, setShow2] = useState("A");
  const [isPending, startTransition] = useTransition();

  function handleShow(a) {
    startTransition(() => {
      setShow(a);
    });
  }

  function handleShow2(a) {
    setShow2(a);
  }

  return (
    <>
      <div>
        <button
          style={{ background: show === "A" ? "red" : "blue" }}
          onClick={() => handleShow("A")}
        >
          Show A
        </button>
        <button
          style={{ background: show === "B" ? "red" : "blue" }}
          onClick={() => handleShow("B")}
        >
          Show B
        </button>
        <button
          style={{ background: show === "C" ? "red" : "blue" }}
          onClick={() => handleShow("C")}
        >
          Show C
        </button>
        {show}
        {show === "A" && <CompA />}
        {show === "B" && <CompB />}
        {show === "C" && <CompC />}
      </div>
      <div>
        <button
          style={{ background: show === "B" ? "yellow" : "green" }}
          onClick={() => handleShow2("A")}
        >
          Show A2
        </button>
        <button
          style={{ background: show === "B" ? "yellow" : "green" }}
          onClick={() => handleShow2("B")}
        >
          Show B2
        </button>
        <button
          style={{ background: show === "B" ? "yellow" : "green" }}
          onClick={() => handleShow2("C")}
        >
          Show C2
        </button>
        {show2}
        {show2 === "A" && <CompA />}
        {show2 === "B" && <CompB />}
        {show2 === "C" && <CompC />}
      </div>
    </>
  );
}

function CompA() {
  return <h1>Component A</h1>;
}

function CompC() {
  return <h1>Component C</h1>;
}

function CompB() {
  // Simulate a more expensive computation

  return (
    <>
      <h1>Component B - Slow One</h1>
      <div style={{ position: "absolute" }}>
        <SlowComponent />
      </div>
    </>
  );
}

function SlowComponent() {
  const list = Array(500)
    .fill(0)
    .map((_, i) => i * Math.random());

  return (
    <>
      {list.map((item, index) => (
        <SlowItem item={item} key={index} />
      ))}
    </>
  );
}

function SlowItem({ item }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 2) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <div>{item}</div>;
}

export default App;
