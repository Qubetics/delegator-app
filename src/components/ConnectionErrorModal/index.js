/*eslint-disable*/
import { Typography } from "@mui/material";
import { CancelIconWrapper, DialogContent, StyledDialog } from "./styles";
import ConnectionErrorImage from "../../assets/Images/ConnectionError.png";
import CancelIcon from "../../assets/Icons/CancelIcon";

const ConnectionErrorModal = ({ connectionOpen, connectionClose }) => {
  return (
    <StyledDialog
      className="connectionAttempt"
      open={connectionOpen}
      // onClose={connectionClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <CancelIconWrapper>
        <CancelIcon onClick={connectionClose} />
      </CancelIconWrapper>
      <DialogContent>
        <img src={ConnectionErrorImage} alt="connection error" />
        <Typography mt={4.8} variant="h5">
          Something went wrong.
        </Typography>
        <Typography variant="body2" mt={1.6} className="connectionText">
          The connection attempt failed. Please connect your wallet and try
          again.
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
};

export default ConnectionErrorModal;
