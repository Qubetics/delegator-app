/*eslint-disable */
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import TextField from "../../components/Common/TextField";
import {
  getEvmAddress,
  getWalletType,
  logInSuccess,
} from "../../redux/Reducer/auth";
import LoginIcon from "../../assets/Icons/LoginIcon";
import fetchValoperAddress from "../../services/fetchValoperAddress";
import { useState } from "react";
import { toast } from "../../components/toast/Toast";
import { getUserAddress } from "../../services/GetAddress";
import Loader from "../../components/Common/Loader";
import { userEvmAddress } from "../../services/userEvmAddress";
import ConnectionErrorModal from "../../components/ConnectionErrorModal";
import { OsmosisChainInfo } from "../../constants";
import { showEvmAddress } from "../../services/showEvmAddress";

const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, setMnemonics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(false);

  const submitHandler = async (event, walletType) => {
    event.preventDefault();
    if (walletType == "keplr") {
      if (!window.keplr) {
        toast.error("Install Keplr Wallet extension");
        return;
      }
      setIsLoading(true);
      const chainId = OsmosisChainInfo?.chainId;

      try {
        await window.keplr.disable(chainId);

        await window.keplr.enable(chainId);

        const offlineSigner = window.keplr.getOfflineSigner(chainId);
        const accounts = await offlineSigner.getAccounts();
        let evmAddress = await showEvmAddress(accounts[0].address);
        if (accounts[0].address) {
          dispatch(getWalletType("keplr"));
          dispatch(getEvmAddress(evmAddress));

          dispatch(logInSuccess(accounts[0].address));
          return toast.success("Logged In Successfully");
        }
      } catch (error) {
        setIsLoading(false);
        console.error("Error connecting Keplr:", error);
        toast.error("Failed to connect Keplr. Please try again.");
      }
    }
    if (walletType == "noWallet") {
      try {
        if (!mnemonics) {
          toast.error("Mnemonics is required!");
          return;
        }
        if (mnemonics?.length > 0) {
          setIsLoading(true);
          let res = await getUserAddress(mnemonics);
          let evmAddress = await userEvmAddress(mnemonics);

          if (res?.message) {
            setIsLoading(false);
            toast.error("Invalid Mnemonics");
            return;
          }
          dispatch(getEvmAddress(evmAddress));
          dispatch(getWalletType("noWallet"));
          dispatch(logInSuccess(res));

          return toast.success("Logged In Successfully");
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.message);
      }
    }
  };

  const changeHandler = (e) => {
    setMnemonics(e.target.value);
  };

  const openConnection = () => {
    setConnectionOpen(true);
  };

  const connectionClose = () => {
    setConnectionOpen(false);
  };

  return (
    <>
      <div className="auth-wrapper">
        <>
          <div className="auth-wrapper__inner">
            <Typography variant="h3">Log In</Typography>
            <form>
              <TextField
                label="Mnemonics"
                value={mnemonics}
                placeholder="Paste or enter your Mnemonics."
                onChange={changeHandler}
                type="password"
                className="input-style"
                id="mnemonics"
              />
              <div className="auth-wrapper__btns">
                <button
                  className="headermetaBtn"
                  // onClick={submitHandler}
                  onClick={(event) => submitHandler(event, "noWallet")}
                >
                  {/* <span className="btn-icon">
                    <LoginIcon />
                  </span> */}
                  Log In
                </button>
              </div>
              <div>
                <h3 style={{ marginBottom: "-9px" }}>OR</h3>
              </div>

              <div className="auth-wrapper__btns">
                <button
                  className="headermetaBtn"
                  // onClick={openConnection}
                  onClick={(event) => submitHandler(event, "keplr")}
                  type="button"
                >
                  Connect With Keplr
                </button>
              </div>
            </form>
          </div>
        </>
        {isLoading && <Loader />}
        {/*
        {connectionOpen && (
          <ConnectionErrorModal
            connectionOpen={connectionOpen}
            connectionClose={connectionClose}
          />
        )}
        */}
      </div>
    </>
  );
};

export default Login;
