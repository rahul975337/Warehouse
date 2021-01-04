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
import "./Sales.css";
import { FaPlus } from "react-icons/fa";
import { useStateValue } from "../../Context/StateProvider";
import { Button, Modal } from "@material-ui/core";

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
  },
  tableBack: {
    backgroundColor: "black",
  },
});

function Sales() {
  const classes = useStyles();
  const [salesList, setSalesList] = useState([]);
  const baseUrl = "http://localhost:3001";
  const [tDate, setTDate] = useState("");
  const [item, setItem] = useState("");
  const [brand, setBrand] = useState("");
  const [noOfSalesBoxes, setNoOfSalesBoxes] = useState(0);
  const [{ user }, dispatchUser] = useStateValue();

  //////////////////GET REQUEST TO SHOW/READ DATA//////////////
  const getSales = () => {
    Axios.get(`${baseUrl}/salesdetails`).then((response) => {
      setSalesList(response.data);
    });
  };
  /////////////////POST REQUEST TO ADD SALES//////////////

  const addSales = () => {
    Axios.post(`${baseUrl}/addsales`, {
      tDate: tDate,
      item: item,
      brand: brand,
      noOfSalesBoxes: noOfSalesBoxes,
    }).then((response) => {});
  };
  useEffect(() => {
    getSales();
  }, [salesList]);
  return (
    <div className="placements_page">
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeading}>Date</TableCell>
              <TableCell className={classes.tableHeading}>Item</TableCell>
              <TableCell className={classes.tableHeading}>Brand</TableCell>
              <TableCell className={classes.tableHeading} align="left">
                No. of boxes
              </TableCell>

              {!user || user === "" ? null : (
                <TableCell
                  className={classes.tableHeading}
                  align="left"
                ></TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {!user || user === "" ? null : (
              <TableRow>
                <TableCell className={classes.tableData} align="left">
                  <input
                    type="text"
                    placeholder="Date"
                    onChange={(e) => setTDate(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    type="text"
                    placeholder="Item"
                    onChange={(e) => setItem(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    type="text"
                    placeholder="Brand"
                    onChange={(e) => setBrand(e.target.value)}
                  />
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  <input
                    type="text"
                    placeholder="No of Boxes"
                    onChange={(e) => setNoOfSalesBoxes(e.target.value)}
                  />
                </TableCell>
                <Button onClick={addSales}>Add</Button>
              </TableRow>
            )}

            {salesList.map((sale) => (
              <TableRow key={sale.sid}>
                <TableCell
                  className={classes.tableData}
                  component="th"
                  scope="row"
                >
                  {sale.tDate.substring(0, 10)}
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  {sale.item}
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  {sale.brand}
                </TableCell>
                <TableCell className={classes.tableData} align="left">
                  {sale.noOfSalesBoxes}
                </TableCell>
                {!user || user === "" ? null : (
                  <TableCell
                    className={classes.tableHeadingExtra}
                    align="left"
                  ></TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Sales;
