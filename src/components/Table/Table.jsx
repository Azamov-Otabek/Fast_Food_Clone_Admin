import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useWorkerStore } from "../../store/WorkersStore/WorkersStore";
import { MdOutlineDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import AddWorker from "../Modals/AddWorker/AddWorker";
import DeleteWorker from "../Modals/DeleteWorker/DeleteWorker";

export default function BasicTable() {
  const { getWorkers } = useWorkerStore();
  const [workers, setWorkers] = React.useState([]);
  React.useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await getWorkers();
    setWorkers(res?.data?.all_workers);
  };
  const [open, setOpen] = React.useState(false);
  const [deleteWorker, setDeleteWorker] = React.useState(false);
  const [editItem, setEditItem] = React.useState("")
  const [deleteID, setDeleteID] = React.useState("")
  const toggle = () => {
    setOpen(false);
    setDeleteWorker(false)
  };
  const editWorker = (item) => {
    setEditItem(item)
    setOpen(true)
  };
  const removeWorker = (id) => {
    setDeleteID(id)
    setDeleteWorker(true)
  }
  return (
    <TableContainer className="table__container">
      <AddWorker open={open} toggle={toggle} editItem={editItem}/>
      <DeleteWorker open={deleteWorker} toggle={toggle} id={deleteID}/>
      <Table
        sx={{ minWidth: 540, background: "transparent" }}
        aria-label="simple table"
      >
        <TableHead
          sx={{
            backgroundColor: "rgba(255, 255, 255, 0.26)",
            borderRadius: "40px",
          }}
        >
          <TableRow
            sx={{
              backgroundColor: "rgba(255, 255, 255, 0.26)",
              borderRadius: "40px",
            }}
          >
            <TableCell>T/R</TableCell>
            <TableCell align="left">FullName</TableCell>
            <TableCell align="left">Login</TableCell>
            <TableCell align="left">Password</TableCell>
            <TableCell align="left">
              <button className="table__btn" onClick={() => setOpen(true)}>
                Add
              </button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {workers?.map((item, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                borderBottom: "2px solid #A1A1A1",
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell align="right" scope="row" component="th">
                {item.full_name}
              </TableCell>
              <TableCell align="right">{item.login_key}</TableCell>
              <TableCell align="right">{item.password}</TableCell>
              <TableCell align="right">
                <button className="table__btn">
                  <MdOutlineDelete size={24} onClick={()=>removeWorker(item?.id)}/>
                  <CiEdit size={24} onClick={() => editWorker(item)} />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
