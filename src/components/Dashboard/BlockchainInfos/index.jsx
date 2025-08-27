/*eslint-disable*/
import { useEffect, useState } from "react";
import Card from "../../Common/Card";
import { Container } from "./styles";
import { useSelector } from "react-redux";
import StakingIcon from "../../../assets/Icons/StakingIcon";
import ValidatorsNewIcon from "../../../assets/Icons/ValidatorsNewIcon";
import getDelegatorWidgets from "../../../services/api/getDelegatorWidgets";
import { formatMillionNumber, formatMillionNumberOnTolTip, noExponential } from "../../../utils/commonFunctions";
import { toFixed } from "../../../utils/helper";
import { Skeleton } from "@mui/material";

const DelegatorInfos = () => {
  const { userAddress } = useSelector((state) => state.auth);
  const [widgets, setWidgets] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      if (userAddress) {
        const response = await getDelegatorWidgets(userAddress);
        setWidgets(response?.data);
        setLoading(false);
      }
    } catch (err) {
      setLoading(true);
      return err;
    }
  };
  useEffect(() => {
    fetchData();
  }, [userAddress]);

  return (
    <Container>
      <Card
        icon={<ValidatorsNewIcon />}
        title="Total Rewards:"
        value={
          widgets?.totalRewards
            ? formatMillionNumber((widgets?.totalRewards/10**18))
            : 0
        }
        fullToolTipValue={widgets?.totalRewards ? formatMillionNumberOnTolTip((widgets?.totalRewards/10**18)):0}
        loading={loading}
        style={{
          maxWidth: 360,
        }}
        tooltipContent='Your total rewards from active delegations so far. This amount updates in real time as your stake earns rewards. When you do the "bond more" or "redelegate" action, these rewards are transferred to your available balance and added to the rewards claimed section.'
      />      <Card
        icon={<StakingIcon />}
        title="Total Stake Amount:"
        value={
          widgets?.totalStake
            ? formatMillionNumber((widgets?.totalStake/10**18))
            : 0
        }
        loading={loading}
        fullToolTipValue={widgets?.totalStake ? formatMillionNumberOnTolTip((widgets?.totalStake/10**18)):0}
        style={{
          maxWidth: 360,
        }}
        tooltipContent="Approx. value of amount staked by the delegator for delegating validators"
      />
    </Container>
  );
};

export default DelegatorInfos;
