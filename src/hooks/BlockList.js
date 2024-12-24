/*eslint-disable*/
import { useEffect, useState } from "react";
import { BASE_URL_EXPLORER_NEW } from "../components/Common/Constant";
import API from "../utils/apiClient";

function blockList(data) {
  const [blockData, setBlockData] = useState([]);
  const [blockStatus, setBlockStatus] = useState("idle"); //idle, fetching,success, error

  useEffect(() => {
    fetchBlocksDetail();
  }, []);

  const fetchBlocksDetail = async () => {
    try {
      setBlockStatus("fetching");
      const response = await API.get(
        `${BASE_URL_EXPLORER_NEW}/blocks?page=${data.pageNo}&limit=${data.limit}`
      );
      setBlockData(response?.data?.data?.blocks);
      setBlockStatus("success");
    } catch (error) {
      setBlockStatus("error");
    }
  };

  return { blockData, blockStatus };
}

export default blockList;
