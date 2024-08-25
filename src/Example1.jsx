import { useState } from "react";

import "./App.css";
import { useTransition } from "react";

function App() {
  const [isPending, startTransition] = useTransition();
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  function handleInput(e) {
    setSearch(e.target.value);

    startTransition(() => {
      setList(() => {
        return [...new Array(1000)];
      });
    });
  }

  function handleInputWithoutTransition(e) {
    setSearch(e.target.value);

    setList(() => {
      return [...new Array(1000)];
    });
  }

  return (
    <>
      <input
        placeholder="with transition"
        type="text"
        value={search}
        onInput={handleInput}
      />
      <input
        placeholder="without transition"
        type="text"
        value={search}
        onInput={handleInputWithoutTransition}
      />
      <div>
        {list.map((d, i) => {
          return <Item d={i} key={i} />;
        })}
      </div>
    </>
  );
}

function Item({ d }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }
  return <h4>{d * Math.random().toFixed(2)}</h4>;
}

export default App;
