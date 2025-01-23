/*eslint-disable*/
import { Box, Typography, useMediaQuery } from "@mui/material";
import theme from "../../../theme";
import Address from "../Address";
import { Wrapper } from "./styles";
import Sherlock from "../../Sherlock/Sherlock";

const DetailsBox = ({ address, name, validator }) => {
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Wrapper>
      <div className="profile-wrap profile-wrap--detail">
        {name && (
          <Box className="profile-wrap__item" style={{ display: "flex", flexDirection: "row" }}>
            <Typography>Name:</Typography>
            <Typography>{name == "unknown" || name == "" ? "-" : name}</Typography>
          </Box>
        )}
        {validator && (
          <Box className="profile-wrap__item">
            <Typography>Account:</Typography>
            <Typography>{validator}</Typography>
          </Box>
        )}
        {/* <Box className="profile-wrap__item">
          <Typography className="walletadd">Wallet Address:</Typography>
          <Address address={address} />
        </Box> */}
      </div>
    </Wrapper>
  );
};

export default DetailsBox;
