/*eslint-disable*/
import { Typography } from "@mui/material";
import { Tooltip } from "antd";
import { MainCard, SecondaryCard } from "./styles";
import { toFixed } from "../../../utils/helper";
import { noExponential } from "../../../utils/commonFunctions";

const Card = ({ title, value, icon, tooltipContent, apr }) => (
  <MainCard className="vaildator-card">
    <div className="vaildator-card__main">
      <span className="vaildator-card__icon">{icon}</span>
      <Typography variant="h5" sx={{ fontWeight: 700, minWidth: "75px" }}>
        {title}
      </Typography>
      {tooltipContent && (
        <Tooltip
          color="rgb(72, 69, 69)"
          content={tooltipContent}
          classStyle="vaildator-card__tooltip"
        />
      )}
    </div>
    <SecondaryCard>
      <Typography
        variant="h6"
        sx={{
          wordBreak: "break-all",
          fontSize: 12,
          color: (theme) => theme.palette.text.primary,
        }}
        title={value
          ? apr
            ? noExponential(value) + " %"
            : value
          : 0}
      >
        {value
          ? apr
            ? toFixed(Number(value)?.noExponents(), 2) + " %"
            : value
          : 0}
      </Typography>
    </SecondaryCard>
  </MainCard>
);

export default Card;
