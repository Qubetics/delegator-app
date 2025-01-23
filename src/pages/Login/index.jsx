/*eslint-disable */
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import TextField from "../../components/Common/TextField";
import { logInSuccess } from "../../redux/Reducer/auth";
import LoginIcon from "../../assets/Icons/LoginIcon";
import fetchValoperAddress from "../../services/fetchValoperAddress";
import { useState } from "react";
import { toast } from "../../components/toast/Toast";
import { getUserAddress } from "../../services/GetAddress";
import Loader from "../../components/Common/Loader";

const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, setMnemonics] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      if (!mnemonics) {
        toast.error("Mnemonics is required!");
        return;
      }
      if (mnemonics?.length > 0) {
        setIsLoading(true);
        let res = await getUserAddress(mnemonics);
        if (res?.message) {
          toast.error(res?.message);
          return;
        }
        let response = await fetchValoperAddress(mnemonics);
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
                </button>
              </div>
            </form>
          </div>
        </>
        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default Login;
