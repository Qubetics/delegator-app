/*eslint-disable*/

// import { useEffect, useState } from "react";
// import API from "../utils/apiClient";
// import {
//   BASE_URL_EXPLORER,
//   BASE_URL_EXPLORER_NEW,
// } from "../components/Common/Constant";
// import { DEFAULT_TABLE_LIMIT } from "../components/Common/Constant";

// function validatorList(pageParams) {
//   const [validatorData, setValidatorData] = useState([]);
//   const [validatorStatus, setValidatorStatus] = useState("idle");
//   const [searchingValue, setSearchingValue] = useState("");
//   const [tabStatus, setTabStatus] = useState("");
//   const page = pageParams?.page ? pageParams?.page : 1;
//   const limit = DEFAULT_TABLE_LIMIT;

//   useEffect(() => {
//     fetchValidatorsDetail();
//   }, [pageParams?.page, searchingValue]);

//   const fetchValidatorsDetail = async () => {
//     try {
//       setValidatorStatus("fetching");
//       const resData = await API.get(
//         `${BASE_URL_EXPLORER}/validators?page=${page}&limit=${limit}`
//       );

//       const response = await API.get(
//         searchingValue
//           ? `${BASE_URL_EXPLORER_NEW}validators?search=${searchingValue}`
//           : `${BASE_URL_EXPLORER_NEW}validators?page=${page}&limit=${limit}`
//       );
//       setValidatorData(resData.data.data.validators);

//       setValidatorStatus("success");
//       response?.data?.message?.data?.allSlash?.data?.length !== 0 &&
//         response?.data?.message?.data?.allValidatorsInfo?.data?.length == 0
//         ? setTabStatus(response?.data?.message?.data?.allSlash?.data[0]?.status)
//         : setTabStatus(
//           response?.data?.message?.data?.allValidatorsInfo?.data[0]?.status
//         );
//     } catch (error) {
//       setValidatorStatus("error");
//     }
//   };

//   return { validatorData, validatorStatus, setSearchingValue, tabStatus };
// }

// export default validatorList;
