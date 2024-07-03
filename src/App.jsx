import "./App.css";
import ItemList from "./components/ItemList";
import Navbar from "./components/Navbar";
import Filter from "./components/Filter";

function App() {

  return (
    <>
      <div className="">
        <Navbar />
      </div>
      <Filter />
      <hr />
      <div className="ml-3">
        <ItemList />
      </div>
    </>
  );
}

export default App;
