/*eslint-disable*/
import { Button } from "@mui/material";
import { CancelIconWrapper, DialogContent, StyledDialog } from "./styles";
import { OsmosisChainInfo } from "../../constants";
import { showEvmAddress } from "../../services/showEvmAddress";
import {
  getEvmAddress,
  getWalletType,
  logInSuccess,
} from "../../redux/Reducer/auth";
import { toast } from "../toast/Toast";
import { useDispatch } from "react-redux";
import { useState } from "react";
import Loader from "../loader/Loader";
import { NODE_NAME } from "../Common/Constant";

const ConnectionErrorModal = ({ connectionOpen, connectionClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const connectWallet = async (event, walletType) => {
    event.preventDefault();
    if (walletType === "qubetics") {
      if (!window?.qubetics) {
        toast.error("Install Qubetics Wallet Extenion");
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
                  let evmAddress = await showEvmAddress(
                    response?.data?.address
                  );

                  dispatch(getWalletType("qubetics"));
                  dispatch(logInSuccess(response?.data?.address));
                  dispatch(getEvmAddress(evmAddress));
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

    if (walletType === "keplr") {
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

    if (walletType === "cosmostation") {
      try {
        if (!window.cosmostation) {
          toast.error("Please install the Cosmostation extension!");
          return;
        }
        const chainId = OsmosisChainInfo?.chainId;
        await cosmostation.providers.keplr.experimentalSuggestChain(
          OsmosisChainInfo
        );
        const cosmoKeplr = window.cosmostation?.providers?.keplr;

        await cosmostation.providers.keplr.enable(chainId);

        const signer = await cosmoKeplr.getOfflineSigner(chainId);

        const accounts = await signer.getAccounts();
        if (accounts[0].address) {
          let evmAddress = await showEvmAddress(accounts[0].address);
          dispatch(getWalletType("cosmostation"));
          dispatch(getEvmAddress(evmAddress));

          dispatch(logInSuccess(accounts[0].address));
          return toast.success("Logged In Successfully");
        }
      } catch (err) {
        console.error("Connection failed", err);
      }
    }
  };

  return (
    <>
      <StyledDialog
        className="connectionAttempt"
        open={connectionOpen}
        onClose={connectionClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogContent>
          <h3>Login with</h3>

          <div className="connectionAttempt_btn">
            <div className="connectionAttempt_btn_inner">
              <Button
                className="headermetaBtn"
                onClick={(event) => connectWallet(event, "keplr")}
              >
                Keplr Connect
              </Button>
            </div>
            <div className="connectionAttempt_btn_inner">
              <Button
                className="headermetaBtn"
                onClick={(event) => connectWallet(event, "qubetics")}
              >
                Qubetics Wallet
              </Button>
            </div>
            <div className="connectionAttempt_btn_inner">
              <Button
                className="headermetaBtn"
                onClick={(event) => connectWallet(event, "cosmostation")}
              >
                Cosmostation Wallet
              </Button>
            </div>
          </div>
        </DialogContent>
      </StyledDialog>
      {isLoading && <Loader />}
    </>
  );
};

export default ConnectionErrorModal;
