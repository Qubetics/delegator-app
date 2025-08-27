/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/Common/FormWrapper";
import TextField from "../../../components/Common/TextField";
import DetailsBox from "../../../components/Common/DetailsBox";
import { useNavigate } from "react-router-dom";
import {
  MINIMUM_BOND_MORE_AMOUNT,
  NODE_NAME,
} from "../../../components/Common/Constant";
import BackButton from "../../../components/BackButton/BackButton";
import {
  NumFixed,
  countDecimal,
  removeZero,
  toFixed,
} from "../../../utils/helper";
import { bondMoreValidations } from "../../../utils/validations";
import { noExponential } from "../../../utils/commonFunctions";
import { getUserAddress } from "../../../services/GetAddress";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import delagteAndBondMore from "../../../services/Delegate&BondMore";
import { toast } from "../../../components/toast/Toast";
import { keplrBondMore } from "../../../keplrEvents/KeplrBondMore";
import { checkTransaction } from "../../../components/CheckTransaction/checkTransaction";
import { cosmosStationBondMore } from "../../../cosmostationEvents/bondMore";

const Bond = () => {
  const drawer = useSelector((state) => state?.drawer);
  const { userBalance, userAddress, walletType } = useSelector(
    (state) => state?.auth
  );
  const { selectedAccounts } = drawer;
  const [mnemonics, setMnemonics] = useState("");
  const [isDisable, setIsDisable] = useState(false);
  const [stakeAmount, setStakeAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState({ amount: "", mnemonics: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let nodeUrl = NODE_NAME || "";

  const onBackClick = () => {
    setStakeAmount("");
    navigate(-1);
  };

  const handleMaxAmt = () => {
    if (
      Number(userBalance) > 0 &&
      Number(userBalance) >= Number(MINIMUM_BOND_MORE_AMOUNT)
    ) {
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
    if (
      !stakeAmount ||
      !mnemonics ||
      errMsg?.amount?.length > 0 ||
      errMsg?.mnemonics?.length > 0
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, stakeAmount, mnemonics]);

  const handleBondMore = async () => {
    try {
      const amount = Number(stakeAmount);
      const balance = Number(userBalance);
      const minAmount = Number(MINIMUM_BOND_MORE_AMOUNT);

      if (!amount) return toast.error("Enter bond amount");
      if (amount > balance) return toast.error("Insufficient funds");
      if (balance < minAmount) return toast.error("Low wallet balance");
      if (amount < minAmount)
        return toast.error(`Bond amount should be at least ${minAmount}`);

      const walletExtensions = {
        keplr: window?.keplr,
        qubetics: window?.qubetics,
        cosmostation: window.cosmostation,
      };

      if (walletType in walletExtensions && !walletExtensions[walletType]) {
        return toast.error(`Install ${walletType} Wallet extension`);
      }

      if (walletType === "noWallet") {
        if (!mnemonics?.trim()) {
          return toast.error("Enter Mnemonics");
        }
        const res = await getUserAddress(mnemonics);
        if (res !== userAddress && walletType == "noWallet") {
          return toast.error("Mnemonics are not same as login");
        }
      }

      setIsLoading(true);
      const valoperAddress = selectedAccounts?.valoperAddress;
      const data = { userAddress, stakeAmount, valoperAddress, nodeUrl };

      if (walletType === "noWallet") {
        const response = await delagteAndBondMore(
          mnemonics,
          userAddress,
          stakeAmount,
          selectedAccounts?.valoperAddress
        );
        if (response) {
          dispatch(isTxOccur(true));
          setTimeout(() => checkTransaction(response, navigate), 3000);
        }
        return;
      }

      if (window?.keplr && walletType === "keplr") {
        await keplrBondMore(
          userAddress,
          stakeAmount,
          valoperAddress,
          setIsLoading,
          navigate
        );
      }
      if (walletType === "cosmostation") {
        await cosmosStationBondMore(
          userAddress,
          valoperAddress,
          stakeAmount,
          setIsLoading,
          navigate
        );
      }
      if (window?.qubetics && walletType === "qubetics") {
        window.qubetics.sendRequest(
          "delegatorBondMoreFunds",
          data,
          (error, response) => {
            if (response?.type === "error") {
              setIsLoading(false);
              return toast.error(
                response?.data?.message || "Something went wrong"
              );
            } else {
              dispatch(isTxOccur(true));
              if (response) {
                setTimeout(
                  () => checkTransaction(response?.data, navigate),
                  4000
                );
              }
            }
          }
        );
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      const msg =
        err?.message?.split("Broadcasting transaction failed with code")[1] ||
        "Unknown error";
      toast.error(msg);
      console.error(err);
    }
  };
   const notes = [
    "Your account status may take some time to update and reflect on the dashboard.",
    "Your reward earned balance will be transferred to available balance while doing this action.",
  ];
  return (
    <>
      <DetailsBox address={selectedAccounts?.accounts} />
      <FormWrapper>
        <div className="common-wrapper">
          <BackButton onClick={onBackClick} />
          <Typography className="common-wrapper__title">
            Bond More Funds
          </Typography>
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
            <Button
              variant="contained"
              className="maxBtn"
              onClick={handleMaxAmt}
            >
              Max
            </Button>
          </div>

          {walletType == "noWallet" && (
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
                    <strong>Note :</strong> Your account status may take some
                    time to update and reflect on the dashboard.
                    <br />
                    <span style={{ color: "red" }}>{errMsg?.mnemonics}</span>
                    <br />
                  </>
                }
                autoComplete="off"
              />
            </div>
          )}
          {walletType !== "noWallet" && (
            <div className="redelect">
                <strong>Note :</strong>
                {notes.map((note, index) => (
                  <p key={index}>
                    <strong>{index + 1}.</strong> {note}
                  </p>
                ))}
              </div>
          )}
          <Button
            variant="outlined"
            fullWidth
            className="reletebtn headermetaBtn"
            sx={
              {
                // marginTop: "50px",
              }
            }
            // disabled={isDisable || isLoading}
            onClick={handleBondMore}
          >
            Bond More
          </Button>
        </div>
      </FormWrapper>
      {isLoading && <Loader />}
    </>
  );
};

export default Bond;
