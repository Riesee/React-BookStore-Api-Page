import { useDispatch, useSelector } from "react-redux";
import { setFilteredEntities } from "../redux/bookSlice";

const Filter = () => {
  const { entities, loading } = useSelector((state) => state.bookSlice);
  const dispatch = useDispatch();

  if (loading === "pending") {
    return <div>Loading...</div>;
  }
  if (loading === "failed") {
    return <div>HTTP 500 Server Error!</div>;
  }
  if (loading === "succeeded") {
    const uniqueCategories = Array.from(
      new Set(entities.map((book) => book.category))
    );

    const handlerClick = (category) => {
      const filterItems = () => {
        return entities.filter((item) => {
          return item.category.toLowerCase().includes(category.toLowerCase());
        });
      };

      const filtered = filterItems()

      dispatch(setFilteredEntities(filtered))



    };

    // History Biography Fantastic Horror Comedy Romantic Internet
    return (
      <div className="bg-white-500 text-black p-1 px-5 flex items-center justify-between my-4">
        <div className="bg-black mr-3 text-white p-1 rounded px-5 flex items-center justify-between cursor-pointer" onClick={() => dispatch(setFilteredEntities(entities))}>
          <span>All</span> <span className="ml-2">{entities.length}</span>
        </div>
        {uniqueCategories.map((category) => (
          <div
            key={category}
            className="bg-black mr-3 text-white p-1 rounded px-5 flex items-center justify-between cursor-pointer"
            onClick={() => handlerClick(category)}
          >
            <span>{category}</span>{" "}
            <span className="ml-2">
              {entities.filter((book) => book.category === category).length}
            </span>
          </div>
        ))}
      </div>
    );
  }
};

export default Filter;
