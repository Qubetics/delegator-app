/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/Common/FormWrapper";
import TextField from "../../../components/Common/TextField";
import DetailsBox from "../../../components/Common/DetailsBox";
import { useNavigate } from "react-router-dom";
import { MINIMUM_BOND_MORE_AMOUNT, typesOfTransaction } from "../../../components/Common/Constant";
import BackButton from "../../../components/BackButton/BackButton";
import { NumFixed, countDecimal, removeZero, toFixed } from "../../../utils/helper";
import { bondMoreValidations } from "../../../utils/validations";
import { noExponential } from "../../../utils/commonFunctions";
import { getUserAddress } from "../../../services/GetAddress";
import getTransactionLogs from "../../../services/api/getTxLogs";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import delagteAndBondMore from "../../../services/Delegate&BondMore";
import { toast } from "../../../components/toast/Toast";
import { Spin } from "antd";

const Bond = () => {
  const drawer = useSelector((state) => state?.drawer);
  const { userBalance, userAddress } = useSelector((state) => state?.auth);
  const { selectedAccounts } = drawer;
  const [mnemonics, setMnemonics] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({ amount: "", mnemonics: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onBackClick = () => {
    setStakeAmount("");
    navigate(-1);
  };

  const handleMaxAmt = () => {
    if (Number(userBalance) > 0 && Number(userBalance) >= Number(MINIMUM_BOND_MORE_AMOUNT)) {
      let remianingAmt = toFixed(Number(userBalance), 7);
      setStakeAmount(noExponential(remianingAmt));
      let e = {
        target: { name: "Bond_Amount", value: noExponential(remianingAmt) },
      };
      bondMoreValidations(e, setErrMsg, userBalance);
    } else {
      setStakeAmount(0);
      let e = { target: { name: "Bond_Amount", value: 0 } };
      bondMoreValidations(e, setErrMsg, userBalance);
    }
  };

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Bond_More") {
      if (!isNaN(Number(value)) && value !== " " && !value.includes("+") && !value.includes("-") && countDecimal(value) <= 18) {
        bondMoreValidations(e, setErrMsg, userBalance);
        let val = removeZero(e.target.value);
        setStakeAmount(val);
      }
    }
    if (name === "Mnemonics") {
      bondMoreValidations(e, setErrMsg);
      setMnemonics(value);
    }
  };

  useEffect(() => {
    if (!stakeAmount || !mnemonics || errMsg?.amount?.length > 0 || errMsg?.mnemonics?.length > 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, stakeAmount, mnemonics]);

  const handleBondMore = async () => {
    try {
      if (stakeAmount === 0 || stakeAmount === "") {
        toast.error("Enter bond amount");
        return;
      }
      if (Number(stakeAmount) > Number(userBalance)) {
        toast.error("Insufficient funds");
        return;
      }
      if (Number(userBalance) < Number(MINIMUM_BOND_MORE_AMOUNT)) {
        toast.error("Low wallet Balance");
        return;
      }
      if (Number(stakeAmount) < Number(MINIMUM_BOND_MORE_AMOUNT)) {
        toast.error(`Bond amount should be equal or greater than minimum required bond amount ${Number(MINIMUM_BOND_MORE_AMOUNT)} `);
        return;
      }
      if (!mnemonics || mnemonics?.length < 0 || mnemonics == "") {
        toast.error("Enter Mnemonics");
        return;
      }
      let res = await getUserAddress(mnemonics);
      if (res?.message) {
        return toast.error(res?.message);
      }
      if (res?.length > 0 && res !== userAddress) {
        toast.error("Mnemonics are not same as login");
        return;
      }
      setIsLoading(true);
      const response = await delagteAndBondMore(mnemonics, userAddress, stakeAmount, selectedAccounts?.valoperAddress);
      dispatch(isTxOccur(true));
      if (response?.length > 0) {
        setTimeout(() => {
          const fetchData = async () => {
            let resp = await getTransactionLogs(response);
            if (resp?.result?.tx_result?.data === null) {
              setIsLoading(false);
              toast.error("Transaction failed");
              navigate("/dashboard");
              return;
            } else {
              setIsLoading(false);
              toast.success("Transaction successful");
              navigate("/dashboard");
              return;
            }
          };
          fetchData();
        }, 4000);
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split("Broadcasting transaction failed with code");
      toast.error(msg[1]);
      return err;
    }
  };

  return (
    <>
      <DetailsBox address={selectedAccounts?.accounts} />
      <FormWrapper>
        <div className="common-wrapper">
          <BackButton onClick={onBackClick} />
          <Typography className="common-wrapper__title">Bond More Funds</Typography>
          <div className="common-wrapper__amount">
            <TextField
              title="Additional Funds to Bond"
              placeholder="Enter amount"
              value={NumFixed(stakeAmount)}
              name="Bond_More"
              helperText={
                <>
                  <span style={{ color: "red" }}>{errMsg?.amount}</span>
                  <br />
                </>
              }
              onChange={handleChange}
              label="Enter additional funds to bond"
              autoComplete="off"
            />
            <Button variant="contained" className="maxBtn" onClick={handleMaxAmt}>
              Max
            </Button>
          </div>
          <div className="common-wrapper__amount redelect">
            <TextField
              value={mnemonics}
              label="Enter mnemonics to authorize the transaction"
              placeholder="Paste or enter your mnemonics"
              type="password"
              name="Mnemonics"
              onChange={handleChange}
              helperText={
                <>
                  <strong>Note :</strong> Your account status may take some time to update and reflect on the dashboard..
                  <br />
                  <span style={{ color: "red" }}>{errMsg?.mnemonics}</span>
                  <br />
                </>
              }
              autoComplete="off"
            />
          </div>
          <Button
            variant="outlined"
            fullWidth
            className="reletebtn headermetaBtn"
            sx={
              {
                // marginTop: "50px",
              }
            }
            disabled={isDisable || isLoading}
            onClick={handleBondMore}
          >
            {isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                }}
              >
                <Spin /> {/* Replace with your Loader component */}
                Loading...
              </div>
            ) : (
              "Bond More"
            )}
          </Button>
        </div>
      </FormWrapper>
    </>
  );
};

export default Bond;
