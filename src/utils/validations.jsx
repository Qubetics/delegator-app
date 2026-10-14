import { noExponential } from "./commonFunctions";

export const bondMoreValidations = (e, setErrMsg, amount) => {
  let { name, value } = e.target;

  if (name === "Bond_Amount" || name === "Bond_More") {
    setErrMsg((prev) => ({ ...prev, amount: "" }));
    if (!value || value == "") {
      setErrMsg((prev) => ({ ...prev, amount: "Enter bond amount" }));
      return;
    }
    if (!amount || amount == 0) {
      setErrMsg((prev) => ({ ...prev, amount: `Insufficient funds` }));
      return;
    }
    if (Number(value) > Number(amount)) {
      setErrMsg((prev) => ({
        ...prev,
        amount: `Stake Amount should be less than ${noExponential(amount)}`,
      }));
      return;
    }
    if (Number(value) > Number(amount)) {
      setErrMsg((prev) => ({
        ...prev,
        amount: "You have insufficient balance",
      }));
      return;
    }
    if (Number(value) <= 0) {
      setErrMsg((prev) => ({
        ...prev,
        amount: "Bonded amount must be greater than 0",
      }));
      return;
    }
  }
  if (name === "Unbond_Amount") {
    setErrMsg((prev) => ({ ...prev, amount: "" }));
    if (!value) {
      setErrMsg((prev) => ({ ...prev, amount: "Enter unbonding amount" }));
      return;
    }
    if (Number(value) > Number(amount)) {
      setErrMsg((prev) => ({
        ...prev,
        amount: "You have insufficient bonded amount",
      }));
      return;
    }
    if (Number(value) <= 0) {
      setErrMsg((prev) => ({
        ...prev,
        amount: "unbonding amount must be greater than 0",
      }));
      return;
    }
  } else if (name === "Mnemonics") {
    setErrMsg((prev) => ({ ...prev, mnemonics: "" }));
    if (!value) {
      setErrMsg((prev) => ({ ...prev, mnemonics: "Enter mnemonics" }));
      return;
    }
  }
};
