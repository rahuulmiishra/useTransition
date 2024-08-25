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
      const arr = [];
      for (i = 0; i < 20000; i++) {
        arr.push(e.target.value);
      }
      setList(arr);
    });
  }

  function handleInputWithoutTransition(e) {
    setSearch(e.target.value);

    const arr = [];
    for (i = 0; i < 20000; i++) {
      arr.push(e.target.value);
    }
    setList(arr);
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
  //  s
  return <h4>{d * Math.random().toFixed(2)}</h4>;
}

export default App;
