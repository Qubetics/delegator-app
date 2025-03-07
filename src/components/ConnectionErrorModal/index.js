/*eslint-disable*/
import { Button, Typography } from "@mui/material";
import { CancelIconWrapper, DialogContent, StyledDialog } from "./styles";
import ConnectionErrorImage from "../../assets/Images/ConnectionError.png";
import CancelIcon from "../../assets/Icons/CancelIcon";
import { OsmosisChainInfo } from "../../constants";
import { showEvmAddress } from "../../services/showEvmAddress";
import {
  getEvmAddress,
  getWalletType,
  logInSuccess,
} from "../../redux/Reducer/auth";
import { toast } from "../toast/Toast";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import { NODE_NAME } from "../Common/Constant";

const ConnectionErrorModal = ({ connectionOpen, connectionClose }) => {
  const dispatch = useDispatch();
  const [qubeticsWalletExits, setIsQubeticsWalletExist] = useState(false);
  const [keplrWalletExits, setKeplrWalletExist] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!window?.qubetics) {
      setIsQubeticsWalletExist(true);
    }
    if (!window?.keplr) {
      setKeplrWalletExist(true);
    }
  }, []);

  const connectWallet = async (event, walletType) => {
    event.preventDefault();
    if (walletType == "qubetics") {
      if (!window?.qubetics) {
        toast.error("Intall Qubetics Wallet Extenion");
      }
      try {
        if (window?.qubetics) {
          const data = {
            nodeUrl: NODE_NAME,
          };
          window.qubetics.sendRequest(
            "nativeConnect",
            data,
            async (error, response) => {
              if (response?.type == "error") {
                setIsLoading(false);
                toast.error(response?.data?.message || "Something went wrong");
                return;
              } else {
                if (response) {
                  dispatch(getWalletType("qubetics"));
                  dispatch(logInSuccess(response?.data?.address));
                  dispatch(getEvmAddress(response?.data?.address));
                  return toast.success("Logged In Successfully");
                }
              }
            }
          );
        }
      } catch (err) {
        setIsLoading(false);
        toast.error(err?.message);
      }
    }
    if (walletType == "keplr") {
      if (!window.keplr) {
        toast.error("Install Keplr Wallet extension");
        return;
      }

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
        console.error("Error connecting Keplr:", error);
      }
    }
  };

  return (
    <>
      <StyledDialog
        className="connectionAttempt"
        open={connectionOpen}
        // onClose={connectionClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <CancelIconWrapper>
          <CancelIcon onClick={connectionClose} />
        </CancelIconWrapper>
        <DialogContent>
          <h3>Login with</h3>

          <div className="connectionAttempt_btn">
            <div className="connectionAttempt_btn_inner">
              <Button
                className={`headermetaBtn  ${
                  keplrWalletExits ? "disabled" : ""
                }`}
                onClick={(event) => connectWallet(event, "keplr")}
                disabled={keplrWalletExits}
              >
                Keplr Connect
              </Button>
              {window?.keplr ? (
                <p className="install">install </p>
              ) : (
                <p className="uninstall">Uninstall</p>
              )}
            </div>
            <div className="connectionAttempt_btn_inner">
              <Button
                className={`headermetaBtn  ${
                  qubeticsWalletExits ? "disabled" : ""
                }`}
                onClick={(event) => connectWallet(event, "qubetics")}
                disabled={qubeticsWalletExits}
              >
                Qubetics Wallet
              </Button>
              {window?.qubetics ? (
                <p className="install">install </p>
              ) : (
                <p className="uninstall">Uninstall</p>
              )}
            </div>
          </div>
        </DialogContent>
      </StyledDialog>
      {isLoading && <Loader />}
    </>
  );
};

export default ConnectionErrorModal;
