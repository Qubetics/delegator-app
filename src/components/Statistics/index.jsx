/*eslint-disable*/
import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  InputAdornment,
  Skeleton,
} from "@mui/material";
import { Tooltip } from "antd";
import { Wrapper, StatItem, Search } from "./styles";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { APP_NAME, CURRENCY, DECIMAL_VALUE, msg } from "../Common/Constant";
import InfoIcon from "../../assets/Icons/InfoIcon";
import { toFixed } from "../../utils/helper";
import { getApy, getTotalValidators } from "../../redux/Reducer/auth";
import { useDispatch, useSelector } from "react-redux";
import TooltipEle from "../Common/TooltipEle";
import getAllStats from "../../services/api/getAllStats";
import {
  formatMillionNumber,
  noExponential,
} from "../../utils/commonFunctions";
import {
  AprIcon,
  InfliationIcon,
  MarcketIcon,
  QubpriceIcon,
  SupplyIcon,
  MagnifierIcon,
} from "../../assets/Icons/SvgIcon";
import getQubeticsPrice from "../../services/api/getQubeticsPrice";

const Statistics = () => {
  const dispatch = useDispatch();
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await getAllStats();
        setLoading(true);
        setStats(response?.data);
        dispatch(getApy(response?.data?.apy));
        dispatch(getTotalValidators(response?.data?.totalValidator));
      } catch (err) {
        setLoading(false);
        return err;
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    getPrice();
  }, []);
  const getPrice = async () => {
    try {
      let response = await getQubeticsPrice();
      setLoading(true);
      setPrice(response?.data);
    } catch (err) {
      setLoading(true);
    }
  };

  return (
    <>
      {pathname != "/login" ||
        (isLoggedIn && (
          <Wrapper>
            <Search>
              <TextField
                variant="outlined"
                placeholder="Search by TX Hash/ Address/ Block/ Block Hash"
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MagnifierIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Search>
          </Wrapper>
        ))}

      <Wrapper>
        <StatItem className="cardbg">
          <div className="icon-wrap firstbg">
            <MarcketIcon />
          </div>

          <Box ml="10px">
            <Typography variant="h6" color="text.secondary">
              Market Cap
              <TooltipEle
                content={msg?.tooltip?.marketCap}
                classStyle={"tooltip-common"}
              />
            </Typography>
            {!loading ? (
              <Skeleton variant="circle" width={100} height={20} />
            ) : (
              <>
                <h4>
                  $
                  {stats?.marketCap
                    ? formatMillionNumber(Number(stats?.marketCap))
                    : 0}
                </h4>
              </>
            )}
          </Box>
        </StatItem>

        <StatItem className="cardbg">
          <div className="icon-wrap secondbg icon-large">
            <QubpriceIcon />
          </div>
          <Box ml="10px">
            <Typography variant="h6" color="text.secondary">
              {APP_NAME} Price
              <Tooltip
                color="rgb(72, 69, 69)"
                className="tooltip-common"
                placement="top"
                arrow
                title={
                  <Typography variant="h6" padding={1}>
                    The current market price of {CURRENCY} coin in USD.
                  </Typography>
                }
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            {!loading ? (
              <Skeleton variant="circle" width={100} height={20} />
            ) : (
              <>
                $ {""}
                {price ? noExponential(toFixed(Number(price), 6)) : "-"}
              </>
            )}
          </Box>
        </StatItem>

        <StatItem className="cardbg">
          <div className="icon-wrap thirdbg icon-large">
            <InfliationIcon />
          </div>
          <Box ml="10px">
            <Typography variant="h6" color="text.secondary">
              Inflation
              <Tooltip
                color="rgb(72, 69, 69)"
                className="tooltip-common"
                placement="top"
                arrow
                title={
                  <Typography variant="h6" padding={1}>
                    This inflation rate is adjusted automatically by the
                    protocol, based on how much total stake is bonded by staking
                    participants.
                  </Typography>
                }
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            {!loading ? (
              <Skeleton variant="circle" width={50} height={20} />
            ) : (
              <>
                {stats?.inflation
                  ? noExponential(toFixed(stats?.inflation, 1))
                  : 0}
                %
              </>
            )}
          </Box>
        </StatItem>

        <StatItem className="cardbg">
          <div className="icon-wrap fourthbg">
            <AprIcon />
          </div>
          <Box ml="10px">
            <Typography variant="h6" color="text.secondary">
              APR
              <Tooltip
                color="rgb(72, 69, 69)"
                className="tooltip-common"
                placement="top"
                arrow
                title={
                  <Typography variant="h6" padding={1}>
                    The annual percentage yield in {CURRENCY} is calculated by
                    dividing the estimated yearly reward by the current{" "}
                    {CURRENCY} ({APP_NAME}'s native token) holding.
                    <br />
                    <br />
                    <strong>NOTE:</strong> This is Testnet. APR would be
                    available once the mainnet is launched.
                  </Typography>
                }
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography>
              {!loading ? (
                <Skeleton variant="circle" width={50} height={20} />
              ) : (
                <>{stats?.apr ? toFixed(stats?.apr, 3) : 0}%</>
              )}
            </Typography>
          </Box>
        </StatItem>

        <StatItem className="cardbg">
          <div className="icon-wrap fourthbg">
            <AprIcon />
          </div>
          <Box ml="10px">
            <Typography variant="h6" color="text.secondary">
              Total Supply
              <Tooltip
                color="rgb(72, 69, 69)"
                className="tooltip-common"
                placement="top"
                arrow
                title={
                  <Typography variant="h6" padding={1}>
                    Total tokens issued by the system
                  </Typography>
                }
              >
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </Typography>
            <Typography
              sx={{ cursor: "pointer" }}
              title={stats?.totalSupply ? stats?.totalSupply.toString() : "0"}
            >
              {!loading ? (
                <Skeleton variant="circle" width={50} height={20} />
              ) : (
                <>
                  {stats?.totalSupply
                    ? formatMillionNumber(stats?.totalSupply)
                    : 0}
                </>
              )}
            </Typography>
          </Box>
        </StatItem>
      </Wrapper>
    </>
  );
};

export default Statistics;
