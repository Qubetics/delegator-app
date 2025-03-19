/*eslint-disable*/
import { useMediaQuery } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Sidebar from "../Sidebar";
import Statistics from "../Statistics";
import Footer from "../Footer/Footer.jsx";
import theme from "../../theme";
import { toggleSidebar } from "../../redux/Reducer/drawer";
import { Container, Wrapper } from "./styles";
import MenuIcon from "../../assets/Icons/MenuIcon";
import Header from "../Sidebar/Header";

const MainPanel = ({ children }) => {
  const { isLoggedIn } = useSelector((state) => state?.auth);
  const dispatch = useDispatch();
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const location = useLocation();
  const { pathname } = location;
  const showStats =
    pathname?.includes("account/become-a-validator") ||
    (!pathname?.includes("/account") &&
      !pathname?.includes("/funds/bond") &&
      !pathname?.includes("/funds/unbond") &&
      !pathname?.includes("/funds/redelegate") &&
      !pathname?.includes("/login") &&
      !pathname?.includes("/validators/delegate"));

  useEffect(() => {
    dispatch(toggleSidebar(!isMobile));
  }, [dispatch, isMobile]);

  const openSidebar = useCallback(() => {
    setIsMobileSidebarOpen(true);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  Number.prototype.noExponents = function () {
    var data = String(this)?.split(/[eE]/);
    if (data?.length == 1) return data[0];

    var z = "",
      sign = this < 0 ? "-" : "",
      str = data[0]?.replace(".", ""),
      mag = Number(data[1]) + 1;

    if (mag < 0) {
      z = sign + "0.";
      while (mag++) z += "0";
      return z + str?.replace(/^\-/, "");
    }
    mag -= str?.length;
    while (mag--) z += "0";
    return str + z;
  };

  return (
    <>
      {isLoggedIn && (
        <div className="bugSubButton">
          <button
            className="headermetaBtn"
            // onClick={() => router.push("/bug-submission")}
            onClick={() =>
              window.open(
                "https://testnet.qubetics.work/bug-submission",
                "_blank"
              )
            }
          >
            Reward Program
          </button>
        </div>
      )}

      <Wrapper>
        <div className="main_top">
          <Header />

          <div className="bg_content">
            <Container ismobile={`${isMobile}`}>
              {/* {isMobile && (
              <MenuIcon
                className="open-icon"
                sx={{
                  color: theme.palette.text.primary,
                  fill: theme.palette.text.primary,
                  cursor: 'pointer',
                }}
                onClick={openSidebar}
              />
            )} */}
              {showStats && <Statistics />}
              {children}
            </Container>
          </div>
        </div>

        <Footer />
        {/* <Sidebar
        isMobileSidebarOpen={isMobileSidebarOpen}
        setIsMobileSidebarOpen={setIsMobileSidebarOpen}
      /> */}
      </Wrapper>
    </>
  );
};

export default MainPanel;
