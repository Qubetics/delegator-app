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
import { logInSuccess, logout } from "../../redux/Reducer/auth";
import { selectedAccounts } from "../../redux/Reducer/drawer";
import Swal from "sweetalert2";
import "./index.scss";
import CopyIcon from "../../assets/Icons/CopyIcon";
import { toast } from "../toast/Toast";
import { NODE_NAME } from "../Common/Constant";
function Header() {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const [isLoading, setIsLoading] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { userAddress, isLoggedIn, userBalance, isTx, userEvmAddress } =
    useSelector((state) => state?.auth);
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
      position: "top",
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
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {};
        if (window?.qubetics) {
          window.qubetics.sendRequest("disconnect", data, (err, res) => {
            dispatch(logout());
            navigate("/login");
            dispatch(selectedAccounts({}));
            sessionStorage.clear();
          });
        } else {
          dispatch(logout());
          navigate("/login");
          dispatch(selectedAccounts({}));
          sessionStorage.clear();
          localStorage.clear();
        }
      }
    });
  };
  const copiedAddress = (data) => {
    navigator.clipboard.writeText(data);
    toast.success("Address Copied");
  };

  const connectWallet = async (event) => {
    event.preventDefault();
    try {
      if (window?.qubetics) {
        const data = {
          nodeUrl: NODE_NAME,
        };
        window.qubetics.sendRequest(
          "nativeConnect",
          data,
          async (error, response) => {
            if (response?.type == "error") {
              setIsLoading(false);
              toast.error(response?.data?.message || "Something went wrong");
              return;
            } else {
              if (response) {
                dispatch(logInSuccess(response?.data?.address));
                return toast.success("Logged In Successfully");
              }
            }
          }
        );
      }
    } catch (err) {
      alert("Intall Extenion");
      setIsLoading(false);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="drawerCustom"
      >
        {/* <p>Validator Application</p> */}
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
                    {!isLoggedIn && (
                      <div className="headerButtons">
                        <button variant="contained" className="headermetaBtn">
                          <div onClick={connectWallet}>Connect Wallet</div>
                        </button>
                      </div>
                    )}
                  </li>
                </ul>
              </div>
              {isLoggedIn ? (
                <div className="headerButtons">
                  <button
                    variant="contained"
                    color="primary"
                    className="headermetaBtn"
                  >
                    <div className="copyBtns">
                      {getAddress(userEvmAddress, 8, 8)}
                      <text
                        onClick={() => copiedAddress(userEvmAddress)}
                        className="copy-btn"
                        style={{ cursor: "pointer", zIndex: "9999" }}
                      >
                        <CopyIcon sx={{ fontSize: "17px" }} />
                      </text>
                    </div>
                  </button>
                  <button
                    onClick={handleClick}
                    className="btnsaad headermetaBtn"
                    endIcon={<DownIcon />}
                  >
                    Balance : {Number(userBalance).toFixed(2)} TICS
                  </button>

                  <Button className="btns headermetaBtn">
                    <div
                      to={`${pathname}`}
                      onClick={handleLogout}
                      style={{ zIndex: "99999" }}
                    >
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
            <Link to="/dashboard">
              {" "}
              <img src={logo} alt="logo" className="logo" />
            </Link>
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
                    Blocks
                  </Link>
                  <Link
                    to="/validators"
                    className={`link ${
                      pathname === "/validators" ? "active" : ""
                    }`}
                  >
                    Validators
                  </Link>
                  {!isLoggedIn && (
                    <Button className="btns headermetaBtn">
                      <div onClick={connectWallet} style={{ zIndex: "99999" }}>
                        Connect Wallet
                      </div>
                    </Button>
                  )}
                </li>
              </ul>
            </div>
            {isLoggedIn ? (
              <div className="headerButtons">
                <Button className="btns headermetaBtn">
                  <div className="copyBtns">
                    {getAddress(userEvmAddress, 8, 8)}
                    <text
                      onClick={() => copiedAddress(userEvmAddress)}
                      className="copy-btn"
                      style={{ cursor: "pointer", zIndex: "9999" }}
                    >
                      <CopyIcon sx={{ fontSize: "17px" }} />
                    </text>
                  </div>
                </Button>

                <button onClick={handleClick} className="btns headermetaBtn">
                  Balance : {Number(userBalance).toFixed(2)} TICS
                </button>

                <Button className="btns headermetaBtn">
                  <div
                    to={`${pathname}`}
                    onClick={handleLogout}
                    style={{ zIndex: "99999" }}
                  >
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
