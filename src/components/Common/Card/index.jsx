/* eslint-disable */
import { Skeleton, Tooltip, Typography } from "@mui/material";
import { MainCard, SecondaryCard } from "./styles";
import { CURRENCY } from "../Constant";
import TooltipEle from "../TooltipEle";
import {
  formatMillionNumber,
  noExponential,
} from "../../../utils/commonFunctions";
import { toFixed } from "../../../utils/helper";

const Card = ({ title, value, icon, tooltipContent, loading ,fullToolTipValue=0}) => {
  // const formattedValue = value
  //   ? formatMillionNumber(noExponential(Number(value)))
  //   : "0";

  const fullValue = value ? noExponential(Number(value)) : "0";

  return (
    <MainCard className="vaildator-card" style={{ marginTop: "40px" }}>
      <div className="vaildator-card__main">
        <span className="vaildator-card__icon">{icon}</span>
        <Typography variant="h5" sx={{ fontWeight: 700, minWidth: "75px" }}>
          {title}
        </Typography>
        {tooltipContent && (
          <TooltipEle
            content={tooltipContent}
            classStyle={"vaildator-card__tooltip"}
          />
        )}
      </div>

      <SecondaryCard>
        {loading ? (
          <Skeleton variant="circle" width={100} height={25} />
        ) : (
          <Tooltip title={`${fullToolTipValue} ${CURRENCY}`} arrow>
            <Typography
              variant="h6"
              sx={{
                wordBreak: "break-all",
                fontSize: 14,
                color: (theme) => theme.palette.text.primary,
                cursor: "pointer",
              }}
            >
              {value} {CURRENCY}
            </Typography>
          </Tooltip>
        )}
      </SecondaryCard>
    </MainCard>
  );
};

export default Card;
