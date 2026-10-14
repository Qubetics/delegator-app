import moment from "moment";

export const convertToDateTime = (date) => {
  let dateObj = new Date(date);
  let dates;
  if (isNaN(dateObj)) {
    dates = Number(date);
  } else {
    dates = dateObj.getTime();
  }
  let timeLeft = moment(dates).format("MMM, D, YYYY, HH:mm");
  return timeLeft;
};

export const renderTime = (date) => {
  let dateObj = new Date(date);
  let dates;
  if (isNaN(dateObj)) {
    dates = Number(date);
  } else {
    dates = dateObj.getTime();
  }
  let timeLeft;
  let time = Date.now();

  const newDate = (time - dates) / 1000;
  if (newDate < 60) timeLeft = `${newDate.toFixed(0)}s ago`;
  else if (newDate >= 60 && newDate <= 3600)
    timeLeft = `${(newDate / 60).toFixed(0)}m ago`;
  else if (newDate >= 3600 && newDate <= 86400)
    timeLeft = `${(newDate / 3600).toFixed(0)}h ago`;
  else if (newDate >= 86400 && newDate <= 2592000)
    timeLeft = `${(newDate / 86400).toFixed(0)}d ago`;
  else if (newDate > 0) timeLeft = moment(dates).fromNow();

  return timeLeft;
};

export const capitalizeWord = (str) => {
    const specialWords = [
      "coin_transfer",
      "contract_creation",
      "contract_transfer",
      "contract_execute",
      "contract_upload",
    ]; // Add more words as needed
    const name = str?.toLowerCase();
    let modStr;
    if (specialWords?.includes(name)) {
      // Special capitalization rules for specific words
      modStr = name
        .split("_")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("_");
    } else {
      // Default capitalization for other words
      modStr = name[0].toUpperCase() + name.slice(1);
    }
    return modStr;
  };
