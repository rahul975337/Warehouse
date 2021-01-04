import { Avatar, Modal } from "@material-ui/core";
import React, { useState } from "react";
import { FaPlus, FaUniversity } from "react-icons/fa";
import { Link } from "react-router-dom";
import { actionTypes } from "../../Context/reducer";
import { useStateValue } from "../../Context/StateProvider";
import AdminProfile from "../Profile/AdminProfile";
import UserProfile from "../Profile/UserProfile";
import "./Nav.css";

function Nav() {
  const [{ user }, dispatchUser] = useStateValue();
  const [{ admin }, dispatchAdmin] = useStateValue();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logout = () => {
    dispatchUser({
      type: actionTypes.SET_USER,
      user: null,
    });
    dispatchAdmin({
      type: actionTypes.SET_ADMIN,
      admin: null,
    });
  };
  return (
    <nav className="navbar">
      {/* <Link to="/" className="navbar_logo">
        JSS
        <FaUniversity style={{ color: "#f9032f", margin: "2px" }} />
      </Link> */}

      <li>
        <Link to="/" className="navbar_link">
          Home
        </Link>
      </li>
      <li>
        <Link to="/warehouse" className="navbar_link">
          Warehouse
        </Link>
      </li>
      <li>
        <Link to="/sales" className="navbar_link">
          Sales
        </Link>
      </li>

      <li>
        <btn className="logout-btn" onClick={logout}>
          Logout
        </btn>
      </li>

      <div></div>
    </nav>
  );
}

export default Nav;
