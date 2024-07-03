import "./App.css";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";
import { useState } from "react";

function App() {
  const [filteredEntities, setFilteredEntities] = useState([]);

  return (
    <>
      <div className="">
        <Navbar setFilteredEntities={setFilteredEntities} />
      </div>
      <Filter />
      <hr />
      <div className="ml-3">
        <ItemList
          filteredEntities={filteredEntities}
          setFilteredEntities={setFilteredEntities}
        />
      </div>
    </>
  );
}

export default App;
