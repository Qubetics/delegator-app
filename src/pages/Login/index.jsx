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

const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, setMnemonics] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionOpen, setConnectionOpen] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!mnemonics) {
        toast.error("Mnemonics is required!");
        return;
      }
      if (mnemonics?.length > 0) {
        // setIsLoading(true);
        let res = await getUserAddress(mnemonics);
        let evmAddress = await userEvmAddress(mnemonics);

        if (res?.message) {
          toast.error("Invalid Mnemonics");
          return;
        }
        let response = await fetchValoperAddress(mnemonics);
        dispatch(getEvmAddress(evmAddress));
        dispatch(getWalletType("noWallet"));
        dispatch(logInSuccess(res));

        return toast.success("Logged In Successfully");
      }
    } catch (err) {
      setIsLoading(false);
      toast.error(err?.message);
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
                placeholder="Paste or enter your Mnemonics"
                onChange={changeHandler}
                type="password"
                className="input-style"
                id="mnemonics"
              />
              <div className="auth-wrapper__btns">
                <button className="headermetaBtn" onClick={submitHandler}>
                  {/* <span className="btn-icon">
                    <LoginIcon />
                  </span> */}
                  Log In
                </button>
              </div>

              <div className="auth-wrapper__btns">
                <button
                  className="headermetaBtn"
                  onClick={openConnection}
                  type="button"
                >
                  Connect Wallet
                </button>
              </div>
            </form>
          </div>
        </>
        {isLoading && <Loader />}
        {connectionOpen && (
          <ConnectionErrorModal
            connectionOpen={connectionOpen}
            connectionClose={connectionClose}
          />
        )}
      </div>
    </>
  );
};

export default Login;
