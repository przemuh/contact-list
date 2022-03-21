import React from "react";
import apiData from "../../api";
import { PersonInfo, Person } from "../PersonInfo";

import "./App.css";

export function App() {
  const [persons, setPersons] = React.useState<Person[]>([]);
  const [selected, setSelected] = React.useState([]);

  //  TODO fetch contacts using apiData function, handle loading and error states

  return (
    <div className="App">
      <div className="App__selected-info">
        Selected contacts: {selected.length}
      </div>
      <div>
        {persons.map((person) => (
          <PersonInfo key={person.id} {...person} />
        ))}
      </div>
    </div>
  );
}
