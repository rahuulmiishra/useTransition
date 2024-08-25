import { useState } from "react";

import "./App.css";
import { useTransition } from "react";

function App() {
  const [search, setSearch] = useState("");
  const [list, setList] = useState([]);

  function handleInput(e) {
    setSearch(e.target.value);
    setList([...new Array(1000)]);
  }

  return (
    <>
      <input
        placeholder="enter text to see slow loading..."
        type="text"
        value={search}
        onInput={handleInput}
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
