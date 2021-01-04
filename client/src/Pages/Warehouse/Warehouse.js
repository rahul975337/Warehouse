import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Axios from "axios";
import "./Warehouse.css";
import { FaPlus } from "react-icons/fa";
import { Button, Modal } from "@material-ui/core";
import { useStateValue } from "../../Context/StateProvider";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tableHeading: {
    color: "white",
    background: "#323232",
    fontSize: 17,
  },
  tableHeadingExtra: {
    color: "white",
    background: "black",
    fontSize: 17,
  },
  tableData: {
    color: "white",
    background: "black",
    fontSize: 13,
    cursor: "pointer",
    // border: "0.01 px",
  },
  tableBack: {
    backgroundColor: "black",
  },
});

function Warehouse() {
  const classes = useStyles();
  const [warehouseList, setWarehouseList] = useState([]);
  const baseUrl = "http://localhost:3001";
  const [item, setItem] = useState("");
  const [brand, setBrand] = useState("");
  const [batchNo, setBatchNo] = useState(0);
  const [noOfBoxes, setNoOfBoxes] = useState(0);
  const [mfgDate, setMfgDate] = useState("");
  const [shelfLife, setShelfLife] = useState("");
  const [expDate, setExpDate] = useState("");

  const [{ admin }, dispatchAdmin] = useStateValue();

  //////////////////GET REQUEST TO SHOW/READ DATA//////////////
  const getWarehouses = () => {
    Axios.get(`${baseUrl}/warehousedetails`).then((response) => {
      setWarehouseList(response.data);
    });
  };
  //////////////////POST REQUEST TO ADD WAREHOUSE//////////////

  const addwarehouses = () => {
    Axios.post(`${baseUrl}/addwarehouses`, {
      item: item,
      brand: brand,
      batchNo: batchNo,
      noOfBoxes: noOfBoxes,
      mfgDate: mfgDate,
      shelfLife: shelfLife,
      expDate: expDate,
    }).then((response) => {});
  };
  useEffect(() => {
    getWarehouses();
  });

  return (
    <div className="companies_page">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading} align="left">
                Item
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                Brand
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                Batch No.
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                No. of Boxes
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                Mfg. Date
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                Shelf Life
              </TableCell>
              <TableCell className={classes.tableHeading} align="left">
                Exp. Date
              </TableCell>

              {!admin || admin === "" ? null : (
                <TableCell
                  className={classes.tableHeading}
                  align="left"
                ></TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {!admin || admin === "" ? null : (
              <TableRow>
                <TableCell
                  className={classes.tableData}
                  component="th"
                  scope="row"
                >
                  <input
                    placeholder="Item"
                    type="text"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="Brand"
                    type="text"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="Batch No."
                    type="text"
                    onChange={(e) => setBatchNo(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="No of Boxes"
                    type="text"
                    onChange={(e) => setNoOfBoxes(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="Mfg. Date"
                    type="text"
                    onChange={(e) => setMfgDate(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="Shelf Life"
                    type="text"
                    onChange={(e) => setShelfLife(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    placeholder="Exp. Date"
                    type="text"
                    onChange={(e) => setExpDate(e.target.value)}
                  />
                </TableCell>

                <Button onClick={addwarehouses}>Add</Button>
              </TableRow>
            )}
            {warehouseList.map((warehouse, key) => {
              key = warehouse.wid;
              return (
                <TableRow key={key}>
                  <TableCell
                    className={classes.tableData}
                    component="th"
                    scope="row"
                  >
                    {warehouse.item}
                  </TableCell>

                  <TableCell className={classes.tableData} align="left">
                    {warehouse.brand}
                  </TableCell>
                  <TableCell className={classes.tableData} align="left">
                    {warehouse.batchNo}
                  </TableCell>
                  <TableCell className={classes.tableData} align="left">
                    {warehouse.noOfBoxes}
                  </TableCell>
                  <TableCell className={classes.tableData} align="left">
                    {warehouse.mfgDate.substring(0, 10)}
                  </TableCell>
                  <TableCell className={classes.tableData} align="left">
                    {warehouse.shelfLife}
                  </TableCell>
                  <TableCell className={classes.tableData} align="left">
                    {warehouse.expDate.substring(0, 10)}
                  </TableCell>
                  {!admin || admin === "" ? null : (
                    <TableCell
                      className={classes.tableHeadingExtra}
                      align="left"
                    ></TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Warehouse;
