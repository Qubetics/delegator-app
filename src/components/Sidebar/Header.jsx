import React, { useEffect, useState } from "react";
import logo from "../../assets/Images/logo.svg";
import DownIcon from "../../assets/Icons/DownIcon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Descktop, Drawersidebar, Mobilereasponsive } from "./styles";
import { Menu, MenuItem, Button, Drawer } from "@mui/material";
import useStyles from "./styles";
import Sidebar from "../Sidebar";
import MenuIcon from "../../assets/Icons/MenuIcon";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../../utils/helper";
import { Typography } from "antd";
import CopyAddress from "../Common/CopyAddress";
import { logout } from "../../redux/Reducer/auth";
import { selectedAccounts } from "../../redux/Reducer/drawer";
import Swal from "sweetalert2";
function Header() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userAddress, isLoggedIn, userBalance, isTx } = useSelector(
    (state) => state?.auth
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const toggleDrawer = (newOpen) => () => {
    setIsDrawerOpen(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Track window width changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLogout = () => {
    Swal.fire({
      title: "LOGOUT",
      text: "Do you want to logout?",
      padding: "20px 30px",
      background: "#252527",
      color: "#fff",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "#d33",
      confirmButtonText: "YES",
      cancelButtonText: "NO",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        navigate("/login");
        dispatch(selectedAccounts({}));
        sessionStorage.clear();
      }
    });
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="drawerCustom"
      >
        <p>Validator Application</p>
        <Drawersidebar>
          <div className="headerWrapper">
            <div className="header">
              <img src={logo} alt="logo" className="logo" />
              <div className="headerLinks">
                <ul className="">
                  <li className="li">
                    <Link
                      to="/dashboard"
                      className={`link ${
                        pathname === "/dashboard" ? "active" : ""
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/blocks"
                      className={`link ${
                        pathname === "/blocks" ? "active" : ""
                      }`}
                    >
                      Block
                    </Link>
                    <Link
                      to="/validators"
                      className={`link ${
                        pathname === "/validators" ? "active" : ""
                      }`}
                    >
                      Validators
                    </Link>
                  </li>
                </ul>
              </div>
              {isLoggedIn ? (
                <div className="headerButtons">
                  <Button variant="contained" color="primary" className=" btns">
                    <div className="copyBtns">
                      {getAddress(userAddress, 8, 8)}
                      <CopyAddress address={userAddress} />
                    </div>
                  </Button>
                  <Button
                    onClick={handleClick}
                    className=" btns"
                    endIcon={<DownIcon />}
                  >
                    Balance : {Number(userBalance).toFixed(2)} TICS
                  </Button>

                  <Button variant="contained" color="primary" className="btns">
                    <div to={`${pathname}`} onClick={handleLogout}>
                      Logout
                    </div>
                  </Button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </Drawersidebar>
      </Drawer>
      {/* // Show Full-Width Content for Larger Screens */}
      <Descktop Descktop>
        <div className="headerWrapper">
          <div className="header">
            <img src={logo} alt="logo" className="logo" />
            <div className="headerLinks">
              <ul className="">
                <li className="li">
                  <Link
                    to="/dashboard"
                    className={`link ${
                      pathname === "/dashboard" ? "active" : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/blocks"
                    className={`link ${pathname === "/blocks" ? "active" : ""}`}
                  >
                    Block
                  </Link>
                  <Link
                    to="/validators"
                    className={`link ${
                      pathname === "/validators" ? "active" : ""
                    }`}
                  >
                    Validators
                  </Link>
                </li>
              </ul>
            </div>
            {isLoggedIn ? (
              <div className="headerButtons">
                <Button variant="contained" color="primary" className="btns">
                  <div className="copyBtns">
                    {getAddress(userAddress, 8, 8)}
                    <CopyAddress address={userAddress} />
                  </div>
                </Button>
                <Button onClick={handleClick} className=" btns">
                  Balance : {Number(userBalance).toFixed(2)} TICS
                </Button>

                <Button variant="contained" color="primary" className="btns">
                  <div to={`${pathname}`} onClick={handleLogout}>
                    Logout
                  </div>
                </Button>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </Descktop>
      <Mobilereasponsive>
        <div className="mobileresponsive headerWrapper">
          <img src={logo} alt="logo" className="logo" />
          <MenuIcon className="open-icon" onClick={toggleDrawer(true)} />
        </div>
      </Mobilereasponsive>
    </>
  );
}

export default Header;
