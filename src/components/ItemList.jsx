import Item from "./Item";
import "../components/boxShadow.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getBooks } from "../redux/bookSlice";
import TablePagination from "@mui/material/TablePagination";
import EditModal from "./EditModal";

const ItemList = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(9);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 9));
    setPage(0);
  };

  const dispatch = useDispatch();
  const { entities, loading, error } = useSelector((state) => state.bookSlice);
  const showModal = useSelector((state) => state.bookSlice.showModal);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (loading === "pending") {
    return <div>Loading...</div>;
  }
  if (loading === "failed") {
    return <div>HTTP 500 Server Error!</div>;
  }

  if (loading === "succeeded") {
    return (
      <>
        <div className="p-3 grid grid-cols-3 items-center align-middle">
          {entities
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((book, index) => (
              <Item key={index} book={book} />
            ))}
        </div>
        <div className="mb-10 text-black">
          <TablePagination
            rowsPerPageOptions={[3, 6, 9, 12, 15, { label: "All", value: -1 }]}
            className="items-center justify-center align-middle flex text-black"
            component="div"
            count={entities.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </div>
        {showModal && <EditModal />}
      </>
    );
  }
};

export default ItemList;
