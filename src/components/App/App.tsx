import * as React from "react";
import { useFetchState } from "src/hooks/useFetchState";
import apiData from "../../api";
import { Loader } from "../Loader";
import { PersonInfo, Person } from "../PersonInfo";

import "./App.css";

export function App() {
  const [persons, setPersons] = React.useState<Record<string, Person>>({});
  const [selected, setSelected] = React.useState<string[]>([]);
  const [unSelected, setUnSelected] = React.useState<string[]>([]);

  const { state, fetchData } = useFetchState<Person[]>(apiData, (persons) => {
    setPersons((o) => {
      return persons.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, o);
    });

    setUnSelected((p) => [...p, ...persons.map(({ id }) => id)]);
  });

  const handleSelect = (personId: string) => {
    const isSelected = selected.includes(personId);

    if (isSelected) {
      setSelected((a) => [...a].filter((v) => v !== personId));
      setUnSelected((a) => [personId, ...a]);
    } else {
      setUnSelected((a) => [...a].filter((v) => v !== personId));
      setSelected((a) => [personId, ...a]);
    }
  };

  return (
    <div className="App">
      <div className="App__selected-info">
        Selected contacts: {selected.length}
      </div>

      <div className="App__list">
        {selected.map((personId) => (
          <PersonInfo
            key={personId}
            {...persons[personId]}
            selected
            onClick={handleSelect}
          />
        ))}
        {unSelected.map((personId) => (
          <PersonInfo
            key={personId}
            {...persons[personId]}
            onClick={handleSelect}
          />
        ))}
      </div>

      <div>{state === "pending" && <Loader data-testid="loader" />}</div>
      <button onClick={fetchData} disabled={state === "pending"}>
        {state === "error" ? "Try to load more again" : "Load more"}
      </button>
    </div>
  );
}
