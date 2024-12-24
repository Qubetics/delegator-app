import Big from "big.js";
import { noExponential } from "./commonFunctions";

export function NumFixed(x) {
  if (Math.abs(x) < 1.0) {
    let e = parseInt(x?.toString()?.split("e-")[1]);
    if (e) {
      x *= Math.pow(10, e - 1);
      x = "0." + new Array(e)?.join("0") + x?.toString().substring(2);
    }
  } else {
    let e = parseInt(x?.toString()?.split("+")[1]);
    if (e > 20) {
      e -= 20;
      x /= Math?.pow(10, e);
      x += new Array(e + 1)?.join("0");
    }
  }
  return x;
}

export const removeZero = (val) => {
  const newVal = String(val).replace(/^0+(?!\.|$)/, "");
  return newVal;
};

export const countDecimal = (num) => String(num).split(".")[1]?.length || 0;

export const getAddress = (data = "", startLen, endLen) => {
  return `${data.substring(0, startLen)}.....${data.substring(
    data?.length - endLen,
    data?.length
  )}`;
};

export function toFixed(num, fixed) {
  fixed = fixed || 0;
  fixed = Math.pow(10, fixed);
  return noExponential(Number(Math.floor(num * fixed) / fixed));
}

//To overcome the javascript's functionality of converting a big decimal no into next whole num like 10.9999999999999999999 will be 11
export function toPrecision(num) {
  let number = num.toString();
  const result = Big(number).div(Big("10").pow(18));
  const respectedRes = result.div(1).toFixed();
  return respectedRes;
}

export function toPrecisionMultiply(num) {
  let number = num;
  const result = Big(number).mul(Big("10").pow(18));
  const respectedRes = result.mul(1).toFixed();
  return respectedRes;
}
