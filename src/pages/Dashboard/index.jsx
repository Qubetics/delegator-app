/*eslint-disable*/
import { useEffect } from "react";
import { Typography } from "@mui/material";
import DashboardValidatorCard from "../../components/Dashboard/ValidatorCard";
import DelegatorInfos from "../../components/Dashboard/BlockchainInfos";
import ActionTable from "../../components/Dashboard/ValidatorCard/ActionTable";
import { Container } from "./styles";
import { Wrapper, heading_dashboard } from "../Blocks/styles";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance, isTxOccur } from "../../redux/Reducer/auth";
import { getUserBalance } from "../../services/getUserBalance";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { userAddress, isTx } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (userAddress?.length > 0 || isTx) {
      setTimeout(() => {
        fetchBalance();
        dispatch(isTxOccur(false))
      }, 1500)
    }
  }, [userAddress, isTx]);

  const fetchBalance = async () => {
    try {
      let response = await getUserBalance(userAddress);
      dispatch(getWalletBalance(response));
    } catch (err) {
      return err;
    }
  };
  return (
    <Wrapper className="">

      <h3 className="heading_dashboard">
        Dashboard
      </h3>
      <DashboardValidatorCard />

      <DelegatorInfos />
      <Container>
        <section className="validator-status mb-0">
          <div className="validator-status__card" style={{ paddingLeft: "0" }}>
            <Typography>Recent Wallet Activities:</Typography>
          </div>
          <ActionTable />{" "}
        </section>
      </Container>
    </Wrapper>
  );
};

export default Dashboard;
