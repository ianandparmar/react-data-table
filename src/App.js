import React from "react";
import { CountriesTable } from "./Components/CountriesTable";

function App() {
  return (
    <>
      <div className="d-flex flex-column align-items-center">
        <h1>React DataTable</h1>
        <CountriesTable />
      </div>
    </>
  );
}

export default App;
