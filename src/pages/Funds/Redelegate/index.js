/*eslint-disable*/
import {
  Button,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormWrapper from "../../../components/Common/FormWrapper";
import TextField from "../../../components/Common/TextField";
import DetailsBox from "../../../components/Common/DetailsBox";
import { useNavigate } from "react-router-dom";
import BackButton from "../../../components/BackButton/BackButton";
import "./style.css";
import getAllValidators from "../../../services/api/getAllValidators";
import { bondMoreValidations } from "../../../utils/validations";
import { redelegate } from "../../../services/Redelegation";
import { getUserAddress } from "../../../services/GetAddress";
import { toast } from "../../../components/toast/Toast";
import { isTxOccur } from "../../../redux/Reducer/auth";
import Loader from "../../../components/Common/Loader";
import { typesOfTransaction } from "../../../components/Common/Constant";
import { Spin } from "antd";

const Redelegate = () => {
  const auth = useSelector((state) => state?.auth);
  const drawer = useSelector((state) => state?.drawer);
  const { selectedAccounts } = drawer;
  const { userAddress } = auth;
  const [redelegationAddress, setRedligationAddress] = useState("");
  const [valoperAddress, setValoperAddress] = useState("");
  const [validatorList, setVaidatorList] = useState([]);
  const [mnemonics, setMnemonics] = useState("");
  const navigate = useNavigate();
  const [isDisable, setIsDisable] = useState(false);
  const [errMsg, setErrMsg] = useState({ mnemonics: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = async (e) => {
    let { name, value } = e.target;
    if (name === "Mnemonics") {
      bondMoreValidations(e, setErrMsg);
      setMnemonics(value);
    }
  };

  const onBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await getAllValidators(1, 10, -1);
        let validators = response?.data?.validators;
        if (selectedAccounts?.accounts && validators) {
          const filteredAddresses = validators?.filter(
            (item) => item?.validatorAddress !== selectedAccounts?.accounts
          );
          setVaidatorList(filteredAddresses);
        }
      } catch (err) {
        return err;
      }
    };
    fetchListing();
  }, []);

  useEffect(() => {
    if (
      !redelegationAddress ||
      !mnemonics ||
      errMsg?.mnemonics?.length > 0 ||
      !valoperAddress
    ) {
      setIsDisable(true);
    } else {
      setIsDisable(false);
    }
  }, [errMsg, redelegationAddress, mnemonics, valoperAddress]);
  const handleReDelegation = async () => {
    try {
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
      const response = await redelegate(
        mnemonics,
        selectedAccounts?.valoperAddress,
        valoperAddress,
        selectedAccounts?.stake
      );
      dispatch(isTxOccur(true));
      if (response?.code == 0) {
        setTimeout(async () => {
          navigate("/dashboard");
          toast.success("Transaction successful");
          setIsLoading(false);
        }, 4000);
      } else {
        setIsLoading(false);
        navigate("/dashboard");
        let msg = response?.rawLog;
        toast.error(msg);
      }
    } catch (err) {
      setIsLoading(false);
      navigate("/dashboard");
      let msg = err?.message?.split(
        "Broadcasting transaction failed with code"
      );
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
          <Typography className="common-wrapper__title">
            Redelegate Funds
          </Typography>
          <div className="common-wrapper__amount">
            <div>
              <FormControl sx={{ width: "100%" }}>
                {!redelegationAddress ? (
                  // <InputLabel id="validator-select-label">
                  //   Select the validator for redelegation
                  // </InputLabel>
                  <></>
                ) : (
                  ""
                )}

                <Select
                  labelId="validator-select-label"
                  name="validator_list"
                  displayEmpty
                  value={valoperAddress}
                  onClose={(e) => {
                    const validatorAddress = e?.target?.outerText || "";
                    const finalAddress = validatorAddress
                      ?.split("(")[1]
                      ?.split(")")[0];
                    setRedligationAddress(finalAddress);
                    setValoperAddress(e?.target?.dataset?.value);
                  }}
                  inputProps={{ "aria-label": "Without label" }}
                >
                  <MenuItem disabled value="">
                    <em style={{ color: "rgba(83, 82, 82, 0.88)" }}> Select the validator for redelegation  </em>
                  </MenuItem>
                  {validatorList
                    ? validatorList?.map((item) => {
                      return (
                        <MenuItem
                          key={item?.operatorAddress}
                          value={item?.operatorAddress}
                        >
                          {item?.name}, ({item?.validatorAddress})
                        </MenuItem>
                      );
                    })
                    : ""}
                </Select>
              </FormControl>
            </div>
          </div>
          <div className="common-wrapper">
            <TextField
              value={mnemonics}
              label="Enter mnemonics to authorize the transaction"
              placeholder="Paste or enter your mnemonics"
              name="Mnemonics"
              type="password"
              onChange={handleChange}
              helperText="Your account status may take some time to update and reflect on the dashboard."
              autoComplete="off"
            />
          </div>
          <Button
            onClick={handleReDelegation}
            variant="outlined"
            fullWidth
            sx={{
              marginTop: "50px",
            }}
            disabled={isDisable || isLoading}
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
              "Redelegate"
            )}
          </Button>
        </div>
      </FormWrapper>
    </>
  );
};

export default Redelegate;
