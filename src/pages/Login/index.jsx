/*eslint-disable */
import { Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import TextField from "../../components/Common/TextField";
import { getEvmAddress, logInSuccess } from "../../redux/Reducer/auth";
import LoginIcon from "../../assets/Icons/LoginIcon";
import fetchValoperAddress from "../../services/fetchValoperAddress";
import { useState } from "react";
import { toast } from "../../components/toast/Toast";
import { getUserAddress } from "../../services/GetAddress";
import Loader from "../../components/Common/Loader";
import { NODE_NAME } from "../../components/Common/Constant";
import { userEvmAddress } from "../../services/userEvmAddress";

const Login = () => {
  const dispatch = useDispatch();
  const [mnemonics, setMnemonics] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const data = {
        nodeUrl: NODE_NAME,
      };
      window.qubetics.sendRequest(
        "nativeConnect",
        data,
        async (error, response) => {

        setIsLoading(true);
        let res = await getUserAddress(mnemonics);
        let evmAddress = await userEvmAddress(mnemonics);

        if (res?.message) {
          toast.error(res?.message);
          if (response?.type == "error") {
            setIsLoading(false);
            toast.error(response?.data?.message || "Something went wrong");
          } else {
            if (response) {
              console.log(response, "RESREESESDELEGATOR");
              // setIsLoading(true);
          

        let response = await fetchValoperAddress(mnemonics);
        dispatch(getEvmAddress(evmAddress));

        dispatch(logInSuccess(res));

        return toast.success("Logged In Successfully");
            }
          }
        
      
        }
     catch (err) {
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
                  Login
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
