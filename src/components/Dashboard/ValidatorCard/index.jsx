/*eslint-disable*/
import ValidatorTable from "./ValidatorTable";
import { Container } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkIfDelegatorExist } from "../../../redux/Reducer/auth";
import getDelegatorByAddress from "../../../services/api/getDelegatorByAddress";

const DashboardValidatorCard = () => {
  const { userAddress, isDelegated } = useSelector((state) => state.auth);
  const [dashboardData, setDashboardData] = useState("");
  const [dashboardStatus, setDashboardStatus] = useState("Idle");
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userAddress) {
          setDashboardStatus("Fetching");
          const response = await getDelegatorByAddress(userAddress);
          if (
            response?.error === false &&
            response?.data?.validatorStakes?.length > 0
          ) {
            setDashboardData(response?.data);
            dispatch(checkIfDelegatorExist(true));
            setDashboardStatus("Success");
          } else {
            dispatch(checkIfDelegatorExist(false));
            setDashboardStatus("Error");
          }
        }
      } catch (err) {
        setDashboardStatus("Error");
        dispatch(checkIfDelegatorExist(false));
        return err;
      }
    };
    fetchData();
  }, [userAddress]);

  // const onValidate = useCallback(() => {
  //   navigate("/validators");
  // }, []);

  return (
    <Container>
      <section className="validator-status" style={{ width: "100%" }}>
        {/* <div className="validator-status__card">
          {isDelegated ? (
            <Button variant="outlined" onClick={onValidate}>
              Delegate More
            </Button>
          ) : (
            <Button variant="outlined" onClick={onValidate}>
              Become A Delegator
            </Button>
          )}
        </div> */}
        {isDelegated && (
          <ValidatorTable
            dashboardData={dashboardData?.validatorStakes}
            dashboardStatus={dashboardStatus}
          />
        )}
      </section>
    </Container>
  );
};

export default DashboardValidatorCard;
