/*eslint-disable*/
import { Button, Paper, Skeleton, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";
import DetailsBox from "../../../components/Common/DetailsBox";
import { ValidatorDetailItem } from "./styles";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { selectedAccounts } from "../../../redux/Reducer/drawer";
import { toFixed } from "../../../utils/helper";
import { CURRENCY, MINIMUM_BOND_AMOUNT } from "../../../components/Common/Constant";
import { capitalizeFirstLetter, noExponential } from "../../../utils/commonFunctions";
import getValidatorByAddress from "../../../services/api/getValidatorByAddress";
import Loader from "../../../components/Common/Loader";
import CommonModal from "../../../components/CommonModal";
import Sherlock from "../../../components/Sherlock/Sherlock";
import { Wrapper } from "../../../components/Sherlock/Styles";
import { ArrowIcon, CopyIcon } from "../../../assets/Icons/SvgIcon";
import CopyAddress from "../../../components/Common/CopyAddress";

const ValidatorDetails = () => {
  const params = useParams();
  const navigate = useNavigate();
  const address = params?.address;
  const dispatch = useDispatch();
  const [validatorDetail, setValidatorDetail] = useState({});
  const [detailStatus, setDetailStatus] = useState("Init");
  const { userBalance } = useSelector((state) => state?.auth);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setDetailStatus("Fetching");
        const response = await getValidatorByAddress(address);
        setValidatorDetail(response?.data?.validators[0]);
        setDetailStatus("Success");
      } catch (err) {
        setDetailStatus("Error");
        return err;
      }
    };
    fetchData();
  }, [address]);

  const delegate = (val) => {
    if (!val.includes("new") && userBalance < MINIMUM_BOND_AMOUNT) {
      return setOpen(true);
    }
    dispatch(
      selectedAccounts({
        accounts: validatorDetail?.validatorAddress || "",
        name: validatorDetail?.name || "",
        valoperAddress: validatorDetail?.operatorAddress || "",
      })
    );
    setOpen(false);
    navigate("/validators/delegate", { state: params?.address });
  };

  return (
    <>
      <CommonModal open={open} setOpen={setOpen} />
      <Wrapper>
        <div className="arrow_container" style={{ cursor: "pointer" }}>
          <a onClick={() => navigate(-1)}>
            <ArrowIcon />
          </a>
          <h3>Validator Details</h3>
        </div>
        <div className="namesherlock">
          {/* <p>Name</p> */}
          {detailStatus === "Init" || detailStatus === "Fetching" ? <Skeleton variant="text" width={200} height={25} /> : <p>{validatorDetail?.name}</p>}
        </div>
        <div className="flex-itemssheloc">
          <div className="address_container">
            <p>Wallet Address</p>
            {detailStatus === "Init" || detailStatus === "Fetching" ? (
              <Skeleton variant="text" width={300} height={25} />
            ) : (
              <div>
                {params?.address} {CopyAddress(params?.address)}
              </div>
            )}
          </div>
          <Button className=" btns animatebtn" onClick={() => delegate("new")}>
            Delegate
          </Button>
        </div>
        <div className="listing_details">
          {detailStatus === "Init" || detailStatus === "Fetching" ? (
            // Skeleton Loaders for All Fields
            <>
              {Array.from({ length: 9 }).map((_, index) => (
                <ValidatorDetailItem key={index}>
                  <Typography color="text.secondary" variant="body2">
                    <Skeleton variant="text" width={150} height={25} />
                  </Typography>
                  <Typography>
                    <Skeleton variant="text" width={200} height={25} />
                  </Typography>
                </ValidatorDetailItem>
              ))}
            </>
          ) : (
            // Actual Data Display
            <>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  NAME
                </Typography>
                <Typography>{validatorDetail?.name ? capitalizeFirstLetter(validatorDetail?.name) : "-"}</Typography>
              </ValidatorDetailItem>

              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  STATUS
                </Typography>
                <Typography
                  style={{
                    color:
                      validatorDetail?.status === "Active" || validatorDetail?.status === "active"
                        ? "green"
                        : validatorDetail?.status === "PROCESSING" || validatorDetail?.status === "PENDING" || validatorDetail?.status === "pending" || validatorDetail?.status === "processing"
                        ? "yellow"
                        : validatorDetail?.status === "inactive" || validatorDetail?.status === "INACTIVE"
                        ? "red"
                        : "inherit", // Default color
                  }}
                >
                  {validatorDetail?.status ? capitalizeFirstLetter(validatorDetail?.status) : "-"}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION RATE
                </Typography>
                <Typography>{validatorDetail?.commissionRate ? noExponential(toFixed(validatorDetail?.commissionRate, 4)) : 0} %</Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION MAX RATE
                </Typography>
                <Typography>{validatorDetail?.commissionMaxRate ? noExponential(toFixed(validatorDetail?.commissionMaxRate, 4)) : 0} %</Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  COMMISSION CHANGE RATE
                </Typography>
                <Typography>{validatorDetail?.commissionMaxChangeRate ? noExponential(toFixed(validatorDetail?.commissionMaxChangeRate, 4)) : 0} %</Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  TOTAL STAKE
                </Typography>
                <Typography>
                  {validatorDetail?.totalStake ? noExponential(Number(validatorDetail?.totalStake) / 10 ** 18) : "0"} {CURRENCY}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  SELF STAKE
                </Typography>
                <Typography>
                  {validatorDetail?.selfStake ? noExponential(Number(validatorDetail?.selfStake) / 10 ** 18) : "0"} {CURRENCY}
                </Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  VALIDATOR SINCE
                </Typography>
                <Typography>{validatorDetail?.createdAt ? moment(validatorDetail?.createdAt).format("YYYY/MM/DD") : "-"}</Typography>
              </ValidatorDetailItem>
              <ValidatorDetailItem>
                <Typography color="text.secondary" variant="body2">
                  DELEGATORS
                </Typography>
                <Typography>{validatorDetail?.delegatorCount ? validatorDetail?.delegatorCount : "-"}</Typography>
              </ValidatorDetailItem>
            </>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default ValidatorDetails;
