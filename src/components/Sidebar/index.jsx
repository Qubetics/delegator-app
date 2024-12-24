/* eslint-disable */
import { useState } from "react";
import { Box, IconButton, Typography, useMediaQuery } from "@mui/material";
import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import LinkDropdown from "./AccountDropdown";
import theme from "../../theme";
import { notLoggedInRoutes, loggedInRoutes } from "../../utils/navItems";
import { WalletDetails, NavItem, Wrapper } from "./styles";
import CancelIcon from "../../assets/Icons/CancelIcon";
import DropdownIcon from "../../assets/Icons/DropdownIcon";
import RefreshIcon from "../../assets/Icons/RefreshIcon";
import { getWalletBalance, isTxOccur, logout } from "../../redux/Reducer/auth";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import clsx from "clsx";
import { useStyles } from "../Common/Refresh";
import { selectedAccounts } from "../../redux/Reducer/drawer";
import LoginIcon from "../../assets/Icons/LoginIcon";
import { getAddress, toFixed } from "../../utils/helper";
import { CURRENCY } from "../Common/Constant";
import { getUserBalance } from "../../services/getUserBalance";
import { noExponential } from "../../utils/commonFunctions";
import CopyAddress from "../Common/CopyAddress";

const Sidebar = ({ isMobileSidebarOpen, setIsMobileSidebarOpen }) => {
  const classes = useStyles();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userAddress, userBalance, isLoggedIn, isTx } = useSelector(
    (state) => state.auth
  );
  const { pathname } = location;
  const routes = isLoggedIn ? loggedInRoutes : notLoggedInRoutes;
  const [spin, setSpin] = useState(false);

  const closeSidebar = useCallback(() => {
    setIsMobileSidebarOpen(false);
  }, [setIsMobileSidebarOpen]);

  useEffect(() => {
    setIsMobileSidebarOpen(false);
  }, [pathname, setIsMobileSidebarOpen]);

  useEffect(() => {
    if (isMobileSidebarOpen && isMobile) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobile, isMobileSidebarOpen]);

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

  const buttonMove = async () => {
    setSpin(true);
    const move = await new Promise((resolve) => {
      setTimeout(async () => {
        resolve();
      }, 2000);
    });
    setSpin(false);
  };

  const balanceRefresh = () => {
    fetchBalance();
    buttonMove();
  };

  useEffect(() => {
    if (userAddress?.length > 0 || isTx) {
      setTimeout(() => {
        fetchBalance();
        dispatch(isTxOccur(false));
      }, 1500);
    }
  }, [userAddress, isTx]);

  const fetchBalance = async () => {
    try {
      let response = await getUserBalance(userAddress);
      dispatch(getWalletBalance(response));
    } catch (err) {
      return err;
    }
  };

  return (
    <Wrapper
      isopen={`${isMobileSidebarOpen}`}
      onClick={(e) => e?.stopPropagation()}
    >
      <>
        {isMobile && (
          <Box className="close-btn">
            <IconButton onClick={closeSidebar}>
              <CancelIcon
                sx={{
                  color: (theme) => theme.palette.text.primary,
                }}
              />
            </IconButton>
          </Box>
        )}

        {isLoggedIn && (
          <WalletDetails>
            <p className="addressCopy">
              <span> {getAddress(userAddress, 9, 9)}</span>
              <CopyAddress address={userAddress} />
            </p>
            <Typography className="wallet-balance">
              Available Balance:{" "}
              <RefreshIcon
                sx={{
                  fontSize: "16px",
                  marginLeft: "11px",
                  marginTop: "5px",
                }}
                className={clsx({
                  [classes.refresh]: true,
                  spin: spin,
                })}
                onClick={balanceRefresh}
                spin={360}
              />
            </Typography>

            <Typography
              fontWeight="500"
              className="wallet-balance__amount"
              title={userBalance ? noExponential(userBalance) : "0"}
            >
              {userBalance ? toFixed(noExponential(userBalance), 2) : "0"}{" "}
              {CURRENCY}
            </Typography>
          </WalletDetails>
        )}
        <Box
          component="nav"
          mt={isLoggedIn ? "20px" : "40px"}
          className="nav-item-list"
        >
          {routes.map((item) => (
            <React.Fragment key={item?.label}>
              {item.hasSubLinks ? (
                <LinkDropdown
                  trigger={
                    <NavItem
                      to="/"
                      key={item?.label}
                      active={`${pathname?.includes(item?.path)}`}
                    >
                      <item.Icon />
                      <Typography ml="20px" fontWeight="600">
                        {item?.label}
                      </Typography>
                      <DropdownIcon
                        sx={{
                          flexShrink: 0,
                        }}
                      />
                    </NavItem>
                  }
                ></LinkDropdown>
              ) : (
                <NavItem
                  to={item?.path}
                  active={`${pathname?.includes(item.path)}`}
                >
                  <item.Icon />
                  <Typography ml="20px" fontWeight="600">
                    {item.label}
                  </Typography>
                </NavItem>
              )}
            </React.Fragment>
          ))}
          {isLoggedIn ? (
            <NavItem to={`${pathname}`} onClick={handleLogout}>
              <LoginIcon />
              <Typography ml="20px" fontWeight="600">
                Logout
              </Typography>
            </NavItem>
          ) : (
            ""
          )}
        </Box>
      </>
    </Wrapper>
  );
};

export default Sidebar;
