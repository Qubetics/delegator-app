import { IconButton, Typography } from "@mui/material";
import { Tooltip } from "antd";
import InfoIcon from "../../../assets/Icons/InfoIcon";

const TooltipEle = ({ content, classStyle }) => {
  return (
    <Tooltip
      color="rgb(72, 69, 69)"
      className={classStyle}
      placement="top"
      arrow
      title={
        <Typography variant="h6" padding={1}>
          {content}
        </Typography>
      }
    >
      <IconButton>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default TooltipEle;
