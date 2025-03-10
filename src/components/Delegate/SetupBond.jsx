/*eslint-disable*/
import { Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import { FEE, MINIMUM_BOND_AMOUNT } from "../Common/Constant";
import DetailValidator from "../Common/DetailValidator";
import FormWrapper from "../Common/FormWrapper";
import TextField from "../Common/TextField";
import { SetupWrapper } from "./styles";
import { NumFixed, countDecimal, removeZero } from "../../utils/helper";
import { bondMoreValidations } from "../../utils/validations";
import { noExponential } from "../../utils/commonFunctions";
import DetailsBox from "../Common/DetailsBox";

const SetupBond = ({
  setStakeAmount,
  stakeAmount,
  mnemonics,
  setMnemonics,
  setErrMsg,
  errMsg,
  handleSetUpDelegator,
}) => {
  const [isDisable, setIsDisable] = useState(false);
  const navigate = useNavigate();
  const { userBalance, walletType } = useSelector((state) => state?.auth);
  const { selectedAccounts } = useSelector((state) => state?.drawer);

  const onBackClick = () => {
    navigate(-1);
    setStakeAmount("");
  };

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Bond_Amount") {
      if (
        !isNaN(Number(value)) &&
        value !== " " &&
        !value.includes("+") &&
        !value.includes("-") &&
        countDecimal(value) <= 18
      ) {
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
    if (!stakeAmount || errMsg?.amount?.length > 0) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, stakeAmount, mnemonics]);

  const handleMaxAmt = () => {
    if (
      Number(userBalance) > 0 &&
      Number(userBalance) > Number(FEE) &&
      Number(userBalance) >= Number(MINIMUM_BOND_AMOUNT) + Number(FEE)
    ) {
      let remianingAmt = Number(userBalance) - Number(FEE);
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
  return (
    <SetupWrapper>
      <FormWrapper>
        <div className="common-wrapper">
          <BackButton onClick={onBackClick} />
          <Typography className="common-wrapper__title">
            Setup Delegator Bond
          </Typography>
          <div className="common-wrapper__amount">
            <TextField
              paddingright={100}
              title="Funds to Bond"
              placeholder="Enter amount"
              value={NumFixed(stakeAmount)}
              name="Bond_Amount"
              helperText={
                <>
                  <span style={{ color: "red" }}>{errMsg?.amount}</span>
                  <br />
                </>
              }
              onChange={handleChange}
              label="Enter amount to stake"
              autoComplete="off"
            />
            <Button
              variant="outlined"
              className="maxBtn"
              onClick={handleMaxAmt}
            >
              Max
            </Button>
          </div>
          {walletType == "noWallet" && (
            <TextField
              value={mnemonics}
              label="Enter mnemonics to authorize the transaction"
              placeholder="Paste or enter your mnemonics"
              type="password"
              name="Mnemonics"
              onChange={handleChange}
              className="delegatorbnd"
              helperText={
                <>
                  <strong>Note :</strong> Your account status may take some time
                  to update and reflect on the dashboard.
                  <br />
                  <span style={{ color: "red" }}>{errMsg?.mnemonics}</span>
                  <br />
                </>
              }
              autoComplete="off"
            />
          )}
          {walletType !== "noWallet" && (
            <div>
              <strong>Note:</strong> Your account status may take some time to
              update and reflect on the dashboard.
            </div>
          )}

          <Button
            sx={{ marginTop: "50px" }}
            onClick={handleSetUpDelegator}
            disabled={isDisable}
            className="btnbondmore headermetaBtn"
            style={{ margin: "auto", display: "block" }}
          >
            Sign & Submit
          </Button>
        </div>
      </FormWrapper>
    </SetupWrapper>
  );
};

export default SetupBond;
