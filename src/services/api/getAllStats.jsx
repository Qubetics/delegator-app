import { BASE_URL_EXPLORER_NEW } from "../../components/Common/Constant";

const getAllStats = async () => {
  try {
    const response = await fetch(`${BASE_URL_EXPLORER_NEW}/explorer/dashboard`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching blocks:", error);
    return { error: true, message: error.message };
  }
};

export default getAllStats;
