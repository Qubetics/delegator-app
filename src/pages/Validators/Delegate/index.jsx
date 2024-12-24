/*eslint-disable*/
import { useState } from "react";
import SetupBond from "../../../components/Delegate/SetupBond";
import { useDispatch, useSelector } from "react-redux";
import { FEE, MINIMUM_BOND_AMOUNT, typesOfTransaction } from "../../../components/Common/Constant";
import { getUserAddress } from "../../../services/GetAddress";
import delagteAndBondMore from "../../../services/Delegate&BondMore";
import getTransactionLogs from "../../../services/api/getTxLogs";
import { useNavigate } from "react-router-dom";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import { toast } from "../../../components/toast/Toast";

const Delegate = () => {
  const [stakeAmount, setStakeAmount] = useState("");
  const [mnemonics, setMnemonics] = useState("");
  const { userAddress, userBalance } = useSelector((state) => state?.auth);
  const [errMsg, setErrMsg] = useState({
    amount: '',
    mnemonics: ''
  })
  const { selectedAccounts } = useSelector((state) => state?.drawer);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate('')
  const dispatch = useDispatch();

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
      if (Number(userBalance) < Number(FEE) || Number(userBalance) < Number(MINIMUM_BOND_AMOUNT) + Number(FEE)) {
        toast.error('Low wallet Balance');
        return;
      }
      if (Number(stakeAmount) < Number(MINIMUM_BOND_AMOUNT) + Number(FEE)) {
        toast.error(`Bond amount should be equal or greater than minimum required bond amount + fee ${Number(MINIMUM_BOND_AMOUNT) + Number(FEE)} `);
        return;
      }
      if (!mnemonics || mnemonics?.length < 0 || mnemonics == '') {
        toast.error('Enter Mnemonics');
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
      setIsLoading(true)
      const response = await delagteAndBondMore(mnemonics, userAddress, stakeAmount, selectedAccounts?.valoperAddress);
      dispatch(isTxOccur(true));
      if (response?.length > 0) {
        setTimeout(() => {
          const fetchData = async () => {
            let resp = await getTransactionLogs(response)
            if (resp?.result?.tx_result?.data === null) {
              setIsLoading(false)
              toast.error('Transaction failed')
              navigate('/dashboard')
            } else {
              setIsLoading(false)
              toast.success('Transaction successful')
              navigate('/dashboard');
            }
          }
          fetchData();
        }, 5000)
      }
    } catch (err) {
      setIsLoading(false)
      navigate('/dashboard')
      let msg = err?.message?.split('Broadcasting transaction failed with code')
      toast.error(msg[1])
    }
  };
  return (
    <>
      {isLoading ? <Loader /> :
        <SetupBond
          setStakeAmount={setStakeAmount}
          stakeAmount={stakeAmount}
          mnemonics={mnemonics}
          setMnemonics={setMnemonics}
          setErrMsg={setErrMsg}
          errMsg={errMsg}
          handleSetUpDelegator={handleSetUpDelegator}
        />
      }
    </>
  );
};

export default Delegate;
