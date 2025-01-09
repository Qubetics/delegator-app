/*eslint-disable*/
import { Skeleton, Typography } from "@mui/material";
import { MainCard, SecondaryCard } from "./styles";
import { CURRENCY } from "../Constant";
import TooltipEle from "../TooltipEle";
import { noExponential } from "../../../utils/commonFunctions";
import { toFixed } from "../../../utils/helper";

const Card = ({ title, value, icon, tooltipContent, loading }) => {

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
        <Typography
          variant="h6"
          sx={{
            wordBreak: "break-all",
            fontSize: 14,
            color: (theme) => theme.palette.text.primary,
          }}
          title={value ? noExponential(Number(value)) : 0}
        >
          {loading ? (
            <Skeleton variant="circle" width={100} height={25} />
          ) : (<>{value ? noExponential(toFixed(Number(value), 4)) : 0}{" "}
            {CURRENCY}</>)}
        </Typography>
      </SecondaryCard>
    </MainCard>
  );
};

export default Card;
