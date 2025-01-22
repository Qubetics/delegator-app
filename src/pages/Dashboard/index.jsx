/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { useCallback, useEffect } from "react";
import DashboardValidatorCard from "../../components/Dashboard/ValidatorCard";
import DelegatorInfos from "../../components/Dashboard/BlockchainInfos";
import ActionTable from "../../components/Dashboard/ValidatorCard/ActionTable";
import { Container } from "./styles";
import { Wrapper, heading_dashboard } from "../Blocks/styles";
import { useDispatch, useSelector } from "react-redux";
import { getWalletBalance, isTxOccur } from "../../redux/Reducer/auth";
import { getUserBalance } from "../../services/getUserBalance";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAddress, isTx, isDelegated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userAddress?.length > 0 || isTx) {
      setTimeout(() => {
        fetchBalance();
        dispatch(isTxOccur(false));
      }, 1500);
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
  const onValidate = useCallback(() => {
    navigate("/validators");
  }, []);
  return (
    <Wrapper className="">
      <Container>
        <div className="dashTitle_btn">
          <h3 className="heading_dashboard" style={{ marginTop: "0px", marginBottom: "0px" }}>
            Delegator Status
          </h3>
          {isDelegated ? (
            <Button className="animatebtn" onClick={onValidate}>
              Delegate More
            </Button>
          ) : (
            <Button className="animatebtn" onClick={onValidate}>
              Become A Delegator
            </Button>
          )}
        </div>
      </Container>

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
