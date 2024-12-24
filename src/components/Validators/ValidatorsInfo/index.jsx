/*eslint-disable*/
import { useSelector } from "react-redux";
import { Container } from "./styles";
import Card from "./Card";
import StakingIcon from "../../../assets/Icons/StakingIcon";
import ValidatorsNewIcon from "../../../assets/Icons/ValidatorsNewIcon";
import { toFixed } from "../../../utils/helper";

const ValidatorsInfo = () => {
  const { isSidebarOpen } = useSelector((state) => state.drawer);
  const data = useSelector((state) => state?.auth);

  return (
    <Container isOpen={isSidebarOpen}>
      <Card
        icon={<ValidatorsNewIcon />}
        title={"Total Validators:"}
        value={
          data?.totalValidators
            ? data?.totalValidators
            : 0
        }
      />
      <Card
        icon={<StakingIcon />}
        title={"Staking APY:"}
        value={data?.APY ? toFixed(data?.APY, 2) + "%" : 0}
      />
    </Container>
  );
};

export default ValidatorsInfo;
