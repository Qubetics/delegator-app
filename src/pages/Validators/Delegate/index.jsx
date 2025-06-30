/*eslint-disable*/
import { useState } from "react";
import SetupBond from "../../../components/Delegate/SetupBond";
import { useDispatch, useSelector } from "react-redux";
import {
  FEE,
  MINIMUM_BOND_AMOUNT,
  NODE_NAME,
} from "../../../components/Common/Constant";
import delagteAndBondMore from "../../../services/Delegate&BondMore";
import { useNavigate } from "react-router-dom";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import { toast } from "../../../components/toast/Toast";
import { keplrBondMore } from "../../../keplrEvents/KeplrBondMore";
import { checkTransaction } from "../../../components/CheckTransaction/checkTransaction";
import { getUserAddress } from "../../../services/GetAddress";
import { cosmosStationBondMore } from "../../../cosmostationEvents/bondMore";

const Delegate = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const { userAddress, userBalance, walletType } = useSelector(
    (state) => state?.auth
  );
  const [errMsg, setErrMsg] = useState({
    amount: "",
    mnemonics: "",
  });
  const { selectedAccounts } = useSelector((state) => state?.drawer);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const nodeUrl = NODE_NAME;

  const handleSetUpDelegator = async () => {
    try {
      if (stakeAmount === 0 || stakeAmount === "") {
        toast.error("Enter bond amount");
        return;
      }
      if (Number(stakeAmount) > Number(userBalance)) {
        toast.error("Insufficient funds");
        return;
      }
      if (
        Number(userBalance) < Number(FEE) ||
        Number(userBalance) < Number(MINIMUM_BOND_AMOUNT) + Number(FEE)
      ) {
        toast.error("Low wallet Balance");
        return;
      }
      if (Number(stakeAmount) < Number(MINIMUM_BOND_AMOUNT) + Number(FEE)) {
        toast.error(
          `Bond amount should be equal or greater than minimum required bond amount + fee ${
            Number(MINIMUM_BOND_AMOUNT) + Number(FEE)
          } `
        );
        return;
      }
      if (walletType == "noWallet") {
        if (!mnemonics || mnemonics?.length < 0 || mnemonics == "") {
          toast.error("Enter Mnemonics");
          return;
        }
        let res = await getUserAddress(mnemonics);
        if (res?.message) {
          return toast.error("Invalid Mnemonics");
        }
        if (res?.length > 0 && res !== userAddress) {
          toast.error("Mnemonics are not same as login");
          return;
        }
      }
      if (walletType == "keplr" && !window?.keplr) {
        toast.error("Install Keplr Wallet extension");
        return;
      }

      if (walletType == "qubetics" && !window?.qubetics) {
        toast.error("Install Qubetics Wallet extension");
        return;
      }

      if (walletType === "cosmostation" && !window?.cosmostation) {
        toast.error("Install Cosmostation Wallet extension");
        return;
      }

      setIsLoading(true);
      const valoperAddress = selectedAccounts?.valoperAddress;

      const data = {
        userAddress,
        stakeAmount,
        valoperAddress,
        nodeUrl,
      };

      if (walletType == "noWallet") {
        const response = await delagteAndBondMore(
          mnemonics,
          userAddress,
          stakeAmount,
          selectedAccounts?.valoperAddress
        );
        if (response) {
          dispatch(isTxOccur(true));
          setTimeout(() => checkTransaction(response, navigate), 4000);
        }
      }
      if (window?.keplr && walletType == "keplr") {
        await keplrBondMore(
          userAddress,
          stakeAmount,
          valoperAddress,
          setIsLoading,
          navigate
        );
      }

      if (window?.qubetics && walletType == "qubetics") {
        window?.qubetics?.sendRequest(
          "delegatorBondMoreFunds",
          data,
          (error, response) => {
            if (response.type == "error") {
              setIsLoading(false);
              toast.error(response?.data?.message || "Something went wrong");
              return;
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
      
      if (walletType === "cosmostation") {
        await cosmosStationBondMore(
          userAddress,
          valoperAddress,
          stakeAmount,
          setIsLoading,
          navigate,
        );
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
      console.log(err);
      toast.error(msg[1]);
    }
  };
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <SetupBond
          setStakeAmount={setStakeAmount}
          stakeAmount={stakeAmount}
          mnemonics={mnemonics}
          setMnemonics={setMnemonics}
          setErrMsg={setErrMsg}
          errMsg={errMsg}
          handleSetUpDelegator={handleSetUpDelegator}
        />
      )}
    </>
  );
};

export default Delegate;
