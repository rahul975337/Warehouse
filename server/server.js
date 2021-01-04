const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
////////////
//cors helps in sending crossplatform information lije from frontend to backend
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "12345",
  database: "warehouse",
});

/////////////////////S E R V E R   P O R T SETUP///////////////
app.listen(3001, () => {
  console.log("hurrayy , server running on port 3002");
});
//////////////////ROUTE FOR REGISTERATION /////////////
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "INSERT INTO userlogin (username,password) VALUES (?,?)",
    [username, password],

    (err, result) => {
      if (err) {
        console.log(err);

        res.send({ err: err });
        return;
      }
      if (result) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

/////////////////////ROUTE FOR LOGIN /////////////
app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM userlogin WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

/////////////////////ROUTE FOR ADMIN LOGIN /////////////
app.post("/admin", (req, res) => {
  const adminname = req.body.adminname;
  const password = req.body.password;

  db.query(
    "SELECT * FROM adminlogin WHERE adminname = ? AND password = ?",
    [adminname, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "Wrong username/password combination" });
      }
    }
  );
});

//////////////////GET REQUEST TO SHOW/READ DATA FOR WAREHOUSEDETAILS//////////////

app.get("/warehousedetails", (req, res) => {
  db.query("SELECT * FROM warehousedetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});
//////////////////GET REQUEST TO SHOW/READ DATA FORSALESDETAILS//////////////

app.get("/salesdetails", (req, res) => {
  db.query("SELECT * FROM salesdetails", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

/////////////////////ROUTE FOR ADD WAREHOUSES /////////////
app.post("/addwarehouses", (req, res) => {
  const item = req.body.item;
  const brand = req.body.brand;
  const batchNo = req.body.batchNo;
  const noOfBoxes = req.body.noOfBoxes;
  const mfgDate = req.body.mfgDate;
  const shelfLife = req.body.shelfLife;
  const expDate = req.body.expDate;

  db.query(
    "INSERT INTO warehousedetails (item,brand,batchNo,noOfBoxes,mfgDate,shelfLife,expDate) VALUES (?,?,?,?,?,?,?)",
    [item, brand, batchNo, noOfBoxes, mfgDate, shelfLife, expDate],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});

/////////////////////ROUTE FOR ADD SALES ///////////
app.post("/addsales", (req, res) => {
  const tDate = req.body.tDate;
  const item = req.body.item;
  const brand = req.body.brand;
  const noOfSalesBoxes = req.body.noOfSalesBoxes;

  db.query(
    "INSERT INTO salesdetails (tDate,item,brand,noOfSalesBoxes) VALUES (?,?,?,?)",
    [tDate, item, brand, noOfSalesBoxes],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send({ message: "already exists" });
      }
    }
  );
});
